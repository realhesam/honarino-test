"use client";

import RateStar from "@/ui/RateStar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ProductionNav from "./ProductionNav";
import React from "react";

type Page = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type ProductionData = {
  logo: string;
  name: string;
  caption: string;
  rate: number;
};

type ProductionLayoutConditionProps = {
  children: React.ReactNode;
  data: ProductionData;
  pages: Page[];
  production: string;
};

function ProductionLayoutCondition({
  children,
  data,
  pages,
  production,
}: ProductionLayoutConditionProps) {
  const pathname = usePathname();
  const limitedPage = `/${production}/dashboard`;

  if (pathname === limitedPage) return <>{children}</>;

  return (
    <div>
      <div className="relative h-70 bg-primary mb-70">
        <div className="container">
          <div className="flex flex-col items-center">
            <div className="w-full flex items-center justify-center">
              <div className="mt-39 relative aspect-square size-60">
                <Image
                  src={data.logo}
                  alt="تصویر تولیدی"
                  className="w-full object-cover rounded-full bg-white border-12 border-stone-100"
                  fill
                />
              </div>
            </div>

            <RateStar rate={data.rate} />

            <h2 className="mt-2.5 text-2xl text-stone-700 font-medium">
              {data.name}
            </h2>

            <p className="text-sm text-stone-600">{data.caption}</p>
          </div>

          <ProductionNav pages={pages} />
        </div>
      </div>

      {children}
    </div>
  );
}

export default ProductionLayoutCondition;
