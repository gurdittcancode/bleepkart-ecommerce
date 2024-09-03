import { Product } from '@prisma/client';
import Link from 'next/link';
import { FC } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardImage,
  CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import PriceTag from './PriceTag';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="w-[300px] md:w-[350px] rounded-xl bg-secondary hover:shadow-xl transition-shadow">
        <CardImage
          alt={product.name}
          src={product.imageUrl}
          width={800}
          height={400}
          className="object-cover rounded-xl"
        />
        <CardHeader>
          <CardTitle className="text-primary flex">{product.name}</CardTitle>
          {isNew && <Badge className="bg-ring w-fit">New</Badge>}
          <CardDescription>
            {product.description.substring(0, 200) + '...'}
          </CardDescription>
          <PriceTag price={product.price} />
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ProductCard;
