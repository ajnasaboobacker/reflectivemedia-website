"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Layers, Film, Phone } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // 1. Scrolled state for top header
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Section tracking for mobile bottom nav
      if (isHome) {
        const sections = ["about", "services", "work", "contact"];
        const scrollPos = window.scrollY + 300;
        let currentSection = "";

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              currentSection = sectionId;
            }
          }
        }

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 15) {
          currentSection = "contact";
        }

        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    if (pathname.startsWith("/services/")) {
      setActiveSection("services");
    }
  }, [pathname]);

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
    <>
      {/* Top Navbar */}
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

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-agency-textGrey/90">
            <Link
              href={isHome ? "#about" : "/#about"}
              onClick={(e) => handleNavClick(e, "about")}
              className={`hover:text-agency-redGlow transition-colors uppercase ${
                activeSection === "about" ? "text-agency-redGlow" : ""
              }`}
              data-cursor="pointer"
            >
              {"// Agency"}
            </Link>
            <Link
              href={isHome ? "#services" : "/#services"}
              onClick={(e) => handleNavClick(e, "services")}
              className={`hover:text-agency-redGlow transition-colors uppercase ${
                activeSection === "services" ? "text-agency-redGlow" : ""
              }`}
              data-cursor="pointer"
            >
              {"// Services"}
            </Link>
            <Link
              href={isHome ? "#work" : "/#work"}
              onClick={(e) => handleNavClick(e, "work")}
              className={`hover:text-agency-redGlow transition-colors uppercase ${
                activeSection === "work" ? "text-agency-redGlow" : ""
              }`}
              data-cursor="pointer"
            >
              {"// Work"}
            </Link>
            <Link
              href={isHome ? "#contact" : "/#contact"}
              onClick={(e) => handleNavClick(e, "contact")}
              className={`hover:text-agency-redGlow transition-colors uppercase ${
                activeSection === "contact" ? "text-agency-redGlow" : ""
              }`}
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

      {/* Floating Bottom Navigation Tab Bar for Mobile */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 md:hidden transition-all duration-300">
        <div className="glassmorphism bg-agency-black/75 backdrop-blur-lg border border-white/10 rounded-full py-3 px-5 shadow-2xl shadow-black/60 flex justify-around items-center">
          {/* Tab 1: About */}
          <Link
            href={isHome ? "#about" : "/#about"}
            onClick={(e) => handleNavClick(e, "about")}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 active:scale-90 ${
              activeSection === "about" ? "text-agency-redGlow" : "text-agency-textGrey/60"
            }`}
            data-cursor="pointer"
          >
            <Compass size={18} className="stroke-[1.5]" />
            <span className="text-[8px] font-mono tracking-widest uppercase">Agency</span>
          </Link>

          {/* Tab 2: Services */}
          <Link
            href={isHome ? "#services" : "/#services"}
            onClick={(e) => handleNavClick(e, "services")}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 active:scale-90 ${
              activeSection === "services" ? "text-agency-redGlow" : "text-agency-textGrey/60"
            }`}
            data-cursor="pointer"
          >
            <Layers size={18} className="stroke-[1.5]" />
            <span className="text-[8px] font-mono tracking-widest uppercase">Services</span>
          </Link>

          {/* Tab 3: Work */}
          <Link
            href={isHome ? "#work" : "/#work"}
            onClick={(e) => handleNavClick(e, "work")}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 active:scale-90 ${
              activeSection === "work" ? "text-agency-redGlow" : "text-agency-textGrey/60"
            }`}
            data-cursor="pointer"
          >
            <Film size={18} className="stroke-[1.5]" />
            <span className="text-[8px] font-mono tracking-widest uppercase">Work</span>
          </Link>

          {/* Tab 4: Connect */}
          <Link
            href={isHome ? "#contact" : "/#contact"}
            onClick={(e) => handleNavClick(e, "contact")}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 active:scale-90 ${
              activeSection === "contact" ? "text-agency-redGlow" : "text-agency-textGrey/60"
            }`}
            data-cursor="pointer"
          >
            <Phone size={18} className="stroke-[1.5]" />
            <span className="text-[8px] font-mono tracking-widest uppercase">Connect</span>
          </Link>
        </div>
      </div>
    </>
  );
}
