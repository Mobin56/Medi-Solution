"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, MapPin, Calendar, Pill } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import MedicineCard from "@/components/MedicineCard";
import { useLanguage } from "@/components/LanguageProvider";
import { getCompanyById, getMedicinesByCompany } from "@/lib/data";

export default function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const company = getCompanyById(id);
  const { t } = useLanguage();

  if (!company) {
    notFound();
  }

  const companyMedicines = getMedicinesByCompany(id);

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 text-sm text-text-light dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary-light transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("company_back")}
        </Link>

        {/* Company Profile */}
        <AnimatedSection>
          <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-20 h-20 rounded-2xl medical-gradient flex items-center justify-center shrink-0">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-2">
                  {company.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-light dark:text-dark-text-secondary mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {t("company_founded")}: {company.founded}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {company.headquarters}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Pill className="w-4 h-4" />
                    {company.total_medicines} {t("company_medicines")}
                  </span>
                </div>
                <p className="text-text-light dark:text-dark-text-secondary leading-relaxed mb-4">
                  {company.about}
                </p>
                <div className="flex flex-wrap gap-2">
                  {company.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Popular Products */}
        {company.popular_products.length > 0 && (
          <AnimatedSection delay={0.1}>
            <h2 className="text-xl font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-4">
              {t("company_popular")}
            </h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {company.popular_products.map((product) => (
                <span
                  key={product}
                  className="px-4 py-2 rounded-xl bg-card dark:bg-dark-card border border-border dark:border-dark-border text-sm text-text-dark dark:text-dark-text font-medium"
                >
                  {product}
                </span>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Company Medicines */}
        <AnimatedSection delay={0.15}>
          <h2 className="text-xl font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-4">
            {t("company_medicines_by")} {company.name} ({companyMedicines.length})
          </h2>
          {companyMedicines.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {companyMedicines.map((med, i) => (
                <MedicineCard key={med.id} medicine={med} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border">
              <Pill className="w-12 h-12 text-text-light/30 mx-auto mb-3" />
              <p className="text-text-light dark:text-dark-text-secondary">
                {t("company_no_medicines")}
              </p>
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}
