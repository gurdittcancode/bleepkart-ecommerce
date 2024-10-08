import { Product } from '@prisma/client';
import { FC } from 'react';
import ProductCard from './ProductCard';

interface ProductCardsProps {
  products: Product[];
}

const ProductCards: FC<ProductCardsProps> = ({
  products,
}: ProductCardsProps) => {
  return (
    <div className="w-full my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductCards;
