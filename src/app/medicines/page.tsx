"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import MedicineCard from "@/components/MedicineCard";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/components/LanguageProvider";
import { medicines, categories } from "@/lib/data";

const medicineTypes = ["All", "Tablet", "Capsule", "Syrup", "Injection", "Cream", "Drops", "Inhaler"];

export default function MedicinesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <MedicinesContent />
    </Suspense>
  );
}

function MedicinesContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";
  const { t } = useLanguage();

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedType, setSelectedType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return medicines.filter((m) => {
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        m.medicine_name.toLowerCase().includes(q) ||
        m.generic_name.toLowerCase().includes(q) ||
        m.company_name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q);

      const matchesCategory = !selectedCategory || m.category === selectedCategory;
      const matchesType = selectedType === "All" || m.type === selectedType;

      return matchesQuery && matchesCategory && matchesType;
    });
  }, [query, selectedCategory, selectedType]);

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("");
    setSelectedType("All");
  };

  const hasFilters = query || selectedCategory || selectedType !== "All";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 medical-gradient opacity-[0.03] dark:opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-3">
              {t("medicines_title")}
            </h1>
            <p className="text-text-light dark:text-dark-text-secondary max-w-2xl mx-auto">
              {t("medicines_subtitle")}
            </p>
          </AnimatedSection>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative flex items-center bg-card dark:bg-dark-card rounded-2xl shadow-lg border border-border dark:border-dark-border overflow-hidden">
              <Search className="w-5 h-5 text-text-light ml-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("medicines_search_placeholder")}
                className="flex-1 px-4 py-4 bg-transparent text-text-dark dark:text-dark-text placeholder:text-text-light/60 dark:placeholder:text-dark-text-secondary/60 outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="mr-2 p-1.5 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg">
                  <X className="w-4 h-4 text-text-light" />
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="mr-2 p-2.5 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
              >
                <SlidersHorizontal className="w-5 h-5 text-text-light" />
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-card dark:bg-dark-card rounded-xl border border-border dark:border-dark-border p-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-dark dark:text-dark-text mb-2 block">{t("medicines_category")}</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory("")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        !selectedCategory
                          ? "bg-primary text-white"
                          : "bg-gray-100 dark:bg-dark-border text-text-light dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-border/80"
                      }`}
                    >
                      {t("medicines_all")}
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name === selectedCategory ? "" : cat.name)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedCategory === cat.name
                            ? "bg-primary text-white"
                            : "bg-gray-100 dark:bg-dark-border text-text-light dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-border/80"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-dark dark:text-dark-text mb-2 block">{t("medicines_type")}</label>
                  <div className="flex flex-wrap gap-2">
                    {medicineTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedType === type
                            ? "bg-secondary text-white"
                            : "bg-gray-100 dark:bg-dark-border text-text-light dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-border/80"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-text-light dark:text-dark-text-secondary">
              <span className="font-semibold text-text-dark dark:text-dark-text">{filtered.length}</span> {t("medicines_results")}
              {hasFilters && (
                <button onClick={clearFilters} className="ml-3 text-primary dark:text-primary-light hover:underline">
                  {t("medicines_clear")}
                </button>
              )}
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((med, i) => (
                <MedicineCard key={med.id} medicine={med} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Filter className="w-16 h-16 text-text-light/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-2">
                {t("medicines_no_results")}
              </h3>
              <p className="text-text-light dark:text-dark-text-secondary mb-4">
                {t("medicines_no_results_desc")}
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 medical-gradient text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
              >
                {t("medicines_clear_filters")}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
