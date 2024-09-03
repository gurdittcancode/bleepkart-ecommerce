import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatPrice } from '@/lib/format';
import { ShoppingCart } from '@/types/cart';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface CartButtonProps {
  cart: ShoppingCart | null;
}

const CartButton: FC<CartButtonProps> = ({ cart }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:cursor-pointer relative mr-1">
          <ShoppingBag size={28} />
          <Badge className="absolute -right-3 -top-1">
            {cart?.size ? cart.size : 0}
          </Badge>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        <DropdownMenuLabel className="font-bold text-md">
          {cart?.size || 0} Items
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Subtotal: {formatPrice(cart?.subTotal || 0)}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={'/cart'} className="hover:underline">
            View Cart <ExternalLink size={24} className="inline-block ml-2" />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartButton;
