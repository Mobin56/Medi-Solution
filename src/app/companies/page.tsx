"use client";

import Link from "next/link";
import { Building2, MapPin, Calendar, ChevronRight, Pill } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { companies } from "@/lib/data";

export default function CompaniesPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 medical-gradient opacity-[0.03] dark:opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-3">
              Pharmaceutical Companies
            </h1>
            <p className="text-text-light dark:text-dark-text-secondary max-w-2xl mx-auto">
              Browse medicines from Bangladesh&apos;s leading and most trusted pharmaceutical manufacturers
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.map((company, i) => (
              <AnimatedSection key={company.id} delay={i * 0.05}>
                <Link href={`/companies/${company.id}`}>
                  <div className="premium-card bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 h-full group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl medical-gradient-subtle flex items-center justify-center shrink-0">
                        <Building2 className="w-8 h-8 text-primary dark:text-primary-light" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] group-hover:text-primary dark:group-hover:text-primary-light transition-colors mb-1">
                          {company.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-text-light dark:text-dark-text-secondary">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            Est. {company.founded}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {company.headquarters}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-text-light dark:text-dark-text-secondary line-clamp-2 mb-4">
                      {company.about}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {company.categories.slice(0, 4).map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:text-primary-light text-xs"
                        >
                          {cat}
                        </span>
                      ))}
                      {company.categories.length > 4 && (
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-dark-border text-text-light dark:text-dark-text-secondary text-xs">
                          +{company.categories.length - 4}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border dark:border-dark-border">
                      <span className="flex items-center gap-1.5 text-sm text-text-light dark:text-dark-text-secondary">
                        <Pill className="w-4 h-4" />
                        {company.total_medicines} medicines
                      </span>
                      <span className="flex items-center gap-1 text-sm text-primary dark:text-primary-light font-medium group-hover:gap-2 transition-all">
                        View Profile <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
