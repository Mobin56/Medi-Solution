"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, TrendingUp, Pill, Stethoscope, HeartPulse, ShieldCheck } from "lucide-react";
import { trendingSearches } from "@/lib/data";
import { useLanguage } from "./LanguageProvider";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/medicines?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 medical-gradient opacity-[0.03] dark:opacity-[0.08]" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      {/* Floating icons */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-[15%] hidden lg:block"
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
          <Pill className="w-7 h-7 text-primary" />
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-60 left-[10%] hidden lg:block"
      >
        <div className="w-12 h-12 rounded-2xl bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center">
          <Stethoscope className="w-6 h-6 text-secondary" />
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [-8, 12, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-[20%] hidden lg:block"
      >
        <div className="w-11 h-11 rounded-2xl bg-success/10 dark:bg-success/20 flex items-center justify-center">
          <HeartPulse className="w-5 h-5 text-success" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-sm font-medium mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            {t("hero_title")}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] text-text-dark dark:text-dark-text leading-tight mb-6"
          >
            {t("hero_title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-text-light dark:text-dark-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {t("hero_subtitle")}
          </motion.p>

          {/* Search */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 medical-gradient rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-sm -m-0.5" />
              <div className="relative flex items-center bg-card dark:bg-dark-card rounded-2xl shadow-lg border border-border dark:border-dark-border overflow-hidden">
                <Search className="w-5 h-5 text-text-light ml-5" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("hero_search_placeholder")}
                  className="flex-1 px-4 py-4 bg-transparent text-text-dark dark:text-dark-text placeholder:text-text-light/60 dark:placeholder:text-dark-text-secondary/60 outline-none text-base"
                />
                <button
                  type="submit"
                  className="mr-2 px-6 py-2.5 medical-gradient text-white font-medium rounded-xl hover:opacity-90 transition-opacity text-sm"
                >
                  Search
                </button>
              </div>
            </div>
          </motion.form>

          {/* Trending */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            <span className="flex items-center gap-1 text-sm text-text-light dark:text-dark-text-secondary">
              <TrendingUp className="w-4 h-4" />
              {t("hero_trending")}
            </span>
            {trendingSearches.slice(0, 5).map((term) => (
              <button
                key={term}
                onClick={() => router.push(`/medicines?q=${encodeURIComponent(term)}`)}
                className="px-3 py-1 text-sm rounded-full bg-card dark:bg-dark-card border border-border dark:border-dark-border text-text-light dark:text-dark-text-secondary hover:border-primary hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                {term}
              </button>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
          >
            {[
              { label: t("hero_stat_medicines"), value: "5000+" },
              { label: t("hero_stat_companies"), value: "200+" },
              { label: t("hero_stat_categories"), value: "50+" },
              { label: t("hero_stat_users"), value: "10K+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-card dark:bg-dark-card border border-border dark:border-dark-border"
              >
                <div className="text-2xl font-bold text-primary dark:text-primary-light font-[family-name:var(--font-heading)]">
                  {stat.value}
                </div>
                <div className="text-sm text-text-light dark:text-dark-text-secondary">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
