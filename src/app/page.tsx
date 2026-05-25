"use client";

import Link from "next/link";
import {
  Search,
  FileText,
  AlertTriangle,
  ShieldAlert,
  Building2,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Star,
  Quote,
  Shield,
  Activity,
  Heart,
  Sun,
  Sparkles,
  CircleDot,
  Wind,
  Thermometer,
  Baby,
  Zap,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import MedicineCard from "@/components/MedicineCard";
import Newsletter from "@/components/Newsletter";
import AnimatedSection from "@/components/AnimatedSection";
import { medicines, companies, categories, blogPosts } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Zap,
  Activity,
  Heart,
  Sun,
  Sparkles,
  CircleDot,
  Wind,
  Thermometer,
  Baby,
};

const features = [
  { icon: Search, title: "Medicine Search", desc: "Find any medicine instantly with our powerful search engine" },
  { icon: FileText, title: "Dosage Guidelines", desc: "Detailed dosage instructions for all age groups" },
  { icon: AlertTriangle, title: "Side Effects", desc: "Comprehensive side effect information and warnings" },
  { icon: ShieldAlert, title: "Drug Warnings", desc: "Important precautions and drug interaction alerts" },
  { icon: Building2, title: "Company Info", desc: "Detailed profiles of all pharmaceutical companies" },
  { icon: BookOpen, title: "Medical Articles", desc: "Expert-written articles on health and medicine safety" },
];

const testimonials = [
  {
    name: "Dr. Aminul Haque",
    role: "General Physician",
    text: "Medi-Solution has become my go-to resource for quickly checking medicine information. The detailed dosage and interaction data is incredibly helpful.",
    rating: 5,
  },
  {
    name: "Fatima Begum",
    role: "Pharmacy Owner",
    text: "This platform has revolutionized how I assist customers. The comprehensive medicine database with prices makes my work so much easier.",
    rating: 5,
  },
  {
    name: "Rafiq Ahmed",
    role: "Medical Student",
    text: "As a medical student, having access to detailed medicine information in one place is invaluable. The side effects and precaution sections are very educational.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Features */}
      <section className="py-16 sm:py-20 bg-card dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-3">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Know About Medicine
              </span>
            </h2>
            <p className="text-text-light dark:text-dark-text-secondary max-w-2xl mx-auto">
              Comprehensive medicine information at your fingertips
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 0.05}>
                <div className="premium-card p-6 rounded-2xl bg-background dark:bg-dark-bg border border-border dark:border-dark-border group">
                  <div className="w-12 h-12 rounded-xl medical-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-light dark:text-dark-text-secondary leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-2">
                Popular Categories
              </h2>
              <p className="text-text-light dark:text-dark-text-secondary">
                Browse medicines by category
              </p>
            </div>
            <Link
              href="/medicines"
              className="hidden sm:flex items-center gap-1 text-primary dark:text-primary-light font-medium hover:gap-2 transition-all"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => {
              const IconComponent = iconMap[cat.icon] || Shield;
              return (
                <AnimatedSection key={cat.id} delay={i * 0.03}>
                  <Link href={`/medicines?category=${encodeURIComponent(cat.name)}`}>
                    <div className="premium-card p-4 rounded-2xl bg-card dark:bg-dark-card border border-border dark:border-dark-border text-center group">
                      <div className="w-12 h-12 rounded-xl medical-gradient-subtle flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 text-primary dark:text-primary-light" />
                      </div>
                      <h3 className="text-sm font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-0.5">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-text-light dark:text-dark-text-secondary">
                        {cat.count} medicines
                      </p>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Medicines */}
      <section className="py-16 sm:py-20 bg-card dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-2">
                Popular Medicines
              </h2>
              <p className="text-text-light dark:text-dark-text-secondary">
                Most searched medicines in Bangladesh
              </p>
            </div>
            <Link
              href="/medicines"
              className="hidden sm:flex items-center gap-1 text-primary dark:text-primary-light font-medium hover:gap-2 transition-all"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {medicines.slice(0, 8).map((med, i) => (
              <MedicineCard key={med.id} medicine={med} index={i} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/medicines"
              className="inline-flex items-center gap-2 px-6 py-3 medical-gradient text-white font-medium rounded-xl"
            >
              View All Medicines <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Medical Articles */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-2">
                Medical Articles
              </h2>
              <p className="text-text-light dark:text-dark-text-secondary">
                Expert health tips and medicine safety guides
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-1 text-primary dark:text-primary-light font-medium hover:gap-2 transition-all"
            >
              All Articles <ChevronRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="premium-card bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border overflow-hidden group h-full">
                    <div className="h-48 medical-gradient-subtle flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-primary/30 dark:text-primary-light/30" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:text-primary-light text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-xs text-text-light dark:text-dark-text-secondary">
                          {post.read_time}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] group-hover:text-primary dark:group-hover:text-primary-light transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-text-light dark:text-dark-text-secondary line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-text-light dark:text-dark-text-secondary">
                        <span>{post.author}</span>
                        <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="py-16 sm:py-20 bg-card dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-3">
              Trusted Pharmaceutical Companies
            </h2>
            <p className="text-text-light dark:text-dark-text-secondary max-w-2xl mx-auto">
              Medicines from Bangladesh&apos;s leading and most trusted pharmaceutical manufacturers
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {companies.map((company, i) => (
              <AnimatedSection key={company.id} delay={i * 0.05}>
                <Link href={`/companies/${company.id}`}>
                  <div className="premium-card p-5 rounded-2xl bg-background dark:bg-dark-bg border border-border dark:border-dark-border text-center group">
                    <div className="w-16 h-16 rounded-2xl medical-gradient-subtle flex items-center justify-center mx-auto mb-3">
                      <Building2 className="w-8 h-8 text-primary dark:text-primary-light" />
                    </div>
                    <h3 className="text-sm font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] group-hover:text-primary dark:group-hover:text-primary-light transition-colors mb-1">
                      {company.name}
                    </h3>
                    <p className="text-xs text-text-light dark:text-dark-text-secondary">
                      {company.total_medicines} medicines
                    </p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-3">
              What Healthcare Professionals Say
            </h2>
            <p className="text-text-light dark:text-dark-text-secondary">
              Trusted by doctors, pharmacists, and medical students
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="premium-card p-6 rounded-2xl bg-card dark:bg-dark-card border border-border dark:border-dark-border h-full">
                  <Quote className="w-8 h-8 text-primary/20 dark:text-primary-light/20 mb-4" />
                  <p className="text-text-light dark:text-dark-text-secondary text-sm leading-relaxed mb-5">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full medical-gradient flex items-center justify-center text-white font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-dark dark:text-dark-text">{t.name}</div>
                      <div className="text-xs text-text-light dark:text-dark-text-secondary">{t.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-3">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
