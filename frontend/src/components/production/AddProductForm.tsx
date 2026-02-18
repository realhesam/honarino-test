"use client";

import { useState } from "react";
import LinkButton from "@/ui/LinkButton";
import { PiImageDuotone, PiPackageDuotone } from "react-icons/pi";

function AddProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    caption: "",
    cover: "",
    alt: "",
    price: "",
    offerPrice: "",
    offer: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
      alt: `تصویر ${name}`,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.price) {
      alert("لطفا نام و قیمت محصول را وارد کنید");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In real app, send data to API
    const productData = {
      ...formData,
      price: Number(formData.price),
      offerPrice: formData.offerPrice ? Number(formData.offerPrice) : null,
      offer: formData.offer ? Number(formData.offer) : 0,
      rate: 0,
    };

    console.log("Product added:", productData);

    // Reset form
    setFormData({
      name: "",
      slug: "",
      caption: "",
      cover: "",
      alt: "",
      price: "",
      offerPrice: "",
      offer: "",
      category: "",
    });

    setIsSubmitting(false);
    alert("محصول با موفقیت افزوده شد");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
              value={formData.name}
              onChange={handleNameChange}
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
              value={formData.slug}
              onChange={handleChange}
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
              value={formData.category}
              onChange={handleChange}
              className="input-light"
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
              value={formData.caption}
              onChange={handleChange}
              rows={4}
              className="input-light h-32"
              placeholder="توضیحات کامل محصول..."
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
                value={formData.cover}
                onChange={handleChange}
                className="input-light"
                placeholder="/images/product.jpg"
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
              value={formData.alt}
              onChange={handleChange}
              className="input-light"
              placeholder="تصویر محصول"
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
              قیمت اصلی (تومان) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input-light"
              placeholder="21000000"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              قیمت با تخفیف (تومان)
            </label>
            <input
              type="number"
              name="offerPrice"
              value={formData.offerPrice}
              onChange={handleChange}
              className="input-light"
              placeholder="20000000"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              درصد تخفیف
            </label>
            <input
              type="number"
              name="offer"
              value={formData.offer}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
              placeholder="4"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      <div className="flex *:grow sm:flex-row justify-end gap-3 pt-6 mt-6 border-t-2 border-stone-200">
        <LinkButton
          type="button"
          variation="btn-secondary"
          customClass="justify-center"
          onClick={() =>
            setFormData({
              name: "",
              slug: "",
              caption: "",
              cover: "",
              alt: "",
              price: "",
              offerPrice: "",
              offer: "",
              category: "",
            })
          }
        >
          پاک کردن فرم
        </LinkButton>
        <LinkButton
          type="submit"
          disabled={isSubmitting}
          customClass="justify-center"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              در حال افزودن...
            </span>
          ) : (
            "افزودن محصول"
          )}
        </LinkButton>
      </div>
    </form>
  );
}

export default AddProductForm;
