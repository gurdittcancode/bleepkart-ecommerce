import { FC } from 'react'
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/utils/format';
import { cn } from '@/lib/utils';

interface PriceTagProps {
  price: number,
  className?: string
}

const PriceTag: FC<PriceTagProps> = ({price, className}) => {
  return (
    <Badge className={cn(className, "bg-primary w-fit text-sm")}>{formatPrice(price)}</Badge>
  )
}

export default PriceTag