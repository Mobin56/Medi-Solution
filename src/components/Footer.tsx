"use client";

import Link from "next/link";
import { Shield, Phone, Mail, MapPin, Globe, MessageCircle, Play, Briefcase } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const socialLinks = [
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: Play, href: "#", label: "YouTube" },
  { icon: Briefcase, href: "#", label: "LinkedIn" },
];

const categories = [
  "Antibiotics",
  "Pain Relief",
  "Diabetes",
  "Heart Care",
  "Vitamins",
  "Gastric",
];

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t("footer_search_medicines"), href: "/medicines" },
    { label: t("nav_companies"), href: "/companies" },
    { label: t("nav_blog"), href: "/blog" },
    { label: t("nav_compare"), href: "/compare" },
    { label: t("nav_dashboard"), href: "/dashboard" },
  ];

  return (
    <footer className="bg-text-dark dark:bg-dark-card text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 medical-gradient rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white font-[family-name:var(--font-heading)]">
                Medi-Solution
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              {t("footer_about")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-gray-700 hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-[family-name:var(--font-heading)]">
              {t("footer_quick_links")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-[family-name:var(--font-heading)]">
              {t("footer_categories")}
            </h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/medicines?category=${encodeURIComponent(cat)}`}
                    className="text-sm text-gray-400 hover:text-primary-light transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency & Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-[family-name:var(--font-heading)]">
              {t("footer_emergency")}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-danger" />
                <span>{t("footer_national_emergency")}: 999</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-primary-light" />
                <span>{t("footer_health_hotline")}: 16263</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-secondary" />
                <span>info@medisolution.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-success mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              <span className="text-warning font-semibold">{t("med_disclaimer")}:</span>{" "}
              {t("footer_disclaimer")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Medi-Solution. {t("footer_rights")}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
