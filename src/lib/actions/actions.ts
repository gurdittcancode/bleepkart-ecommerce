'use server';

import { redirect } from 'next/navigation';
import { prisma } from '../prisma';
import { formSchema } from '../formSchema';

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
