"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Pill,
  Building2,
  Tag,
  Clock,
  FileText,
  AlertTriangle,
  ShieldAlert,
  Ban,
  Warehouse,
  Repeat,
  Baby,
  Heart,
  Stethoscope,
  AlertCircle,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import MedicineCard from "@/components/MedicineCard";
import { getMedicineById, getAlternativeMedicines } from "@/lib/data";

export default function MedicineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const medicine = getMedicineById(id);

  if (!medicine) {
    notFound();
  }

  const alternatives = getAlternativeMedicines(medicine);

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
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/medicines"
          className="inline-flex items-center gap-2 text-sm text-text-light dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary-light transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Medicines
        </Link>

        {/* Header Card */}
        <AnimatedSection>
          <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 sm:p-8 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="w-20 h-20 rounded-2xl medical-gradient flex items-center justify-center shrink-0">
                <Pill className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)]">
                    {medicine.medicine_name}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[medicine.type]}`}>
                    {medicine.type}
                  </span>
                </div>
                <p className="text-lg text-primary dark:text-primary-light font-medium mb-1">
                  {medicine.generic_name}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-light dark:text-dark-text-secondary">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    {medicine.company_name}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    {medicine.category}
                  </span>
                </div>
              </div>
              <div className="sm:text-right">
                <div className="text-3xl font-bold text-primary dark:text-primary-light font-[family-name:var(--font-heading)]">
                  ৳{medicine.price.unit_price.toFixed(2)}
                </div>
                <div className="text-sm text-text-light dark:text-dark-text-secondary">per unit</div>
                <div className="text-sm text-text-light dark:text-dark-text-secondary mt-1">
                  Strip: ৳{medicine.price.strip_price.toFixed(2)}
                </div>
                <div className="text-xs text-text-light/60 dark:text-dark-text-secondary/60 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Updated: {medicine.price.updated_date}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Description */}
        <AnimatedSection delay={0.1}>
          <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-3">
              <FileText className="w-5 h-5 text-primary" />
              About This Medicine
            </h2>
            <p className="text-text-light dark:text-dark-text-secondary leading-relaxed mb-4">
              {medicine.description}
            </p>
            <h3 className="font-semibold text-text-dark dark:text-dark-text mb-2">Medical Usage</h3>
            <p className="text-text-light dark:text-dark-text-secondary leading-relaxed">
              {medicine.usage}
            </p>
          </div>
        </AnimatedSection>

        {/* Dosage */}
        <AnimatedSection delay={0.15}>
          <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-4">
              <Stethoscope className="w-5 h-5 text-primary" />
              Dosage Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Adult Dose", value: medicine.dosage.adult, icon: Heart },
                { label: "Child Dose", value: medicine.dosage.child, icon: Baby },
                { label: "Elderly Dose", value: medicine.dosage.elderly, icon: Stethoscope },
                { label: "Special Instructions", value: medicine.dosage.special_instructions, icon: AlertCircle },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-background dark:bg-dark-bg border border-border dark:border-dark-border">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="w-4 h-4 text-primary dark:text-primary-light" />
                    <span className="text-sm font-semibold text-text-dark dark:text-dark-text">{item.label}</span>
                  </div>
                  <p className="text-sm text-text-light dark:text-dark-text-secondary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Side Effects */}
        <AnimatedSection delay={0.2}>
          <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-4">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Side Effects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-text-dark dark:text-dark-text mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-warning" />
                  Common Side Effects
                </h3>
                <ul className="space-y-1.5">
                  {medicine.side_effects.common.map((effect) => (
                    <li key={effect} className="text-sm text-text-light dark:text-dark-text-secondary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning/50" />
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-dark dark:text-dark-text mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-danger" />
                  Serious Side Effects
                </h3>
                <ul className="space-y-1.5">
                  {medicine.side_effects.serious.map((effect) => (
                    <li key={effect} className="text-sm text-text-light dark:text-dark-text-secondary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-danger/50" />
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Precautions */}
        <AnimatedSection delay={0.25}>
          <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-4">
              <ShieldAlert className="w-5 h-5 text-danger" />
              Precautions & Warnings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Pregnancy Warning", value: medicine.precautions.pregnancy, color: "badge-danger" },
                { label: "Kidney Warning", value: medicine.precautions.kidney, color: "badge-warning" },
                { label: "Liver Warning", value: medicine.precautions.liver, color: "badge-warning" },
                { label: "Allergy Warning", value: medicine.precautions.allergy, color: "badge-danger" },
                { label: "Drug Interactions", value: medicine.precautions.drug_interaction, color: "badge-warning" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-background dark:bg-dark-bg border border-border dark:border-dark-border">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${item.color}`}>
                    {item.label}
                  </span>
                  <p className="text-sm text-text-light dark:text-dark-text-secondary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Who Should Avoid */}
        <AnimatedSection delay={0.3}>
          <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-4">
              <Ban className="w-5 h-5 text-danger" />
              Who Should Avoid This Medicine
            </h2>
            <ul className="space-y-2">
              {medicine.who_should_avoid.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-text-light dark:text-dark-text-secondary">
                  <span className="w-2 h-2 rounded-full bg-danger" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        {/* Storage */}
        <AnimatedSection delay={0.35}>
          <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-4">
              <Warehouse className="w-5 h-5 text-secondary" />
              Storage Instructions
            </h2>
            <div className="flex flex-wrap gap-3">
              {medicine.storage.map((instruction) => (
                <span
                  key={instruction}
                  className="px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary dark:text-secondary text-sm"
                >
                  {instruction}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <AnimatedSection delay={0.4}>
            <div className="mb-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-4">
                <Repeat className="w-5 h-5 text-primary" />
                Alternative Medicines
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {alternatives.map((alt, i) => (
                  <MedicineCard key={alt.id} medicine={alt} index={i} />
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Disclaimer */}
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-4 text-center">
          <p className="text-xs text-text-light dark:text-dark-text-secondary">
            <span className="text-warning font-semibold">Medical Disclaimer:</span>{" "}
            Medi-Solution provides medicine information for educational purposes only.
            Always consult a registered doctor or healthcare professional before taking any medicine.
          </p>
        </div>
      </div>
    </div>
  );
}
