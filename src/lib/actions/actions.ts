'use server';

import { redirect } from 'next/navigation';
import { prisma } from '../prisma';
import { formSchema } from '../formSchema';
import { createCart, getCart } from '../db/cart';
import { revalidatePath } from 'next/cache';

export type FormState = {
  message: string;
};

export async function addProduct(formData: FormData): Promise<FormState> {
  const data = Object.fromEntries(formData);
  const parsed = formSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data.',
    };
  }

  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const price = Number(formData.get('price') || 0);
  const imageUrl = formData.get('image')?.toString();

  if (!name || !description || !price || !imageUrl) {
    throw Error('Missing fields.');
  }
  await prisma.product.create({
    data: {
      name,
      price,
      description,
      imageUrl,
    },
  });

  return { message: 'Product added.' };
}

export async function addToCart(productId: string) {
  const cart = (await getCart()) ?? (await createCart());
  const itemInCart = cart.CartItem.find((item) => item.productId === productId);
  if (itemInCart) {
    await prisma.cartItem.update({
      where: { id: itemInCart.id },
      data: {
        quantity: { increment: 1 },
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }
  revalidatePath('/products/[id]', 'page');
}

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());
  const itemInCart = cart.CartItem.find((item) => item.productId === productId);
  if (itemInCart) {
    if (quantity === 0) {
      await prisma.cartItem.delete({
        where: {
          id: itemInCart.id,
        },
      });
    } else {
      await prisma.cartItem.update({
        where: {
          id: itemInCart.id,
        },
        data: { quantity },
      });
    }
  }
  revalidatePath('/cart', 'page');
}
