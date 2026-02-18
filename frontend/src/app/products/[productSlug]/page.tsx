"use client";

import CommentsList from "@/components/comment/CommentsList";
import Filter from "@/components/other/Filter";
import ProductSlider from "@/components/product/ProductSlider";
import LinkButton from "@/ui/LinkButton";
import { randomInt } from "crypto";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HiChevronLeft } from "react-icons/hi2";
import {
  PiInstagramLogoLight,
  PiShareNetworkLight,
  PiStarFill,
  PiTelegramLogoLight,
  PiWhatsappLogoLight,
} from "react-icons/pi";

const sectionFilter = [
  {
    label: "توضیحات",
    name: "description",
  },
  {
    label: "نظرات",
    name: "comments",
  },
];

const product = {
  name: "مبل ال راحتی رویال",
  caption:
    "مبل ال کاپر یکی از انواع مبل‌های ال ساده و مینیمال است که به دلیل سادگی در طراحی و سبک متفاوتی که دارد مورد توجه قرار گرفته و فروش خوبی در بازار داشته است. مبل‌های مینیمال قابلیت استفاده در انواع فضاها را برای خریدار فراهم میکنند و مبل ال کاپر برای افرادی که فضای کمی دارند انتخابی مناسب، اقتصادی، زیبا و به روز است. پایه‌های مبل ال کاپر از جنس چوب هستند و امکان ساخت آن با پایه‌های فلزی با توجه به تغییر در طراحی و سبک مبل وجود ندارد. دوخت مبل ال کاپر به صورت ساده به دلیل زیبایی خاصی که دارد طراحی شده است اما شما می‌توانید دوخت کفی، پشت و بخش‌های دیگر مبل ال کاپر را براساس سلیقه خود شخصی سازی کنید. ابعاد مبل ال کاپر قابل تغییر براساس نیاز شماست و می‌توان دو کاناپه این مبل را در ابعاد مختلف سفارش دارد. ",
  rate: 4.5,
  price: 200000000,
  offerPrice: 190000000,
  offer: 4,
  images: [
    {
      path: "/images/product-2.webp",
      alt: "تصویری از مبل راحتی رویال",
    },
  ],
  creator: {
    logo: null,
    name: "تولیدی مبلمان آقای علیسواری",
    slug: "alisavari-shop",
    categorys: [
      { label: "مبلمان", slug: "sofa" },
      { slug: "bed", label: "تخت خواب" },
      { slug: "table", label: "میز" },
    ],
    socials: [
      {
        link: "https://instagram/alisavari-shop",
        icon: <PiInstagramLogoLight />,
      },
      {
        link: "https://whatsapp/alisavari",
        icon: <PiWhatsappLogoLight />,
      },
      {
        link: "https://t.me/alisavari_Shop",
        icon: <PiTelegramLogoLight />,
      },
    ],
  },
  comments: [
    ...Array.from({ length: 10 }, (_, i) => ({
      id: i,
      comment:
        "بهترین تولیدی که تابه حال دیدم بود, هر محصولی ازشون خریدم بهترین کیفیت رو داشت. حتما ازشون خرید کنید...",
      rate: Math.floor(Math.random() * 5) || 1,
      user: {
        name: "علیرضا عابدی",
        cover: "/images/default-user.jpg",
      },
    })),
  ],
  metadatas: [
    { meta: "رنگ و جنس پارچه", value: "رنگ روشن با پارچه ایرانی" },
    { meta: "رنگ و جنس چوب", value: "چوب درخت گردو با رنگ قهوه ای ملایم" },
    { meta: "محل تولیدی", value: "تهران - شهرک ولیعصر" },
    { meta: "تعداد نفرات نشیمن", value: "5 نفره + قابلیت تغییر" },
  ],
};

const images = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"];

