import Product from "./Product";
import type { ProductType } from "@/types/types";

function ProductList({
  products,
  customGrid,
}: Readonly<{ products: Array<ProductType>; customGrid?: string }>) {
  return (
    <div
      className={`grid items-center ${
        customGrid
          ? customGrid
          : "grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5"
      }`}
    >
      {products.map((product, i) => (
        <Product key={i} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
