"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 ${
        scrolled
          ? "bg-agency-black/60 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-8 w-48 md:h-10 md:w-60 flex items-center" data-cursor="pointer">
          <Image
            src="/assets/reflective_Media_Final_Logo_White_PNG.png"
            alt="Reflective Media Logo"
            fill
            sizes="(max-width: 768px) 192px, 240px"
            className="object-contain"
            priority
          />
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-agency-textGrey/90">
          <Link
            href={isHome ? "#about" : "/#about"}
            onClick={(e) => handleNavClick(e, "about")}
            className="hover:text-agency-redGlow transition-colors uppercase"
            data-cursor="pointer"
          >
            {"// Agency"}
          </Link>
          <Link
            href={isHome ? "#services" : "/#services"}
            onClick={(e) => handleNavClick(e, "services")}
            className="hover:text-agency-redGlow transition-colors uppercase"
            data-cursor="pointer"
          >
            {"// Services"}
          </Link>
          <Link
            href={isHome ? "#work" : "/#work"}
            onClick={(e) => handleNavClick(e, "work")}
            className="hover:text-agency-redGlow transition-colors uppercase"
            data-cursor="pointer"
          >
            {"// Work"}
          </Link>
          <Link
            href={isHome ? "#contact" : "/#contact"}
            onClick={(e) => handleNavClick(e, "contact")}
            className="hover:text-agency-redGlow transition-colors uppercase"
            data-cursor="pointer"
          >
            {"// Connect"}
          </Link>
        </div>

        {/* Action Button */}
        <div>
          <Link
            href={isHome ? "#contact" : "/#contact"}
            onClick={(e) => handleNavClick(e, "contact")}
            className="px-5 py-2 text-xs font-mono tracking-widest border border-white/10 rounded-full hover:bg-agency-red hover:border-agency-red hover:shadow-red-glow transition-all duration-300 glassmorphism uppercase text-white"
            data-cursor="pointer"
          >
            Let&apos;s talk
          </Link>
        </div>
      </div>
    </nav>
  );
}
