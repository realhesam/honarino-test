"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const covers = [
  {
    alt: "cover-image-001",
    src: "/images/1.jpg",
  },
  {
    alt: "cover-image-002",
    src: "/images/2.jpg",
  },
  {
    alt: "cover-image-003",
    src: "/images/3.jpg",
  },
];

function SliderCover() {
  return (
    <div className="relative mt-20 w-full h-[300px] sm:h-[400px] md:h-[600px] md:mt-0 lg:h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={1000}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {covers.map((cover) => (
          <SwiperSlide key={cover.alt}>
            <Image
              fill
              src={cover.src}
              alt={cover.alt}
              placeholder="blur"
              blurDataURL="/images/blur-image.jpg"
              className="w-full h-full object-cover select-none brightness-70 "
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
        <div className="text-shadow-lg flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold shadow-stone-700">
            <span className="bg-skew">هنرینو</span>
            <span>, سامانه فروش مبلمان و صنایع دستی.</span>
          </h1>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg max-w-xl">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است
          </p>
        </div>
      </div>

      <div className="swiper-button-prev absolute left-5 sm:left-4 top-1/2 -translate-y-1/2 z-30 text-white cursor-pointer md:block"></div>
      <div className="swiper-button-next absolute right-5 sm:right-4 top-1/2 -translate-y-1/2 z-30 text-white cursor-pointer md:block"></div>
    </div>
  );
}

export default SliderCover;
