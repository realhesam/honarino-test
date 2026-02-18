import ProductionLayoutCondition from "@/components/production/ProductionLayoutCondition";
import LoadingSpinner from "@/layout/LoadingSpinner";

import { Suspense } from "react";
// import { usePathname } from "next/navigation";
import {
  PiChatCenteredDotsDuotone,
  PiGearDuotone,
  PiHouseLineDuotone,
  PiQuestionDuotone,
  PiShoppingCartDuotone,
} from "react-icons/pi";

async function Layout({ children, params }: any) {
  // const pathname = usePathname();
  // const isDashboard = pathname?.includes("/dashboard");

  // If it's the dashboard, return children without production header
  // if (isDashboard) {
  //   return <>{children}</>;
  // }

  const { production } = params;

  // fake data...
  const pages = [
    {
      label: "صفحه اصلی",
      href: `/${production}`,
      icon: <PiHouseLineDuotone />,
    },
    {
      label: "محصولات",
      href: `/${production}/products`,
      icon: <PiShoppingCartDuotone />,
    },
    {
      label: "نظرات",
      href: `/${production}/comments`,
      icon: <PiChatCenteredDotsDuotone />,
    },
    {
      label: "درباره تولیدی",
      href: `/${production}/about`,
      icon: <PiQuestionDuotone />,
    },
    {
      label: "داشبورد",
      href: `/${production}/dashboard`,
      icon: <PiGearDuotone />,
    },
  ];

  const data = {
    logo: "/images/production-logo.jpg",
    name: "تولیدی آقای علیسواری",
    caption: "تولیدی مبلمان و صنایع دستی آقای علیسواری",
    rate: 3,
  };

  return (
    <ProductionLayoutCondition
      data={data}
      pages={pages}
      production={production}
    >
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </ProductionLayoutCondition>
  );
}

export default Layout;
