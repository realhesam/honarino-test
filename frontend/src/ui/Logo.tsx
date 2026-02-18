import { PiPackageDuotone } from "react-icons/pi";

function Logo({
  iconVisible = true,
  className,
}: Readonly<{
  iconVisible?: boolean;
  className?: string;
}>) {
  return (
    <h2 className={`flex items-center gap-2.5 text-2xl ${className}`}>
      {iconVisible && (
        <span className="*:size-10 text-primary">
          <PiPackageDuotone />
        </span>
      )}
      <span className="text-primary font-bold">هنرینو</span>
    </h2>
  );
}

export default Logo;
