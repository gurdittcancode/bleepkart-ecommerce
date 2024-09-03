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
    <div className="bg-base-100 pt-3 mb-7">
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
                name="searchQuery"
                className="p-2 rounded-sm text-black"
                placeholder="Search for products here..."
              />
            </div>
          </form>
          <div className="flex gap-3">
            <CartButton cart={cart} />
            <Button variant="secondary">
              <Link href={'/'}>Log In</Link>
            </Button>
            <Button>
              <Link href={'/'}>Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
