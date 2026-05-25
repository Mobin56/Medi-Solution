"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import {
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Pill,
  Building2,
  BookOpen,
  LayoutDashboard,
  Scale,
  Shield,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Pill },
  { href: "/medicines", label: "Medicines", icon: Search },
  { href: "/companies", label: "Companies", icon: Building2 },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/compare", label: "Compare", icon: Scale },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 medical-gradient rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold font-[family-name:var(--font-heading)] text-primary dark:text-primary-light">
                Medi-Solution
              </span>
              <span className="hidden sm:block text-[10px] text-text-light dark:text-dark-text-secondary leading-none -mt-0.5">
                Your Trusted Digital Medicine Guide
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-light dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary-light rounded-lg hover:bg-primary/5 transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-text-light" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white medical-gradient rounded-lg hover:opacity-90 transition-opacity"
            >
              <Shield className="w-4 h-4" />
              Admin
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-text-dark dark:text-dark-text" />
              ) : (
                <Menu className="w-5 h-5 text-text-dark dark:text-dark-text" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border dark:border-dark-border"
          >
            <div className="px-4 py-3 space-y-1 bg-card dark:bg-dark-card">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-text-light dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary-light rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-white medical-gradient rounded-lg"
              >
                <Shield className="w-4 h-4" />
                Admin Panel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
