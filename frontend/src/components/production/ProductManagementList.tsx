"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductType } from "@/types/types";

// Mock data - in real app, this would come from API/database
const mockProducts: ProductType[] = Array.from({ length: 5 }, (_, i) => ({
  id: 530 + i,
  cover: "/images/product.jpg",
  alt: "تصویر مبل راحتی رویال",
  name: `مبل ال راحتی رویال ${i + 1}`,
  builder: "تولیدی مبلمان آقای علیسواری",
  slug: `mbl-al-kapr-${i + 1}`,
  caption:
    "مبل ال کاپر یکی از انواع مبل‌های ال ساده و مینیمال است که به دلیل سادگی در طراحی و سبک متفاوتی که دارد مورد توجه قرار گرفته است.",
  category: "مبلمان",
  rate: 4.5,
  price: 21000000,
  offerPrice: 20000000,
  offer: 4,
}));

interface ProductManagementListProps {
  onProductSelect?: (id: number) => void;
  selectedProduct?: number | null;
}

function ProductManagementList({
  onProductSelect,
  selectedProduct,
}: ProductManagementListProps = {}) {
  const [products, setProducts] = useState(mockProducts);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (deleteConfirm === id) {
      setProducts(products.filter((p) => p.id !== id));
      setDeleteConfirm(null);
      alert("محصول حذف شد");
    } else {
      setDeleteConfirm(id);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  return (
    <div className="space-y-2 p-2">
      {products.length === 0 ? (
        <div className="bg-stone-50 rounded-lg p-8 border border-stone-200 text-center">
          <p className="text-stone-500">هیچ محصولی یافت نشد</p>
          <p className="text-stone-400 text-sm mt-2">
            برای افزودن محصول جدید، از دکمه "جدید" استفاده کنید
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductSelect?.(Number(product.id)!)}
              className={`bg-white rounded-lg p-3 border cursor-pointer transition-all ${
                selectedProduct === product.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-stone-200 hover:border-stone-300 hover:shadow-sm"
              }`}
            >
              <div className="flex gap-3">
                {/* Product Image */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={product.cover}
                    alt={product.alt}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-stone-800 mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-1 mb-2">
                        {product.caption}
                      </p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-stone-600 font-medium">
                          {formatPrice(product.price)} تومان
                        </span>
                        {product.offer! > 0 && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs font-medium">
                            {product.offer}% تخفیف
                          </span>
                        )}
                        <span className="text-stone-400">
                          ⭐ {product.rate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Inline edit form component
function ProductEditForm({
  product,
  onCancel,
  onSave,
}: {
  product: ProductType;
  onCancel: () => void;
  onSave: (product: ProductType) => void;
}) {
  const [formData, setFormData] = useState({
    name: product.name,
    caption: product.caption,
    price: product.price.toString(),
    offerPrice: product.offerPrice?.toString() || "",
    offer: product.offer?.toString() || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...product,
      name: formData.name,
      caption: formData.caption,
      price: Number(formData.price),
      offerPrice: formData.offerPrice ? Number(formData.offerPrice) : undefined,
      offer: formData.offer ? Number(formData.offer) : 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-600 mb-1">
            نام محصول
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-600 mb-1">
            قیمت (تومان)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-stone-600 mb-1">
          توضیحات
        </label>
        <textarea
          name="caption"
          value={formData.caption}
          onChange={handleChange}
          rows={2}
          className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-600 mb-1">
            قیمت با تخفیف
          </label>
          <input
            type="number"
            name="offerPrice"
            value={formData.offerPrice}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-600 mb-1">
            درصد تخفیف
          </label>
          <input
            type="number"
            name="offer"
            value={formData.offer}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
            max="100"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary btn-sm"
        >
          انصراف
        </button>
        <button type="submit" className="btn btn-primary btn-sm">
          ذخیره
        </button>
      </div>
    </form>
  );
}

export default ProductManagementList;
