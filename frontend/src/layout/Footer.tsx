import LinkButton from "@/ui/LinkButton";
import Link from "next/link";
import {
  PiPackageDuotone,
  PiArrowUpRightBold,
  PiInstagramLogoLight,
  PiWhatsappLogoLight,
  PiTelegramLogoLight,
} from "react-icons/pi";

function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-primary text-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="*:size-10 text-neutral-100">
                <PiPackageDuotone />
              </span>
              <span className="text-xl font-semibold tracking-tight text-white">
                سامانه خرید و فروش هنرینو
              </span>
            </Link>
            <p className="mt-3 text-sm/6 text-stone-200">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LinkButton href="/" variation="btn-light" customClass="group">
              <span>درباره ما</span>
              <PiArrowUpRightBold className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </LinkButton>
            <LinkButton href="/" variation="btn-light" customClass="group">
              <span>همکاری با ما</span>
              <PiArrowUpRightBold className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </LinkButton>
          </div>
        </div>

        <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-white">محصول</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/features"
                  className="text-neutral-300 hover:text-white"
                >
                  ویژگی‌ها
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-neutral-300 hover:text-white"
                >
                  قیمت‌گذاری
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-neutral-300 hover:text-white"
                >
                  مستندات
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">شرکت</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-neutral-300 hover:text-white"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-neutral-300 hover:text-white"
                >
                  فرصت‌های شغلی
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-300 hover:text-white"
                >
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">منابع</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-neutral-300 hover:text-white"
                >
                  بلاگ
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-neutral-300 hover:text-white"
                >
                  تغییرات نسخه
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-neutral-300 hover:text-white"
                >
                  پشتیبانی
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <LinkButton
              href="https://whatsapp.com/your-handle"
              variation="btn-light *:size-6 *:stroke-7"
            >
              <PiWhatsappLogoLight />
            </LinkButton>

            <LinkButton
              href="https://t.me.com/your-handle"
              variation="btn-light *:size-6 *:stroke-7"
            >
              <PiTelegramLogoLight />
            </LinkButton>

            <LinkButton
              href="https://instagram.com"
              variation="btn-light *:size-6 *:stroke-7"
            >
              <PiInstagramLogoLight />
            </LinkButton>
          </div>
          <p className="text-xs/6 text-neutral-200">
            © {new Date().getFullYear()} هنرینو — همه حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
