import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCart } from '@/lib/db/cart';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import CartButton from './CartButton';

async function searchProducts(formData: FormData) {
  'use server';
  const searchQuery = formData.get('searchQuery')?.toString();
  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

const Navbar: FC = async () => {
  const cart = await getCart();
  return (
    <nav className="bg-base-100 pt-3 mb-7 mt-3">
      <div className="max-w-7xl m-auto flex items-center flex-col sm:flex-row">
        <div className="flex-1">
          <Link href={'/'} className="font-extrabold text-3xl  text-white">
            BleepKart
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <form action={searchProducts} className="text-white">
            <div>
              <Input
                type="search"
                name="searchQuery"
                className="p-2 text-white rounded-lg"
                placeholder="Search for products here..."
              />
            </div>
          </form>
          <div className="flex gap-3 items-center">
            <CartButton cart={cart} />
            <Button variant="default">
              <Link href={'/'} className='text-md'>Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
