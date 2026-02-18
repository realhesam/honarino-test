import Section from "@/layout/Section";
import LinkButton from "@/ui/LinkButton";
import MiniCard from "@/ui/MiniCard";
import RateStar from "@/ui/RateStar";
import RowField from "@/ui/RowField";
import Link from "next/link";
import {
  PiArmchairDuotone,
  PiBedDuotone,
  PiGlobeDuotone,
  PiInstagramLogo,
  PiMapPinDuotone,
  PiPhoneDuotone,
  PiQuestionDuotone,
  PiShareNetworkDuotone,
  PiStarDuotone,
  PiTelegramLogo,
  PiWhatsappLogo,
} from "react-icons/pi";

// fake data
const data = {
  informationText: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
  در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
  نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
  کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
  جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
  طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
  فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری
  موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد
  نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل
  دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن
  ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
  گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
  که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع
  با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
  درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا
  با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
  طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می
  توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط
  سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاو`,
  phone: "09124834820, 09022392010",
  address: "همدان - ملایر - بلوار شهید چمران - روبروی فروشگاه کوروش",
  rate: 4,
  tags: [
    {
      icon: <PiArmchairDuotone />,
      label: "مبلمان",
      link: "/tags/sofa",
    },
    {
      icon: <PiBedDuotone />,
      label: "تخت خواب",
      link: "/tags/sofa",
    },
    {
      icon: <PiBedDuotone />,
      label: "صنایع چوبی",
      link: "/tags/sofa",
    },
  ],
  socials: [
    { icon: <PiInstagramLogo />, link: "https://instagram.com" },
    { icon: <PiTelegramLogo />, link: "https://t.me.com" },
    { icon: <PiWhatsappLogo />, link: "https://whatsapp.com" },
  ],
};

function Page() {
  return (
    <div>
      <Section
        title="درباره ما"
        icon={<PiQuestionDuotone />}
        hasViewMore={false}
      >
        <div className="container">
          <div className="grid grid-cols-[1fr_20rem] gap-5">
            <div className="">
              <p className="leading-7 text-justify text-stone-500">
                {data.informationText}
              </p>
              <div className="mt-5 flex flex-wrap items-center *:grow *:w-auto gap-5">
                {data?.tags.map((tag) => (
                  <MiniCard
                    key={tag.label}
                    icon={tag.icon}
                    title={tag.label}
                    link={tag.link}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 *:bg-white *:rounded-xl *:border *:border-stone-200">
              <RowField label="شماره تماس ها:" icon={<PiPhoneDuotone />}>
                <p className="text-stone-500">{data.phone}</p>
              </RowField>
              <RowField label="آدرس تولیدی:" icon={<PiMapPinDuotone />}>
                <p className="mt-1 text-sm text-stone-500">{data.address}</p>
              </RowField>
              <RowField
                label="شبکه های مجازی:"
                icon={<PiShareNetworkDuotone />}
              >
                <div className="flex gap-2 justify-end items-center">
                  {data.socials.map((social) => (
                    <Link
                      key={social.link}
                      href={social.link}
                      className="text-stone-600 bg-stone-200/70 p-1 *:size-5 hover:-translate-y-1 transition-transform rounded-lg border border-stone-300"
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </RowField>
              <RowField label="امتیاز تولیدی:" icon={<PiStarDuotone />}>
                <RateStar rate={data.rate} />
              </RowField>
              <RowField label="وبسایت های تولیدی" icon={<PiGlobeDuotone />}>
                <LinkButton href="example.com">مشاهده وبسایت</LinkButton>
              </RowField>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default Page;
