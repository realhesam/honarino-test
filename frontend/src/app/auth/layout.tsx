"use client";

import AuthLinkToggle from "@/components/auth/AuthLinksToggle";
import { AppError } from "@/lib/core/errors/AppError";
import { AuthService } from "@/lib/modules/auth/auth.service";
import Logo from "@/ui/Logo";
import { useNotification } from "@/utils/useNotification";
import { redirect } from "next/navigation";
import { useEffect } from "react";
function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notification = useNotification();

  useEffect(() => {
    try {
      AuthService.requireGhost();
    } catch (error) {
      if (error instanceof AppError) {
        notification.error(error.message);
        redirect("/account");
      } else {
        notification.error("خطای غیرمنتظره‌ای رخ داد");
        redirect("/account");
      }
    }
  }, []);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      <div className="absolute inset-x-0 h-25 top-0 bg-primary rounded-b-[100%]"></div>
      <div className="absolute inset-x-0 h-25 bottom-0 bg-primary  rounded-t-[100%]"></div>

      <div className="w-full max-w-80 flex flex-col items-center gap-5">
        <Logo />
        <div className="w-full bg-white flex flex-col gap-5 items-center p-5 rounded-xl drop-shadow-2xl">
          <AuthLinkToggle />
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
