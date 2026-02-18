import Section from "@/layout/Section";
import LinkButton from "@/ui/LinkButton";
import { link } from "fs";
import Link from "next/link";
import {
  PiHammerDuotone,
  PiInstagramLogo,
  PiPhoneCallDuotone,
  PiTelegramLogo,
  PiWhatsappLogo,
} from "react-icons/pi";

const socials = [
  { icon: <PiInstagramLogo />, link: "https://instagram.com" },
  { icon: <PiTelegramLogo />, link: "https://t.me.com" },
  { icon: <PiWhatsappLogo />, link: "https://whatsapp.com" },
];

async function Page({ params }: { params: { production: string } }) {
  const { production } = params;

  return (
    <div className="container">
      <Section
        title="داستان تولیدی ما"
        icon={<PiHammerDuotone />}
        hasViewMore={false}
      >
        <p className=" text-stone-600 leading-8">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
          اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
          قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
          با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
        </p>
      </Section>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-stretch">
          <div className="flex gap-1 items-center bg-stone-200 p-2 rounded-xl border border-stone-300">
            <span className="*:size-5">
              <PiPhoneCallDuotone />
            </span>
            <h3 className="flex items-center gap-2">
              <span>شماره تماس تولیدی: </span>
              <span>09183433428</span>
            </h3>
          </div>
          <div className="flex gap-3 items-center bg-stone-200 py-2 px-3  rounded-xl border border-stone-300">
            {socials.map((social) => (
              <Link
                key={social.link}
                href={social.link}
                className="*:size-5 hover:-translate-y-1 transition-transform"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-end mt-5">
          <LinkButton variation="btn-secondary">تماس با تولیدی</LinkButton>
          <LinkButton>مشاهده محصولات تولیدی</LinkButton>
        </div>
      </div>
    </div>
  );
}

export default Page;
