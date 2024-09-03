import { Prisma } from '@prisma/client';

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    CartItem: { include: { product: true } };
  };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number,
  subTotal: number
}
