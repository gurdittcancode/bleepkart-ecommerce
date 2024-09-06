import { prisma } from '../prisma';
import { cookies } from 'next/headers';
import { CartWithProducts, ShoppingCart } from '@/types/cart';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Cart, CartItem } from '@prisma/client';

export async function createCart(): Promise<ShoppingCart> {
  const session = await getServerSession(authOptions);
  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({
      data: {
        userId: session.user.id,
      },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });
    // encrypt this cookie in prod
    cookies().set('localCartId', newCart.id);
  }

  return {
    ...newCart,
    CartItem: [],
    size: 0,
    subTotal: 0,
  };
}

export async function getCart(): Promise<ShoppingCart | null> {
  const session = await getServerSession(authOptions);
  let cart: CartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        CartItem: { include: { product: true } },
      },
    });
  } else {
    const cookieCartId = cookies().get('localCartId')?.value;
    cart = cookieCartId
      ? await prisma.cart.findUnique({
          where: {
            id: cookieCartId,
          },
          include: {
            CartItem: { include: { product: true } },
          },
        })
      : null;
  }

  if (!cart) return null;

  return {
    ...cart,
    size: cart.CartItem.reduce((acc, item) => acc + item.quantity, 0),
    subTotal: cart.CartItem.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ),
  };
}

export async function mergeAnonUserCarts(userId: string) {
  const cookieCartId = cookies().get('localCartId')?.value;
  const localCart = cookieCartId
    ? await prisma.cart.findUnique({
        where: {
          id: cookieCartId,
        },
        include: {
          CartItem: true,
        },
      })
    : null;

  if (!localCart) {
    // nothing to merge
    return;
  }

  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { CartItem: true },
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(userCart.CartItem, localCart.CartItem);
      await tx.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });

      await tx.cartItem.createMany({
        data: mergedCartItems.map((item) => ({
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    } else {
      await tx.cart.create({
        data: {
          userId: userId,
          CartItem: {
            createMany: {
              data: localCart.CartItem.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }

    // now delete anon cart
    await tx.cart.delete({
      where: { id: localCart.id },
    });
    cookies().set('localCartId', '');
  });
}

function mergeCartItems(
  userCart: CartItem[],
  localCart: CartItem[]
): CartItem[] {
  for (let item of localCart) {
    const itemExists = userCart.find((i) => i.productId === item.productId);
    if (!itemExists) {
      userCart.push(item);
    }
  }
  return userCart;
}
