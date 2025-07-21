// components/landing/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";

const NavLink = ({ href, children }: { href: string; children: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={href}
        className={`px-3 py-2 text-lg font-medium transition-colors ${
          isActive
            ? "text-blue-600 dark:text-blue-400"
            : "text-slate-800 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
        }`}
      >
        {children}
      </Link>

      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  );
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const pathname = usePathname();

  

   // Hide navbar on dashboard routes
  if (pathname.includes("dashboard" )) return null;
  else if (pathname.includes("login")) return null;
  else if (pathname.includes("sign-up")) return null;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/news", label: "News" },
    { href: "/pricing", label: "Pricing" },
    { href: "/security", label: "Security" },
    { href: "/contact", label: "Contact-us" },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        ref={navRef}
        aria-label="Main navigation"
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          hasScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm dark:bg-slate-900/90"
            : "bg-transparent"
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center" onClick={closeMenu}>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold tracking-tighter text-transparent dark:from-blue-400 dark:to-purple-400">
                  HTA
                </span>
              </Link>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden items-center space-x-2 md:flex">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}

              <div className="ml-4 flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 font-medium text-slate-800 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  Login
                </Link>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px 5px rgba(59, 130, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-semibold text-white shadow-lg"
                >
                  <Link href="/sign-up">Get Started</Link>
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="rounded-md p-2 text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-40 h-screen w-full bg-white dark:bg-slate-900 overflow-x-hidden md:hidden"
            aria-modal="true"
            role="dialog"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex h-20 items-center justify-between px-4">
                <Link href="/" className="flex items-center" onClick={closeMenu}>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold tracking-tighter text-transparent dark:from-blue-400 dark:to-purple-400">
                    HTA
                  </span>
                </Link>

                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Close menu"
                  className="rounded-md p-2 text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-300 dark:hover:bg-slate-800"
                  onClick={closeMenu}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Nav */}
              <motion.div
                className="flex-1 space-y-1 overflow-y-auto px-4 py-8"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.07,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    variants={menuItemVariants}
                    custom={index}
                  >
                    <Link
                      href={link.href}
                      className="block rounded-lg px-4 py-4 text-2xl font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Section */}
              <motion.div
                className="border-t p-6 dark:border-slate-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="mb-4 flex flex-col space-y-3">
                  <Link
                    href="/login"
                    className="w-full rounded-lg px-4 py-3 text-center font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-xl font-bold text-white shadow-lg"
                  >
                    <Link href="/sign-up" onClick={closeMenu}>
                      Get Started
                    </Link>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
