import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import PriceTag from '@/components/PriceTag';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface pageProps {
  params: {
    productId: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const { productId } = params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) notFound();

  return (
    <div className="flex flex-col lg:flex-row">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />

      <div>
        <h1 className="text-5xl font-extrabold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default page;
