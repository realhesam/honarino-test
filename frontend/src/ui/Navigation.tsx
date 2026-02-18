"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { HiBars3, HiMiniXMark } from "react-icons/hi2";
import {
  PiCirclesFourDuotone,
  PiHouseLineDuotone,
  PiMagnifyingGlassDuotone,
  PiQuestionDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import { createPortal } from "react-dom";
import Logo from "@/ui/Logo";
import Overlay from "@/ui/Overlay";
import { useOutsideClick } from "@/utils/useOutsideClick";
import LinkButton from "./LinkButton";

const links = [
  {
    icon: <PiHouseLineDuotone />,
    label: "صفحه اصلی",
    path: "/",
  },
  {
    icon: <PiCirclesFourDuotone />,
    label: "دسته بندی ها",
    path: "/category",
  },
  {
    icon: <PiQuestionDuotone />,
    label: "درباره ما",
    path: "/about",
  },
  {
    icon: <PiUsersThreeDuotone />,
    label: "تماس با ما",
    path: "/support",
  },
];

function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { ref } = useOutsideClick(() => setIsOpen(false));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;

  return (
    <>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="sm:hidden *:size-8 p-1 border-2 rounded-full border-stone-300 text-stone-300 cursor-pointer"
        >
          <HiBars3 />
        </button>

        {/* Mobile Menu */}
        {createPortal(
          <>
            <nav
              className={`w-full max-w-70 fixed inset-y-0 bg-white drop-shadow-2xl z-50 sm:hidden transition-all ${
                isOpen ? "right-0" : "-right-70"
              }`}
              ref={ref}
            >
              <div className="flex items-center justify-between p-2 py-3 border-b border-stone-200">
                <Logo />
                <button
                  className="*:size-8 text-stone-300"
                  onClick={() => setIsOpen(false)}
                >
                  <HiMiniXMark />
                </button>
              </div>

              <form className="flex items-stretch gap-1 px-2 pt-2">
                <input
                  type="text"
                  className="input placeholder:text-xs"
                  placeholder="نام کالا یا تولیدی خود را وارد کنید"
                />
                <LinkButton type="submit">
                  <span className="*:size-4.5">
                    <PiMagnifyingGlassDuotone />
                  </span>
                </LinkButton>
              </form>

              <ul className="p-2 space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className={`flex items-center gap-1 p-2 rounded-md ${
                        link.path === pathname && "bg-primary/15"
                      }`}
                    >
                      <span
                        className={`*:size-6 ${
                          link.path === pathname
                            ? "text-primary"
                            : "text-stone-400"
                        }`}
                      >
                        {link.icon}
                      </span>
                      <span className="text-stone-700">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex gap-2 *:text-base *:grow *:flex *:items-center *:justify-center px-2 border-t border-stone-200 pt-2">
                <LinkButton href="/auth/signin">ورود</LinkButton>
                <LinkButton href="/auth/signup">ثبت نام</LinkButton>
              </div>
            </nav>
            {isOpen && <Overlay />}
          </>,
          document.body
        )}
      </div>

      {/* Pc Navigation */}
      <nav className="hidden sm:block">
        <ul className="flex gap-5 items-center">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={
                  link.path === pathname
                    ? "text-primary"
                    : "text-stone-800 hover:text-stone-600"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
