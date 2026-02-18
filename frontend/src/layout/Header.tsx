"use client";

import Navigation from "@/ui/Navigation";
import Logo from "@/ui/Logo";
import { useEffect, useState } from "react";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import LinkButton from "@/ui/LinkButton";

function Header() {
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowPanel(true);
      } else {
        setShowPanel(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`hidden fixed z-20 inset-x-0 h-15 bg-white/20 backdrop-blur-sm drop-shadow-xl transition-all duration-300 border-b border-stone-300/40 md:block ${
          showPanel ? "top-0" : "-top-15"
        }`}
      ></div>
      <header className="bg-white md:bg-transparent fixed top-0 left-0 right-0 md:top-5 z-40">
        <div className="container">
          <div className="md:bg-white drop-shadow-xl shadow-stone-200 h-20 md:px-4 rounded-xl flex justify-between items-center">
            <div className="grow flex items-center justify-between sm:flex-row-reverse">
              <div className="sm:grow flex justify-center">
                <Navigation />
              </div>
              <div className="grow flex justify-center sm:grow-0">
                <Logo />
              </div>
            </div>
            <div className="flex items-center gap-2.5 lg:gap-5">
              <div className="hidden gap-2 sm:flex">
                <LinkButton href="/auth/signin">ورود</LinkButton>
                <LinkButton href="/auth/signup" customClass="hidden lg:flex">
                  ثبت نام
                </LinkButton>
              </div>

              <span className="hidden w-0.5 h-7 bg-stone-300 md:block"></span>

              <button className="p-1 md:p-2 border-2 border-stone-300 rounded-xl cursor-pointer hover:bg-stone-50 transition">
                <span className="*:size-8 text-stone-300">
                  <PiMagnifyingGlassDuotone />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
