"use client";

import Filter from "../other/Filter";
import type { ProductType } from "@/types/types";
import ProductList from "./ProductList";

const filters = [
  {
    name: "all",
    label: "همه محصولات",
  },
  {
    name: "chesterfield",
    label: "چسترفیلد (Chesterfield)",
  },
  {
    name: "sectional",
    label: "مبل قطعه ای (Sectional)",
  },
  {
    name: "chaise",
    label: "مدل چِیس (Chaise)",
  },
  {
    name: "cabriole",
    label: "مبل کبریل (Cabriole)",
  },
  {
    name: "camel-back",
    label: "مبل تکیه‌ گاه شتری (CamelBack)",
  },
  {
    name: "day-bed",
    label: "مبل تختی (Day bed)",
  },
];

const sorts = [
  {
    name: "newest",
    label: "جدیدترین ها",
  },
  {
    name: "price-asc",
    label: "ارزان ترین",
  },
  {
    name: "price-desc",
    label: "بیشترین قیمت",
  },
  {
    name: "rating",
    label: "محبوب ترین",
  },
];

function ProductPanel({
  products,
}: Readonly<{ products: Array<ProductType> }>) {
  return (
    <div className="relative lg:grid grid-cols-[18rem_1fr] gap-2 items-start">
      <div className="sticky top-30 mb-2.5 drop-shadow-xl rounded-xl border-stone-200 bg-white">
        <h3 className="text-center text-lg py-4 text-stone-500">
          دسته بندی مبلمان
        </h3>
        <ul className="overflow-x-scroll flex *:shrink-0 text-sm p-2 *:p-2 *:rounded-xl border-y border-stone-200 sticky inset-x-0 lg:flex-col">
          <Filter filters={filters} defaultFilter="all" field="filter" />
        </ul>
      </div>
      <div className="rounded-xl drop-shadow-xl bg-white overflow-hidden">
        <ul className="text-sm flex *:shrink-0 overflow-x-scroll items-center gap-2.5 p-2 *:rounded-lg *:py-px *:px-2 border-b border-stone-200">
          <Filter filters={sorts} field="sort" defaultFilter="newest" />
        </ul>
        <ProductList
          products={products}
          customGrid="*:rounded-none *:last:border-l *:last:border-b *:border-stone-200 divide-y divide-x divide-stone-200 grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        />
      </div>
    </div>
  );
}

export default ProductPanel;
