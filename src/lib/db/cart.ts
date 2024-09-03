import { prisma } from '../prisma';
import { cookies } from 'next/headers';
import { ShoppingCart } from '@/types/cart';

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });
  // encrypt this cookie in prod
  cookies().set('localCartId', newCart.id);
  return {
    ...newCart,
    CartItem: [],
    size: 0,
    subTotal: 0,
  };
}

export async function getCart(): Promise<ShoppingCart | null> {
  const cookieCartId = cookies().get('localCartId')?.value;
  const cart = cookieCartId
    ? await prisma.cart.findUnique({
        where: {
          id: cookieCartId,
        },
        include: {
          CartItem: { include: { product: true } },
        },
      })
    : null;

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
