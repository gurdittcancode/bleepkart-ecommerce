import { getCart } from "@/lib/db/cart";
import { Metadata } from "next";
import { FC } from "react";
import CartItem from "@/components/CartItem";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Landmark } from "lucide-react";

interface PageProps {}

export const metadata: Metadata = {
  title: "Your Cart | BleepKart",
};

const page: FC<PageProps> = async ({}) => {
  const cart = await getCart();

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6">Your Cart</h1>
      {cart?.CartItem.map((item) => (
        <CartItem key={item.productId} cartItem={item} />
      ))}
      {!cart?.CartItem.length && <p>Your cart is empty</p>}
      <div>
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subTotal || 0)}
        </p>
        <Button className="flex gap-2">
          Checkout
          <Landmark />
        </Button>
      </div>
    </div>
  );
};

export default page;