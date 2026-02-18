"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface PagesType {
  label: string;
  href: string;
  icon: React.ReactNode;
}

function ProductionNav({ pages }: Readonly<{ pages: PagesType[] }>) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="w-max mx-auto mt-5 py-2 px-5 bg-stone-200 rounded-full">
      <div className="flex items-center justify-center divide-x divide-stone-400">
        {pages.map((page) => (
          <Link
            href={page.href}
            key={page.href}
            className={`flex gap-1 items-center px-5 ${
              pathname === page.href && "text-primary"
            }`}
          >
            <span className="*:size-5">{page.icon}</span>
            <span>{page.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductionNav;
