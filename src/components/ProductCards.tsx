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
    <div className="w-full h-fit my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductCards;
