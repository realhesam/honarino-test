import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi2";

function MiniCard({
  icon,
  title,
  description,
  link,
}: Readonly<{
  icon: React.ReactNode;
  title: string;
  description?: string;
  link?: string;
}>) {
  return (
    <div className="grow bg-white p-5 rounded-xl border border-stone-200 flex flex-col items-center">
      <div className="*:size-14 text-primary bg-primary/10 p-5 mb-2 rounded-full">
        {icon}
      </div>
      <h3 className="flex flex-col items-center text-stone-700">
        <span className="text-2xl font-black">{title}</span>
        {description && <span className="text-stone-600">{description}</span>}
      </h3>
      {link && (
        <Link
          className="mt-2 text-sm flex items-center gap-1 text-stone-500"
          href={link}
        >
          <span>مشاهده بیشتر</span>
          <span className="*:size-4">
            <HiChevronLeft />
          </span>
        </Link>
      )}
    </div>
  );
}

export default MiniCard;
