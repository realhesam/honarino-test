import ProductList from "@/components/product/ProductList";
import ProductPanel from "@/components/product/ProductPanel";
import Section from "@/layout/Section";
import { PiShoppingCartDuotone } from "react-icons/pi";

// fake Data ...
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

function Page() {
  return (
    <div>
      <Section
        title="محصولات تولیدی"
        icon={<PiShoppingCartDuotone />}
        hasViewMore={false}
      >
        <div className="container">
          <ProductPanel products={products} />
        </div>
      </Section>
    </div>
  );
}

export default Page;
