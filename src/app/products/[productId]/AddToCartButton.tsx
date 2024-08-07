'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/utils';
import { FC } from 'react';

interface AddToCartButtonProps {
  productId: string;
  className?: string;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({
  productId,
  className,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button className={cn(className)} onClick={() => {}}>
        Add To Cart
      </Button>
    </div>
  );
};

export default AddToCartButton;
