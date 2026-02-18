"use client";
import { PiStarFill } from "react-icons/pi";

function RateStar({ rate }: Readonly<{ rate: number }>) {
  const stars = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="flex gap-2 items-center" dir="ltr">
      <div className="flex gap-2 items-center">
        {stars.map((star) => (
          <span
            key={star}
            className={`*:size-5   ${
              rate > star ? "text-amber-400" : "text-stone-300"
            }`}
          >
            <PiStarFill />
          </span>
        ))}
      </div>
      <p className="text-stone-500">&bull; {rate} / 5</p>
    </div>
  );
}

export default RateStar;
