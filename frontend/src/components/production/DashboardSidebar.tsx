"use client";

import {
  PiGearDuotone,
  PiPlusCircleDuotone,
  PiPackageDuotone,
} from "react-icons/pi";
import { HiBars3, HiMiniXMark } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Overlay from "@/ui/Overlay";
import { useOutsideClick } from "@/utils/useOutsideClick";

interface MenuItem {
  id: "edit" | "add-product" | "manage-products";
  label: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  activeTab: "edit" | "add-product" | "manage-products";
  onTabChange: (tab: "edit" | "add-product" | "manage-products") => void;
}

const menuItems: MenuItem[] = [
  {
    id: "edit",
    label: "ویرایش اطلاعات تولیدی",
    icon: <PiGearDuotone />,
  },
  {
    id: "add-product",
    label: "افزودن محصول",
    icon: <PiPlusCircleDuotone />,
  },
  {
    id: "manage-products",
    label: "مدیریت محصولات",
    icon: <PiPackageDuotone />,
  },
];


function SidebarContent({
  activeTab,
  onTabChange,
  onClose,
  sidebarRef,
}: {
  activeTab: DashboardSidebarProps["activeTab"];
  onTabChange: DashboardSidebarProps["onTabChange"];
  onClose: () => void;
  sidebarRef?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <aside
      ref={sidebarRef}
      className="bg-primary h-full flex flex-col sticky top-0 right-0 z-30 w-20"
    >
      <nav className="flex-1 p-3 flex flex-col items-center gap-2 pt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onTabChange(item.id);
              onClose();
            }}
            className={`w-14 h-14 flex items-center justify-center rounded-xl transition-all ${
              activeTab === item.id
                ? "bg-white text-primary shadow-lg scale-110"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
            title={item.label}
          >
            <span className="*:size-6">{item.icon}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={onClose}
        className="lg:hidden p-3 text-white/80 hover:text-white mb-4"
      >
        <HiMiniXMark className="*:size-6" />
      </button>
    </aside>
  );
}

function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { ref } = useOutsideClick<HTMLDivElement>(setIsMobileOpen);


  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-5 left-4 z-40 p-2 bg-white rounded-lg shadow-lg border border-stone-200 *:size-6 text-stone-600"
      >
        <HiBars3 />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden relative md:block w-20 shrink-0">
        <SidebarContent
          activeTab={activeTab}
          onTabChange={onTabChange}
          onClose={() => {}}
        />
      </div>

      {/* Mobile Sidebar */}
      {mounted &&
        createPortal(
          <>
            <div
              ref={ref}
              className={`lg:hidden fixed inset-y-0 right-0 w-20 z-50 transition-transform ${
                isMobileOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <SidebarContent
                activeTab={activeTab}
                onTabChange={onTabChange}
                onClose={() => setIsMobileOpen(false)}
              />
            </div>

            {isMobileOpen && <Overlay />}
          </>,
          document.body
        )}
    </>
  );
}

export default DashboardSidebar;
