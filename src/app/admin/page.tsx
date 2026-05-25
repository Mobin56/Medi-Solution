"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Pill,
  Building2,
  Users,
  Eye,
  TrendingUp,
  Search,
  Plus,
  Edit3,
  Trash2,
  BarChart3,
  FileText,
  Settings,
  ChevronRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/components/LanguageProvider";
import { medicines, companies, blogPosts } from "@/lib/data";

type Tab = "overview" | "medicines" | "companies" | "blog";

const stats = [
  { label: "Total Medicines", value: "5,240", change: "+12%", icon: Pill, color: "bg-primary/10 text-primary" },
  { label: "Total Users", value: "12,850", change: "+8%", icon: Users, color: "bg-secondary/10 text-secondary" },
  { label: "Daily Visitors", value: "3,420", change: "+15%", icon: Eye, color: "bg-success/10 text-success" },
  { label: "Most Viewed", value: "Napa Extra", change: "1.2K views", icon: TrendingUp, color: "bg-warning/10 text-warning" },
];

const recentSearches = [
  { query: "Napa Extra", count: 342 },
  { query: "Omeprazole", count: 289 },
  { query: "Azithromycin", count: 256 },
  { query: "Paracetamol", count: 234 },
  { query: "Fexofenadine", count: 198 },
];

