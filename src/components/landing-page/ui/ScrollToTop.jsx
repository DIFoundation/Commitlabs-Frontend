"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-[#0ff0fc] hover:bg-[#0a7a82] text-white transition-all duration-300 z-50 hover:scale-105 hover:cursor-pointer shadow-xl shadow-black/50"
    >
      <ArrowUp className="w-5 h-5 animate-bounce" />
    </button>
  );
}
