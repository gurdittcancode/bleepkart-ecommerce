import HeroImage from '@/components/HeroImage';
import PaginationBar from '@/components/PaginationBar';
import ProductCards from '@/components/ProductCards';
import { prisma } from '@/lib/prisma';

interface HomeProps {
  searchParams: {
    page: string;
  };
}

export default async function Home({
  searchParams: { page = '1' },
}: HomeProps) {
  const currentPage = parseInt(page);
  const pageSize = 6;
  const heroItemCount = 1;

  const totalItems = await prisma.product.count();
  const totalPages = Math.ceil(totalItems / pageSize);

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
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
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