function Page({ params }: { params: { productSlug: string } }) {
  const searchParams = useSearchParams();
  const section = searchParams.get("section") || "description";
  console.log(section);

  return (
    <div className="container mt-25 sm:mt-30">
      <div className="grid lg:grid-cols-[1fr_20rem] gap-5 *:drop-shadow-lg">
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-xl flex flex-col items-center xl:items-start gap-5 p-4 text-stone-700 xl:flex-row">
            <div className="w-70 min-[365px]:w-85 xs:w-90 md:w-100">
              <ProductSlider images={images} />
            </div>

            <div className="flex-1 flex flex-col">
              <h1 className="border-b border-stone-200 w-full pb-2 text-xl font-medium">
                {product.name}
              </h1>
              <p className="text-sm line-clamp-6 text-stone-500 mt-2 sm:line-clamp-none">
                {product.caption}
              </p>

              <div className="flex flex-col gap-4 py-4 items-center justify-between bg-stone-100 rounded-xl my-5 xs:flex-row xs:p-2 ">
                <div className="flex flex-col items-center gap-2 xs:flex-row">
                  <div className="relative size-15 aspect-square rounded-full overflow-hidden">
                    <Image
                      src={product.creator.logo || "/images/default-user.jpg"}
                      alt="تصویر تولیدی"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="line-clamp-1">{product.creator.name}</h2>
                    <ul className="flex justify-center items-center gap-1 xs:justify-start">
                      {product.creator.categorys.map((category) => (
                        <li
                          key={category.slug}
                          className="text-xs py-px px-1 bg-stone-200 text-stone-500 transition-colors rounded-sm hover:bg-primary hover:text-white"
                        >
                          <Link href={`/${category.slug}`}>
                            {category.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <LinkButton href={product.creator.slug}>
                  <span>مشاهده تولیدی</span>
                  <span className="*:size-5">
                    <HiChevronLeft />
                  </span>
                </LinkButton>
              </div>

              <div className="flex flex-col divide-y divide-stone-200">
                {product.metadatas.map((metadata, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 items-center py-3 sm:flex-row sm:py-1"
                  >
                    <p>{metadata.meta}:</p>
                    <h4 className="text-stone-500">{metadata.value}</h4>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-1 mt-auto xs:justify-end">
                <LinkButton>مشاهده شماره تماس</LinkButton>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4">
            <ul className="flex items-center gap-2 pb-2 mb-5 border-b-2 border-stone-200 *:p-2 *:rounded-xl sm:text-lg">
              <Filter
                filters={sectionFilter}
                defaultFilter="description"
                field="section"
              />
            </ul>
            {section === "description" && (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-stone-600 leading-7 sm:text-base">
                  {product.caption}
                </p>
                <div className="relative aspect-video w-full">
                  <Image
                    src={product.images[0].path}
                    alt={product.images[0].alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {section === "comments" && (
              <div className="flex gap-4 flex-col items-center">
                <CommentsList comments={product.comments} />
                <LinkButton>مشاهده بیشتر</LinkButton>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="sticky top-30 bg-white rounded-xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-end bg-stone-100 p-2 rounded-xl border border-stone-200">
              <div className="flex gap-1 items-center">
                <span className="*:size-4 sm:*:size-5 text-amber-400">
                  <PiStarFill />
                </span>
                <span className="text-sm sm:text-base">{product.rate}</span>
              </div>
              <div className="flex flex-col gap-1 items-end text-sm sm:text-base">
                <h4 className="flex flex-row-reverse items-center bg-stone-200 text-stone-400 text-sm rounded-r-sm">
                  <span className="text-white bg-red-500 px-1 py-0.5 rounded-sm">
                    {product.offer}%
                  </span>
                  <span className="line-through px-1">{product.price}</span>
                </h4>
                <h4 className="flex flex-row-reverse items-center gap-px text-primary">
                  <span className="text-xs text-stone-400">ریال</span>
                  <span className="text-sm sm:text-base">
                    {product.offerPrice}
                  </span>
                </h4>
              </div>
            </div>
            <div className="bg-stone-100 p-2 rounded-xl border border-stone-200">
              <h5 className="text-lg text-center">شبکه های مجازی تولیدی</h5>
              <div className="flex items-center gap-2 justify-center my-2">
                {product?.creator?.socials.map((social) => (
                  <Link
                    href={social.link}
                    key={social.link}
                    className="p-2 bg-primary/10 text-primary rounded-full"
                  >
                    <span className="*:size-6 *:stroke-4">{social.icon}</span>
                  </Link>
                ))}
              </div>
            </div>
            <LinkButton customClass="w-full justify-center">
              <span className="*:size-5 *:stroke-4">
                <PiShareNetworkLight />
              </span>
              <span>اشتراک گذاری محصول</span>
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
