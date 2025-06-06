// components/landing/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";

export const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {name: "News", path: "/news"},
  {name: "Contact", path: "/contact"},
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide navbar on dashboard routes
  if (pathname.includes("dashboard" )) return null;
  else if (pathname.includes("login")) return null;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Framer motion variants for mobile overlay
  const overlayVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  const linkVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1 + 0.2 },
    }),
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${isScrolled
            ? "backdrop-blur-md bg-white/70 shadow-sm h-14"
            : "bg-transparent h-20"
          }
        `}
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/">
            <p className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex-shrink-0"
              >
               <Image
                src="/logo.jpg"
                alt="HTECH 4 AFRICA Logo"
                width={45}
                height={45}
                className={` rounded-[30%] transition-transform duration-300
                  ${isScrolled ? "shadow-sm" : "shadow-lg"}
                  ${isScrolled ? "filter grayscale" : ""}
                  transition-all duration-300
                `}
              />
               
              </motion.div>
              <span
                className={`
                  text-xl sm:text-2xl font-bold transition-colors
                  ${isScrolled ? "text-slate-800" : "text-white"}
                `}
              >
                HTECH 4 AFRICA
              </span>
            </p>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => {
              const active = pathname === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <p className="relative group">
                    <span
                      className={`
                        text-base sm:text-lg font-medium transition-colors
                        ${active
                          ? "text-blue-600"
                          : isScrolled
                          ? "text-slate-700 hover:text-slate-900"
                          : "text-white hover:text-white/80"
                        }
                      `}
                    >
                      {item.name}
                    </span>
                    <span
                      className={`
                        absolute left-0 bottom-[-2px] h-[2px] bg-blue-600
                        transition-all duration-300 ease-in-out
                        ${active ? "w-full" : "group-hover:w-full w-0"}
                      `}
                    />
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <p
                className={`
                  px-4 py-2 text-base font-medium transition-colors
                  ${isScrolled
                    ? "text-slate-700 hover:text-slate-900"
                    : "text-white hover:text-white/80"
                  }
                `}
              >
                Login
              </p>
            </Link>
            <Link href="/login?role=patient">
              <motion.p
                whileHover={{ scale: 1.05 }}
                className={`
                  bg-gradient-to-r from-blue-500 to-cyan-500
                  hover:from-blue-600 hover:to-cyan-600
                  text-white text-base font-medium px-5 py-2 
                  rounded-full shadow-md
                  transition-transform duration-200 ease-in-out
                `}
              >
                Get Started
              </motion.p>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`
              md:hidden focus:outline-none transition-colors
              ${isScrolled ? "text-slate-700" : "text-white"}
            `}
            aria-label="Open menu"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-lg flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <Link href="/">
                <p
                  className="flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg
                    className="w-8 h-8 text-blue-600"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 2L28 8V24L16 30L4 24V8L16 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  <span className="text-xl font-bold text-slate-800">
                    HTECH 4 AFRICA
                  </span>
                </p>
              </Link>

              <button
                onClick={() => setMenuOpen(false)}
                className="focus:outline-none text-slate-800"
                aria-label="Close menu"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-10 px-6 flex flex-col space-y-6">
              {navItems.map((item, idx) => {
                const active = pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    custom={idx}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link href={item.path}>
                      <p
                        className={`
                          block text-2xl font-semibold transition-colors
                          ${active
                            ? "text-blue-600"
                            : "text-slate-800 hover:text-slate-600"
                          }
                        `}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.name}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-auto px-6 pb-10 flex flex-col space-y-4">
              <Link href="/login">
                <p
                  className="px-4 py-3 text-center text-base font-medium 
                             text-slate-800 hover:text-slate-600 transition-colors
                             border border-slate-300 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </p>
              </Link>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="w-full"
              >
                <Link href="/login?role=patient">
                  <p
                    className="block text-center bg-gradient-to-r from-blue-500 to-cyan-500 
                               hover:from-blue-600 hover:to-cyan-600 
                               text-white text-base font-medium px-4 py-3 
                               rounded-full shadow-md transition-transform duration-200 ease-in-out"
                    onClick={() => setMenuOpen(false)}
                  >
                    Get Started
                  </p>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