export default function AdminPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const sidebarItems = [
    { key: "overview" as const, label: t("admin_overview"), icon: LayoutDashboard },
    { key: "medicines" as const, label: t("admin_medicines"), icon: Pill },
    { key: "companies" as const, label: t("admin_companies"), icon: Building2 },
    { key: "blog" as const, label: t("admin_blog"), icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatedSection className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-1">
            {t("admin_title")}
          </h1>
          <p className="text-text-light dark:text-dark-text-secondary text-sm">
            {t("admin_subtitle")}
          </p>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-24 bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-2 flex lg:flex-col gap-1 overflow-x-auto">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors w-full text-left ${
                    activeTab === item.key
                      ? "bg-primary text-white"
                      : "text-text-light dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-border"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, i) => (
                    <AnimatedSection key={stat.label} delay={i * 0.05}>
                      <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs text-success font-medium">{stat.change}</span>
                        </div>
                        <div className="text-2xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)]">
                          {stat.value}
                        </div>
                        <div className="text-xs text-text-light dark:text-dark-text-secondary">{stat.label}</div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>

                {/* Search Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-5">
                    <h3 className="flex items-center gap-2 text-base font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-4">
                      <Search className="w-4 h-4 text-primary" />
                      {t("admin_top_searches")}
                    </h3>
                    <div className="space-y-3">
                      {recentSearches.map((search, i) => (
                        <div key={search.query} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                              {i + 1}
                            </span>
                            <span className="text-sm text-text-dark dark:text-dark-text">{search.query}</span>
                          </div>
                          <span className="text-xs text-text-light dark:text-dark-text-secondary">{search.count} {t("admin_searches")}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-5">
                    <h3 className="flex items-center gap-2 text-base font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-4">
                      <BarChart3 className="w-4 h-4 text-primary" />
                      {t("admin_quick_actions")}
                    </h3>
                    <div className="space-y-2">
                      {[
                        { label: t("admin_add_medicine"), icon: Plus, action: () => setActiveTab("medicines") },
                        { label: t("admin_manage_companies"), icon: Building2, action: () => setActiveTab("companies") },
                        { label: t("admin_write_blog"), icon: FileText, action: () => setActiveTab("blog") },
                        { label: t("admin_settings"), icon: Settings, action: () => {} },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={item.action}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-background dark:bg-dark-bg border border-border dark:border-dark-border hover:border-primary transition-colors text-left"
                        >
                          <span className="flex items-center gap-2 text-sm text-text-dark dark:text-dark-text">
                            <item.icon className="w-4 h-4 text-primary" />
                            {item.label}
                          </span>
                          <ChevronRight className="w-4 h-4 text-text-light" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Medicines Tab */}
            {activeTab === "medicines" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)]">
                    {t("admin_manage_medicines")} ({medicines.length})
                  </h2>
                  <button className="flex items-center gap-2 px-4 py-2.5 medical-gradient text-white font-medium rounded-xl text-sm">
                    <Plus className="w-4 h-4" />
                    {t("admin_add")}
                  </button>
                </div>
                <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-background dark:bg-dark-bg border-b border-border dark:border-dark-border">
                          <th className="text-left px-5 py-3 text-xs font-semibold text-text-light dark:text-dark-text-secondary uppercase">{t("admin_name")}</th>
                          <th className="text-left px-5 py-3 text-xs font-semibold text-text-light dark:text-dark-text-secondary uppercase">{t("admin_generic")}</th>
                          <th className="text-left px-5 py-3 text-xs font-semibold text-text-light dark:text-dark-text-secondary uppercase">{t("admin_company")}</th>
                          <th className="text-left px-5 py-3 text-xs font-semibold text-text-light dark:text-dark-text-secondary uppercase">{t("admin_price")}</th>
                          <th className="text-left px-5 py-3 text-xs font-semibold text-text-light dark:text-dark-text-secondary uppercase">{t("admin_actions")}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border dark:divide-dark-border">
                        {medicines.map((med) => (
                          <tr key={med.id} className="hover:bg-gray-50 dark:hover:bg-dark-border/50">
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <Pill className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-text-dark dark:text-dark-text">{med.medicine_name}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-sm text-text-light dark:text-dark-text-secondary">{med.generic_name}</td>
                            <td className="px-5 py-3 text-sm text-text-light dark:text-dark-text-secondary">{med.company_name}</td>
                            <td className="px-5 py-3 text-sm font-medium text-primary dark:text-primary-light">৳{med.price.unit_price.toFixed(2)}</td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-1">
                                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg" title="Edit">
                                  <Edit3 className="w-4 h-4 text-text-light" />
                                </button>
                                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg" title="Delete">
                                  <Trash2 className="w-4 h-4 text-danger" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Companies Tab */}
            {activeTab === "companies" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)]">
                    {t("admin_manage_companies")} ({companies.length})
                  </h2>
                  <button className="flex items-center gap-2 px-4 py-2.5 medical-gradient text-white font-medium rounded-xl text-sm">
                    <Plus className="w-4 h-4" />
                    {t("admin_add_company")}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {companies.map((company) => (
                    <div key={company.id} className="bg-card dark:bg-dark-card rounded-xl border border-border dark:border-dark-border p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl medical-gradient-subtle flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-primary dark:text-primary-light" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-text-dark dark:text-dark-text text-sm">{company.name}</div>
                        <div className="text-xs text-text-light dark:text-dark-text-secondary">{company.total_medicines} medicines</div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg" title="Edit">
                          <Edit3 className="w-4 h-4 text-text-light" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg" title="Delete">
                          <Trash2 className="w-4 h-4 text-danger" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blog Tab */}
            {activeTab === "blog" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)]">
                    {t("admin_manage_blog")} ({blogPosts.length})
                  </h2>
                  <button className="flex items-center gap-2 px-4 py-2.5 medical-gradient text-white font-medium rounded-xl text-sm">
                    <Plus className="w-4 h-4" />
                    {t("admin_new_post")}
                  </button>
                </div>
                <div className="space-y-3">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="bg-card dark:bg-dark-card rounded-xl border border-border dark:border-dark-border p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl medical-gradient-subtle flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-primary dark:text-primary-light" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-text-dark dark:text-dark-text text-sm truncate">{post.title}</div>
                        <div className="flex items-center gap-3 text-xs text-text-light dark:text-dark-text-secondary mt-0.5">
                          <span>{post.category}</span>
                          <span>{post.author}</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg" title="Edit">
                          <Edit3 className="w-4 h-4 text-text-light" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg" title="Delete">
                          <Trash2 className="w-4 h-4 text-danger" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
