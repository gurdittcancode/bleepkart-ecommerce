import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import Link from 'next/link';
import { formatPrice } from '@/lib/format';
import { CartItemWithProduct } from '@/types/cart';
import { FC } from 'react';
import { setProductQuantity } from '@/lib/actions/actions';

interface CartItemProps {
  cartItem: CartItemWithProduct;
}

const CartItem: FC<CartItemProps> = ({ cartItem: { product, quantity } }) => {
  const options: JSX.Element[] = [];
  for (let i = 0; i < 11; ++i) {
    options.push(
      <SelectItem value={i.toString()} key={i}>
        {i}
      </SelectItem>
    );
  }

  function handleQuantityChange(value: string) {
    setProductQuantity(product.id, parseInt(value));
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 my-10">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <Link href={`/products/${product.id}`} className="font-bold text-xl">
          {product.name}
        </Link>
        <div>Price: {formatPrice(product.price)}</div>
        <div className="my-1 flex items-center gap-2">
          Quantity:{' '}
          <Select onValueChange={handleQuantityChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={quantity} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>{options}</SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3">
          Total: {formatPrice(product.price * quantity)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
