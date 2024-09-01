import HeroImage from '@/components/HeroImage';
import ProductCards from '@/components/ProductCards';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="h-full flex flex-col items-center">
      <div className="bg-secondary w-fit py-1.5 px-10 rounded-xl border border-secondary-foreground opacity-50">
        New fall collection 2024!
      </div>
      <div className="mt-10 lg:mt-8 text-6xl font-extrabold flex justify-center items-center">
        Where style speaks, trends resonate, fashion flourishes
      </div>
      <div className="mt-7 text-foreground flex flex-col items-center">
        <div>
          Introducing your one-stop shop for all your needs and wants. We help
          make your wallet lighter.
        </div>
        Discover today!
      </div>
      <div>
        <HeroImage />
      </div>
      <ProductCards products={products} />
    </div>
  );
}
