"use client";

import Link from "next/link";

interface LinkButtonProps {
  children: React.ReactNode;
  href?: string;
  size?: string;
  variation?: string;
  customClass?: string;
  disabled?: any;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

function LinkButton({
  children,
  href,
  size = "btn-md",
  variation = "btn-primary",
  customClass = "",
  disabled,
  onClick,
  type = "button",
}: Readonly<LinkButtonProps>) {
  const classes = `btn ${variation} ${size} ${customClass}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      type={type}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default LinkButton;
