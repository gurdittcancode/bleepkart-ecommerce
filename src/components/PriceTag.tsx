import { FC } from 'react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/format';

interface PriceTagProps {
  price: number;
  className?: string;
}

const PriceTag: FC<PriceTagProps> = ({ price, className }) => {
  return (
    <Badge className={cn(className, 'bg-primary w-fit text-sm')}>
      {formatPrice(price)}
    </Badge>
  );
};

export default PriceTag;
