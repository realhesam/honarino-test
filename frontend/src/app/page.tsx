import Banners from "@/ui/Banners";
import SliderCover from "@/ui/SliderCover";
import Section from "@/layout/Section";
import {
  PiCirclesFourDuotone,
  PiNoteDuotone,
  PiPercentDuotone,
  PiQuestion,
  PiShootingStarDuotone,
} from "react-icons/pi";
import ProductList from "@/components/product/ProductList";
import Category from "@/components/category/Category";
import LoadingSpinner from "@/layout/LoadingSpinner";
import { Suspense } from "react";
import ProductPanel from "@/components/product/ProductPanel";
import Services from "@/components/other/Services";

// Fake Data ....
const products = Array.from({ length: 10 }, (_, i) => {
  return {
    id: 530,
    cover: "/images/product.jpg",
    alt: "تصویر مبل راحتی رویال",
    name: "مبل ال راحتی رویال",
    builder: "تولیدی مبلمان آقای علیسواری",
    slug: "mbl-al-kapr",
    caption:
      "مبل ال کاپر یکی از انواع مبل‌های ال ساده و مینیمال است که به دلیل سادگی در طراحی و سبک متفاوتی که دارد مورد توجه قرار گرفته و فروش خوبی در بازار داشته است. مبل‌های مینیمال قابلیت استفاده در انواع فضاها را برای خریدار فراهم میکنند و مبل ال کاپر برای افرادی که فضای کمی دارند انتخابی مناسب، اقتصادی، زیبا و به روز است. ",
    category: "مبلمان",
    rate: 4.5,
    price: 21000000,
    offerPrice: 20000000,
    offer: 4,
  };
});

function Home() {
  return (
    <div>
      <SliderCover />
      <Section
        title="برترین ها"
        caption="برترین تولیدی های هنرینو"
        icon={<PiShootingStarDuotone />}
      >
        <Banners />
      </Section>

      <Section
        title="دسته بندی"
        caption="چیزی که مبخوای رو انتخاب کن"
        hasViewMore={false}
        icon={<PiCirclesFourDuotone />}
      >
        <div className="container">
          <Category />
        </div>
      </Section>

      <Section
        id="preview"
        title="پیشنمایش محصولات"
        caption="محصولاتی که میخوای دسته بندی کن"
        icon={<PiNoteDuotone />}
      >
        <div className="container">
          <ProductPanel products={products} />
        </div>
      </Section>

      <Section
        title="تخفیف های ویژه"
        caption="تخفیف های ویژه محصولات هنرینو"
        icon={<PiPercentDuotone />}
        withBg="bg-emerald-600"
        textColor="text-emerald-600"
      >
        <div className="container">
          <Suspense fallback={<LoadingSpinner theme="light" />}>
            <ProductList products={products.slice(0, 5)} />
          </Suspense>
        </div>
      </Section>

      <Section
        hasViewMore={false}
        title="چرا هنرینو"
        caption="چرا باید از خدمات ما استفاده کنید؟"
        icon={<PiQuestion />}
      >
        <div className="container">
          <Services />
        </div>
      </Section>
    </div>
  );
}

export default Home;
