import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import { FC } from 'react';

interface SearchPageProps {
  searchParams: {
    query: string;
  };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: "${query}" | BleepKart`,
  };
}

const SearchPage: FC<SearchPageProps> = async ({ searchParams: { query } }) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: { contains: query, mode: 'insensitive' },
        },
        {
          description: { contains: query, mode: 'insensitive' },
        },
      ],
    },
    orderBy: { updatedAt: 'desc' },
  });

  if (products.length === 0) {
    return (
      <div className="text-center">No products find with this search term</div>
    );
  }

  return (
    <div className="w-full my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default SearchPage;
