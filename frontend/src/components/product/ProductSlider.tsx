"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductSliderProps {
  images: string[];
}

export default function ProductSlider({ images }: ProductSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="w-full">
      <Swiper
        navigation
        spaceBetween={12}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mb-4"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full aspect-square max-w-[680px] max-h-[80vh] mx-auto">
              <Image
                src={src}
                alt={`product-${i}`}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 640px) 100vw, (max-width:1024px) 50vw, 680px"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center">
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={12}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className="max-w-[680px]"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i} className="!w-13 md:!w-20">
              <div className="relative aspect-square size-13 md:size-20 cursor-pointer">
                <Image
                  src={src}
                  alt={`thumb-${i}`}
                  fill
                  className="object-cover rounded"
                  sizes="80px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
