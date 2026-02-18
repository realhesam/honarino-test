"use client";

import LinkButton from "@/ui/LinkButton";
import { usePathname } from "next/navigation";

const links = [
  { label: "ورود", href: "/auth/signin" },
  { label: "ثبت نام", href: "/auth/signup" },
];

function AuthLinkToggle() {
  const pathname = usePathname();

  return (
    <div className="flex items-center bg-stone-200 rounded-xl">
      {links.map((link) => (
        <LinkButton
          key={link.href}
          href={link.href}
          variation={link.href === pathname ? "btn-primary" : ""}
        >
          {link.label}
        </LinkButton>
      ))}
    </div>
  );
}

export default AuthLinkToggle;
