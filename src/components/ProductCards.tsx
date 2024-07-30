import { Product } from "@prisma/client";
import ProductCard from "./ui/custom/ProductCard";

export default function ProductCards({products}: {products: Product[]}) {
    return (
        <div className="w-full h-fit my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}