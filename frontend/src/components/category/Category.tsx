"use client";

import LinkButton from "@/ui/LinkButton";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { HiChevronLeft } from "react-icons/hi2";
import {
  PiCouchDuotone,
  PiHammerDuotone,
  PiPottedPlantDuotone,
  PiTrophy,
  PiYarnDuotone,
} from "react-icons/pi";

const categorys = [
  {
    id: 393,
    label: "مبلمان",
    name: "sofa",
    badges: ["چسترفیلد", "کبریل", "لاوسون", "چِیس", "قطعه ای"],
    icon: <PiCouchDuotone />,
  },
  {
    id: 459,
    label: "صنایع دستی",
    name: "handingcraft",
    badges: ["تابلو", "طرح و نقاشی", "ظروف مسی", "مجسمه"],
    icon: <PiTrophy />,
  },
  {
    id: 434,
    label: "سفال",
    name: "pottery",
    badges: ["بشقاب", "لیوان", "پارچ", "گلدان"],
    icon: <PiPottedPlantDuotone />,
  },
  {
    id: 643,
    label: "فرش و بافتنی",
    name: "carpet-and-knitting",
    badges: ["شکارگاهی", "شاه عباسی", "تابلو فرش", "درختی"],
    icon: <PiYarnDuotone />,
  },
];

function Category() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentFilter = searchParams.get("category") || "sofa";

  function handleSearch(filterField: string) {
    const params = new URLSearchParams(searchParams);
    params.set("category", filterField);

    router.replace(`${pathname}?${params.toString()}#preview`, {
      scroll: true,
    });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-18 gap-2 mt-20">
      {categorys.map((category) => (
        <div
          key={category.id}
          className="p-2 bg-white drop-shadow-2xl rounded-xl"
        >
          <div className="flex justify-center -mt-16.5">
            <div className="rounded-circle p-4 *:size-22 bg-white text-primary rounded-full">
              {category.icon}
            </div>
          </div>
          <div>
            <h2 className="flex gap-1 items-center justify-center text-xl font-medium text-stone-600">
              <span>{category.label}</span>
              {category.name !== currentFilter ? (
                <span
                  onClick={() => handleSearch(category.name)}
                  className="text-sm text-primary cursor-pointer hover:underline"
                >
                  [مشاهده در صفحه اصلی]
                </span>
              ) : (
                <Link
                  href="#preview"
                  className="text-sm text-primary cursor-pointer hover:underline"
                >
                  [انتخاب شده]
                </Link>
              )}
            </h2>
            <ul className="flex gap-1 flex-wrap items-center justify-center my-2">
              {category?.badges?.map((badge) => (
                <li
                  className="text-xs py-1 px-2 bg-stone-100 text-stone-500 rounded-xl"
                  key={badge}
                >
                  {badge}
                </li>
              ))}
            </ul>
            <div className="flex gap-1 items-center justify-center mt-5 pb-2">
              <LinkButton href="/builders" size="btn-sm">
                <span className="text-xs">مشاهده تولیدی ها</span>
                <span className="*:size-5">
                  <HiChevronLeft />
                </span>
              </LinkButton>
              <LinkButton href="/builders" size="btn-sm">
                <span className="text-xs">مشاهده محصولات</span>
                <span className="*:size-5">
                  <HiChevronLeft />
                </span>
              </LinkButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Category;
