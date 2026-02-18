"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function Overlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleMount = () => {
      setMounted(true);
    };
    handleMount();
  }, []);

  return (
    mounted &&
    createPortal(
      <div className="bg-stone-200/50 backdrop-blur-lg inset-0 fixed z-40"></div>,
      document.body
    )
  );
}

export default Overlay;
