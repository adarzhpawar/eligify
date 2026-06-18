"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationMenu } from "@/config/navigation";
import StaggeredMenu from "@/components/navigation/StaggeredMenu";
import GradualBlur from "@/components/GradualBlur";
import { signOutAction } from "@/actions/auth";

export default function AppNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/onboarding") {
    return null;
  }

  return (
    <>
      {/* Gradual Blur for scrolled content behind the navbar */}
      <GradualBlur
        target="page"
        position="top"
        height="120px"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={isScrolled ? 1 : 0}
        animated
        zIndex={10} // Will become 110 (10 + 100 in component), staying below the z-[200] navbar
      />

      <div className="w-full flex justify-center sticky top-4 z-[200]">
        <nav
        id="app-navbar"
        className="w-[95%] lg:w-[85%] h-[80px] flex items-center relative transition-all duration-300"
      >
        <div className="w-full px-5 lg:px-8 flex items-center justify-between relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/eligify-text-icon.png"
              alt="Eligify AI"
              width={300}
              height={90}
              className="w-[140px] md:w-[180px] h-auto object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative flex items-center">
              <StaggeredMenu
                position="right"
                items={navigationMenu}
                displaySocials={false}
                displayItemNumbering={false}
                menuButtonColor="var(--color-eg-text-primary)"
                openMenuButtonColor="var(--color-eg-text-primary)"
                changeMenuColorOnOpen={false}
                colors={["#FEFECC", "#FFFFFF"]}
                accentColor="var(--color-eg-text-primary)"
                isFixed={false}
              >
                <form action={signOutAction} className="block md:hidden mt-auto">
                  <button
                    id="logout-button-mobile"
                    type="submit"
                    className="px-8 py-4 rounded-full text-lg font-medium text-white bg-black hover:bg-neutral-800 transition-colors duration-300 w-full"
                  >
                    Logout
                  </button>
                </form>
              </StaggeredMenu>
            </div>
            <form action={signOutAction} className="hidden md:block">
              <button
                id="logout-button"
                type="submit"
                className="px-5 py-2.5 rounded-full text-sm font-medium text-white bg-black hover:bg-neutral-800 transition-colors duration-300"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
    </>
  );
}
