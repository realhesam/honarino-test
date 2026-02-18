"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter({
  field,
  filters,
  defaultFilter,
}: Readonly<{
  field: string;
  filters: Array<{ label: string; name: string }>;
  defaultFilter: string;
}>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  function handleFilter(filterField: string) {
    console.log("dskfk");
    const params = new URLSearchParams(searchParams);
    params.set(field, filterField);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const currentFilter = searchParams.get(field) || defaultFilter;

  return (
    <>
      {filters.map((filter) => (
        <li
          onClick={() => handleFilter(filter.name)}
          key={filter.name}
          className={`cursor-pointer ${
            filter.name === currentFilter
              ? "text-primary bg-primary/10"
              : "text-stone-500"
          }`}
        >
          {filter.label}
        </li>
      ))}
    </>
  );
}

export default Filter;
