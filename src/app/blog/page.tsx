"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, User, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/components/LanguageProvider";
import { blogPosts } from "@/lib/data";

const blogCategories = ["All", "Drug Awareness", "Health Tips", "Medicine Safety", "Healthcare Education"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { t } = useLanguage();

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 medical-gradient opacity-[0.03] dark:opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-3">
              {t("blog_title")}
            </h1>
            <p className="text-text-light dark:text-dark-text-secondary max-w-2xl mx-auto">
              {t("blog_subtitle")}
            </p>
          </AnimatedSection>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-card dark:bg-dark-card border border-border dark:border-dark-border text-text-light dark:text-dark-text-secondary hover:border-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="premium-card bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border overflow-hidden group h-full flex flex-col">
                    <div className="h-48 medical-gradient-subtle flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-primary/30 dark:text-primary-light/30" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:text-primary-light text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-text-light dark:text-dark-text-secondary">
                          <Clock className="w-3 h-3" />
                          {post.read_time}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] group-hover:text-primary dark:group-hover:text-primary-light transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-text-light dark:text-dark-text-secondary line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-text-light dark:text-dark-text-secondary pt-3 border-t border-border dark:border-dark-border">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1 text-primary dark:text-primary-light font-medium">
                          {t("blog_read_more")} <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
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
