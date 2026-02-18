"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardSidebar from "@/components/production/DashboardSidebar";
import ProductionEditForm from "@/components/production/ProductionEditForm";
import AddProductForm from "@/components/production/AddProductForm";
import ProductManagementList from "@/components/production/ProductManagementList";
import {
  PiPlusCircleDuotone,
  PiPackageDuotone,
  PiPencilSimpleDuotone,
  PiMagnifyingGlassDuotone,
} from "react-icons/pi";
import EditProductForm from "@/components/production/EditProductForm";

// Mock production data
const productionData = {
  name: "تولیدی آقای علیسواری",
  caption: "تولیدی مبلمان و صنایع دستی آقای علیسواری",
  logo: "/images/production-logo.jpg",
  cover: "/images/2.jpg", // Banner image
  status: "فعال",
  id: "4029",
  category: "مبلمان",
  location: "همدان - ملایر",
  rate: 4.5,
  productsCount: 24,
  phone: "09124834820",
};

function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "edit" | "add-product" | "manage-products"
  >("manage-products");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const tabs = [
    {
      id: "manage-products" as const,
      label: "محصولات",
      count: productionData.productsCount,
    },
    {
      id: "edit" as const,
      label: "اطلاعات تولیدی",
    },
    {
      id: "add-product" as const,
      label: "افزودن محصول",
    },
  ];

  return (
    <div className="block min-h-screen bg-stone-50 md:grid grid-cols-[5rem_1fr]">
      {/* Left Sidebar */}
      <div className="bg-primary relative">
        <div className="fixed z-50">
          <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Banner Section */}
        <div className="relative h-80 sm:h-80 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={productionData.cover}
              alt={productionData.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Production Info Card Overlay */}
          <div className="absolute inset-0 m-auto px-5 flex justify-center items-center">
            <div className="w-full max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-2">
                      {productionData.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                        {productionData.status}
                      </span>
                      <span className="text-sm text-stone-600">
                        شناسه: {productionData.id}
                      </span>
                    </div>
                  </div>
                  <button className="self-start sm:self-auto px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-sm font-medium text-stone-700 transition-colors flex items-center gap-2">
                    <PiPencilSimpleDuotone />
                    <span>ویرایش کاور</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-200">
                  <div>
                    <p className="text-xs text-stone-500 mb-1">دسته‌بندی</p>
                    <p className="text-sm font-semibold text-stone-800">
                      {productionData.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-1">مکان</p>
                    <p className="text-sm font-semibold text-stone-800">
                      {productionData.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-1">امتیاز</p>
                    <p className="text-sm font-semibold text-stone-800">
                      {productionData.rate} ⭐
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-1">تعداد محصولات</p>
                    <p className="text-sm font-semibold text-stone-800">
                      {productionData.productsCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white border-b border-stone-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-stone-600 hover:text-stone-800"
                  }`}
                >
                  {tab.label}
                  {tab.count && (
                    <span className="mr-2 px-2 py-0.5 bg-stone-100 rounded text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === "manage-products" && (
            <EditProductForm
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          )}

          {activeTab === "edit" && (
            <div className="max-w-4xl mx-auto">
              <div className="py-6">
                <ProductionEditForm />
              </div>
            </div>
          )}

          {activeTab === "add-product" && (
            <div className="max-w-4xl mx-auto">
              <div className="rounded-xl py-6">
                <AddProductForm />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
