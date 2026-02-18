import Image from "next/image";
import Link from "next/link";
import type { ProductType } from "@/types/types";
import { PiHammerDuotone, PiStarFill } from "react-icons/pi";

function Product({ product }: Readonly<{ product: ProductType }>) {
  const {
    cover,
    alt,
    name,
    builder,
    slug,
    caption,
    rate,
    price,
    offerPrice,
    offer,
  } = product;
  return (
    <div className="p-3 bg-white rounded-xl">
      <div className="w-full relative aspect-square rounded-xl overflow-hidden">
        <Image src={cover} alt={alt} fill className="object-cover" />
      </div>
      <h2 className="font-medium text-lg text-stone-600 mt-1 transition-colors hover:text-primary">
        <Link href={`/products/${slug}`}>{name}</Link>
      </h2>
      <p className="text-xs line-clamp-1 text-stone-400">{caption}</p>
      <h3 className="my-2 py-2 border-y border-stone-200 text-center transition-colors hover:underline hover:text-primary">
        <Link
          href="/test"
          className="text-sm flex items-center justify-center gap-1 md:text-base"
        >
          <span className="*:size-4 sm:*:size-5 text-sm sm:text-base">
            <PiHammerDuotone />
          </span>
          <span>{builder}</span>
        </Link>
      </h3>
      <div className="flex justify-between items-end">
        <div className="flex gap-1 items-center">
          <span className="*:size-4 sm:*:size-5 text-amber-400">
            <PiStarFill />
          </span>
          <span className="text-sm sm:text-base">{rate}</span>
        </div>
        <div className="flex flex-col gap-1 items-end text-sm sm:text-base">
          <h4 className="flex flex-row-reverse items-center bg-stone-200 text-stone-400 text-sm rounded-r-sm">
            <span className="text-white bg-red-500 px-1 py-0.5 rounded-sm">
              {offer}%
            </span>
            <span className="line-through px-1">{price}</span>
          </h4>
          <h4 className="flex flex-row-reverse items-center gap-px text-primary">
            <span className="text-xs text-stone-400">ریال</span>
            <span className="text-sm sm:text-base">{offerPrice}</span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Product;
