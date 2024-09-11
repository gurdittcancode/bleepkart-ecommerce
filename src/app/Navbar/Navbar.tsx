import { Input } from '@/components/ui/input';
import { getCart } from '@/lib/db/cart';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import CartButton from './CartButton';
import UserMenuButton from './UserMenuButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

async function searchProducts(formData: FormData) {
  'use server';
  const searchQuery = formData.get('searchQuery')?.toString();
  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

const Navbar: FC = async () => {
  const cart = await getCart();
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-base-100 pt-3 mb-7 mt-3">
      <div className="max-w-7xl m-auto flex items-center flex-col sm:flex-row">
        <div className="flex-1">
          <Link
            href={'/'}
            className="font-extrabold italic text-3xl  text-white">
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
            <UserMenuButton session={session} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
