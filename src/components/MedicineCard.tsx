"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Pill, Building2, Tag, ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import type { Medicine } from "@/lib/types";

interface MedicineCardProps {
  medicine: Medicine;
  index?: number;
}

export default function MedicineCard({ medicine, index = 0 }: MedicineCardProps) {
  const { t } = useLanguage();
  const typeColors: Record<string, string> = {
    Tablet: "bg-primary/10 text-primary",
    Capsule: "bg-secondary/10 text-secondary",
    Syrup: "bg-success/10 text-success",
    Injection: "bg-danger/10 text-danger",
    Cream: "bg-warning/10 text-warning",
    Drops: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    Inhaler: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/medicines/${medicine.id}`}>
        <div className="premium-card bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-5 h-full group">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 rounded-xl medical-gradient-subtle flex items-center justify-center">
              <Pill className="w-6 h-6 text-primary dark:text-primary-light" />
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[medicine.type] || "bg-gray-100 text-gray-600"}`}>
              {medicine.type}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-lg font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] group-hover:text-primary dark:group-hover:text-primary-light transition-colors mb-1">
            {medicine.medicine_name}
          </h3>
          <p className="text-sm text-text-light dark:text-dark-text-secondary mb-3">
            {medicine.generic_name}
          </p>

          {/* Company */}
          <div className="flex items-center gap-1.5 text-xs text-text-light dark:text-dark-text-secondary mb-3">
            <Building2 className="w-3.5 h-3.5" />
            {medicine.company_name}
          </div>

          {/* Category */}
          <div className="flex items-center gap-1.5 text-xs text-text-light dark:text-dark-text-secondary mb-4">
            <Tag className="w-3.5 h-3.5" />
            {medicine.category}
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-border dark:border-dark-border">
            <div>
              <span className="text-lg font-bold text-primary dark:text-primary-light">
                ৳{medicine.price.unit_price.toFixed(2)}
              </span>
              <span className="text-xs text-text-light dark:text-dark-text-secondary ml-1">{t("common_per_unit")}</span>
            </div>
            <span className="flex items-center gap-1 text-sm text-primary dark:text-primary-light font-medium group-hover:gap-2 transition-all">
              {t("common_view_details")} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
