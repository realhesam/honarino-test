import {
  PiImageDuotone,
  PiMagnifyingGlassDuotone,
  PiPackageDuotone,
  PiPlusCircleDuotone,
} from "react-icons/pi";
import ProductManagementList from "./ProductManagementList";
import LinkButton from "@/ui/LinkButton";
import { Suspense } from "react";
import LoadingSpinner from "@/layout/LoadingSpinner";

// fake data ...
const selectedProductData = {
  name: "مبل ال راحتی رویال",
  slug: "mbl-al-rahati-royal",
  caption:
    "مبل ال کاپر یکی از انواع مبل‌های ال ساده و مینیمال است که به دلیل سادگی در طراحی و سبک متفاوتی که دارد مورد توجه قرار گرفته و فروش خوبی در بازار داشته است. مبل‌های مینیمال قابلیت استفاده در انواع فضاها را برای خریدار فراهم میکنند و مبل ال کاپر برای افرادی که فضای کمی دارند انتخابی مناسب، اقتصادی، زیبا و به روز است. پایه‌های مبل ال کاپر از جنس چوب هستند و امکان ساخت آن با پایه‌های فلزی با توجه به تغییر در طراحی و سبک مبل وجود ندارد. دوخت مبل ال کاپر به صورت ساده به دلیل زیبایی خاصی که دارد طراحی شده است اما شما می‌توانید دوخت کفی، پشت و بخش‌های دیگر مبل ال کاپر را براساس سلیقه خود شخصی سازی کنید. ابعاد مبل ال کاپر قابل تغییر براساس نیاز شماست و می‌توان دو کاناپه این مبل را در ابعاد مختلف سفارش دارد. ",
  category: "مبلمان",
  price: 200000000,
  offerPrice: 190000000,
  offer: 4,
  images: {
    path: "/images/product-2.webp",
    alt: "تصویری از مبل راحتی رویال",
  },
};

function EditProductForm({
  selectedProduct,
  setSelectedProduct,
}: Readonly<{
  selectedProduct: number | null;
  setSelectedProduct: (id: number) => void;
}>) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Pane - Product List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
            <div className="p-4 border-b border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-stone-800">لیست محصولات</h3>
                <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  <PiPlusCircleDuotone className="inline *:size-4 ml-1" />
                  جدید
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجو محصول..."
                  className="w-full px-4 py-2 pr-10 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <PiMagnifyingGlassDuotone className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 *:size-4" />
              </div>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              <ProductManagementList
                onProductSelect={setSelectedProduct}
                selectedProduct={selectedProduct}
              />
            </div>
          </div>
        </div>

        {/* Right Pane - Product Details/Form */}
        <div className="lg:col-span-2">
          <div className="px-6">
            {selectedProduct ? (
              <div>
                <Suspense fallback={<LoadingSpinner />}>
                  <form className="space-y-5">
                    <div className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-stone-800 mb-5 pb-3 border-b border-stone-200 flex items-center gap-2">
                        <PiPackageDuotone />
                        <span>اطلاعات محصول</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-semibold text-stone-700 mb-2">
                            نام محصول <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            defaultValue={selectedProductData.name}
                            className="input-light"
                            placeholder="مثال: مبل ال راحتی رویال"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-stone-700 mb-2">
                            شناسه محصول (Slug)
                          </label>
                          <input
                            type="text"
                            name="slug"
                            defaultValue={selectedProductData.slug}
                            className="input-light"
                            placeholder="mbl-al-rahati-royal"
                            readOnly
                          />
                          <p className="text-xs text-stone-500 mt-2">
                            این شناسه به صورت خودکار از نام محصول ساخته می‌شود
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-stone-700 mb-2">
                            دسته‌بندی
                          </label>
                          <select
                            name="category"
                            className="input-light"
                            defaultValue={selectedProductData.category}
                          >
                            <option value="">انتخاب دسته‌بندی</option>
                            <option value="مبلمان">مبلمان</option>
                            <option value="تخت خواب">تخت خواب</option>
                            <option value="صنایع چوبی">صنایع چوبی</option>
                            <option value="دکوراسیون">دکوراسیون</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-sm font-semibold text-stone-700 mb-2">
                            توضیحات محصول
                          </label>
                          <textarea
                            name="caption"
                            rows={4}
                            className="input-light h-32"
                            placeholder="توضیحات کامل محصول..."
                            defaultValue={selectedProductData.caption}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-stone-800 mb-5 pb-3 border-b border-stone-200">
                        تصویر محصول
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-stone-700 mb-2">
                            آدرس تصویر
                          </label>
                          <div className="flex-col flex gap-2 xs:flex-row">
                            <input
                              type="text"
                              name="cover"
                              className="input-light"
                              placeholder="/images/product.jpg"
                              defaultValue={selectedProductData.images.path}
                            />
                            <LinkButton
                              type="button"
                              size="btn-lg"
                              customClass="text-base justify-center gap-2"
                            >
                              <span className="*:size-5">
                                <PiImageDuotone />
                              </span>
                              <span>آپلود</span>
                            </LinkButton>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-stone-700 mb-2">
                            متن جایگزین تصویر (Alt)
                          </label>
                          <input
                            type="text"
                            name="alt"
                            className="input-light"
                            placeholder="تصویر محصول"
                            defaultValue={selectedProductData.images.alt}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-stone-800 mb-5 pb-3 border-b border-stone-200">
                        قیمت‌گذاری
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-stone-700 mb-2">
                            قیمت اصلی (تومان){" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            name="price"
                            className="input-light"
                            placeholder="21000000"
                            required
                            min="0"
                            defaultValue={selectedProductData.price}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-stone-700 mb-2">
                            قیمت با تخفیف (تومان)
                          </label>
                          <input
                            type="number"
                            name="offerPrice"
                            className="input-light"
                            placeholder="20000000"
                            min="0"
                            defaultValue={selectedProductData.offerPrice}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-stone-700 mb-2">
                            درصد تخفیف
                          </label>
                          <input
                            type="number"
                            name="offer"
                            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
                            placeholder="4"
                            min="0"
                            max="100"
                            defaultValue={selectedProductData.offer}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex *:grow sm:flex-row justify-end gap-3 pt-6 mt-6 border-t-2 border-stone-200">
                      <LinkButton
                        type="button"
                        variation="btn-secondary"
                        customClass="justify-center"
                      >
                        پاک کردن فرم
                      </LinkButton>
                      <LinkButton type="submit" customClass="justify-center">
                        افزودن محصول
                      </LinkButton>
                    </div>
                  </form>
                </Suspense>
              </div>
            ) : (
              <div className="text-center py-12">
                <PiPackageDuotone className="size-16 text-stone-300 mx-auto mb-4" />
                <p className="text-stone-500 mb-2">محصولی انتخاب نشده است</p>
                <p className="text-sm text-stone-400">
                  از لیست سمت راست یک محصول را انتخاب کنید
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductForm;
