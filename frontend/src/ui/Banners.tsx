"use client";

import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

// fake data ...
const productionBanners = [
  {
    id: "490430",
    href: "/test-prodution",
    banner: "/images/banner-1.png",
    alt: "banner 1",
  },
  {
    id: "435984",
    href: "/test-prodution",
    banner: "/images/banner-2.jpg",
    alt: "banner 2",
  },
  {
    id: "304353",
    href: "/test-prodution",
    banner: "/images/banner-4.png",
    alt: "banner 4",
  },
  {
    id: "045834",
    href: "/test-prodution",
    banner: "/images/banner-5.jpg",
    alt: "banner 5",
  },
  {
    id: "739402",
    href: "/test-prodution",
    banner: "/images/banner-6.png",
    alt: "banner 6",
  },
  {
    id: "838923",
    href: "/test-prodution",
    banner: "/images/banner-7.jpg",
    alt: "banner 7",
  },
];

function Banners() {
  return (
    <div className="container mx-auto px-2">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet banners-pagination",
          bulletActiveClass:
            "swiper-pagination-bullet-active banners banners-pagination__active",
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          435: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="w-full h-full overflow-auto"
      >
        {productionBanners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link href={banner.href}>
              <Image
                src={banner.banner}
                alt={banner.alt}
                width={400}
                height={200}
                className="rounded-xl cursor-grab object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banners;
