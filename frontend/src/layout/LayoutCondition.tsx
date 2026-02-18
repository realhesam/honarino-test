"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

const limitedPages = ["/auth/signin", "/auth/signup", "/account"];

function LayoutCondition({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  if (pathname.search("dashboard") !== -1) return <main>{children}</main>;
  if (limitedPages.includes(pathname)) return <main>{children}</main>;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default LayoutCondition;
