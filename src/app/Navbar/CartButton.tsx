import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from '@/types/cart';
import { ShoppingBag } from 'lucide-react';
import { FC } from 'react';

interface CartButtonProps {
  cart: ShoppingCart | null;
}

const CartButton: FC<CartButtonProps> = ({ cart }) => {
  return (
    <div className="hover:cursor-pointer relative mr-1">
      <ShoppingBag size={32} />
      <Badge className="absolute -right-3 -top-1">
        {cart?.size ? cart.size : 0}
      </Badge>
    </div>
  );
};

export default CartButton;