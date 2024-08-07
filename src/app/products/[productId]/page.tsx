import PriceTag from '@/components/ui/custom/PriceTag';
import { prisma } from '@/utils/db/prisma';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache, FC } from 'react';
import AddToCartButton from './AddToCartButton';
import { addToCart } from '@/utils/actions/actions';

interface pageProps {
  params: {
    productId: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { productId },
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const product = await getProduct(productId);
  return {
    title: `${product.name}- BleepKart`,
    description: product.description,
    openGraph: {
      images: [
        {
          url: product.imageUrl,
        },
      ],
    },
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const { productId } = params;
  const product = await getProduct(productId);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
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
        <PriceTag price={product.price} className="my-4" />
        <p>{product.description}</p>
        <AddToCartButton productId={product.id} className="mt-5" addToCart={addToCart}/>
      </div>
    </div>
  );
};

export default page;
