'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FC, useState } from 'react';

interface AddToCartButtonProps {
  productId: string;
  className?: string;
  addToCart: (productId: string) => Promise<void>;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({
  productId,
  className,
  addToCart,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  return (
    <div className="flex items-center gap-2">
      <Button
        className={cn(className)}
        onClick={async () => {
          setLoading(true);
          await addToCart(productId);
          setLoading(false);
          toast({
            description: 'Product added to cart!',
          });
        }}>
        Add To Cart
        {loading && (
          <span>
            <Loader2 className="ml-2 size-4 animate-spin" />
          </span>
        )}
      </Button>
    </div>
  );
};

export default AddToCartButton;
