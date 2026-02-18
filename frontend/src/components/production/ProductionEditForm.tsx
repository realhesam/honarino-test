"use client";

import { useState } from "react";
import LinkButton from "@/ui/LinkButton";
import RowField from "@/ui/RowField";
import CustomContentForm from "./CustomContentForm";
import type { CustomContentItem } from "./CustomContentForm";
import {
  PiMapPinDuotone,
  PiPhoneDuotone,
  PiGlobeDuotone,
  PiInstagramLogo,
  PiTelegramLogo,
  PiWhatsappLogo,
  PiImageDuotone,
} from "react-icons/pi";

// Initial data - in real app, this would come from API/database
const initialData = {
  name: "تولیدی آقای علیسواری",
  caption: "تولیدی مبلمان و صنایع دستی آقای علیسواری",
  logo: "/images/production-logo.jpg",
  phone: "09124834820, 09022392010",
  address: "همدان - ملایر - بلوار شهید چمران - روبروی فروشگاه کوروش",
  website: "example.com",
  instagram: "https://instagram.com",
  telegram: "https://t.me.com",
  whatsapp: "https://whatsapp.com",
  description: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
  در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
  نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.`,
};

// Initial custom content - in real app, this would come from API/database
const initialCustomContent: CustomContentItem[] = [
  { title: "معرفی", caption: "متن تستی" },
  { title: "داستان ما", caption: "متن تستی" },
];

function ProductionEditForm() {
  const [formData, setFormData] = useState(initialData);
  const [customContent, setCustomContent] =
    useState<CustomContentItem[]>(initialCustomContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    alert("اطلاعات با موفقیت به‌روزرسانی شد");
  };

  const handleCustomContentSave = (items: CustomContentItem[]) => {
    setCustomContent(items);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-bold text-stone-800 mb-5 pb-3 border-b border-stone-200">
          اطلاعات اصلی تولیدی
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              نام تولیدی <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input h-12 bg-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              توضیحات کوتاه <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              className="input h-12 bg-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-2">
              آدرس لوگو
            </label>
            <div className="flex flex-col xs:flex-row gap-2">
              <input
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                className="input h-12 bg-transparent"
                placeholder="/images/production-logo.jpg"
              />
              <LinkButton
                type="button"
                size="btn-lg text-base justify-center gap-2"
              >
                <span className="*:size-5">
                  <PiImageDuotone />
                </span>
                <span>آپلود</span>
              </LinkButton>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-2">
              توضیحات کامل
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="input min-h-32 bg-transparent resize-none text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-bold text-stone-800 mb-5 pb-3 border-b border-stone-200">
          اطلاعات تماس
        </h3>

        <div className="space-y-4">
          <RowField label="شماره تماس:" icon={<PiPhoneDuotone />}>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white text-left"
              placeholder="09123456789"
            />
          </RowField>

          <RowField label="آدرس:" icon={<PiMapPinDuotone />}>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white text-left"
              placeholder="آدرس تولیدی"
            />
          </RowField>

          <RowField label="وبسایت:" icon={<PiGlobeDuotone />}>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white text-left"
              placeholder="https://example.com"
            />
          </RowField>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-bold text-stone-800 mb-5 pb-3 border-b border-stone-200">
          شبکه‌های اجتماعی
        </h3>

        <div className="space-y-4">
          <RowField label="اینستاگرام:" icon={<PiInstagramLogo />}>
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white text-left"
              placeholder="https://instagram.com/username"
            />
          </RowField>

          <RowField label="تلگرام:" icon={<PiTelegramLogo />}>
            <input
              type="url"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white text-left"
              placeholder="https://t.me/username"
            />
          </RowField>

          <RowField label="واتساپ:" icon={<PiWhatsappLogo />}>
            <input
              type="url"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white text-left"
              placeholder="https://wa.me/989123456789"
            />
          </RowField>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-bold text-stone-800 mb-5 pb-3 border-b border-stone-200">
          محتوای سفارشی
        </h3>
        <CustomContentForm
          initialItems={customContent}
          onSave={handleCustomContentSave}
        />
      </div>

      <div className="flex *:grow sm:flex-row justify-end gap-3 pt-6 mt-6 border-t-2 border-stone-200">
        <LinkButton
          type="button"
          variation="btn-secondary"
          onClick={() => setFormData(initialData)}
          customClass="justify-center"
        >
          بازنشانی
        </LinkButton>
        <LinkButton
          type="submit"
          disabled={isSubmitting}
          customClass="justify-center"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              در حال ذخیره...
            </span>
          ) : (
            "ذخیره تغییرات"
          )}
        </LinkButton>
      </div>
    </form>
  );
}

export default ProductionEditForm;
