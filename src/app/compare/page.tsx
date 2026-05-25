"use client";

import { useState } from "react";
import { Scale, Plus, X, Pill, AlertTriangle, DollarSign, Stethoscope, Building2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { medicines } from "@/lib/data";
import type { Medicine } from "@/lib/types";

export default function ComparePage() {
  const [selected, setSelected] = useState<Medicine[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const searchResults = searchQuery.trim()
    ? medicines.filter(
        (m) =>
          !selected.find((s) => s.id === m.id) &&
          (m.medicine_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.generic_name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const addMedicine = (med: Medicine) => {
    if (selected.length < 3) {
      setSelected([...selected, med]);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  const removeMedicine = (id: string) => {
    setSelected(selected.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 medical-gradient opacity-[0.03] dark:opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-3">
              Compare Medicines
            </h1>
            <p className="text-text-light dark:text-dark-text-secondary max-w-2xl mx-auto">
              Compare price, dosage, side effects, and effectiveness of different medicines side by side
            </p>
          </AnimatedSection>

          {/* Selection Area */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[0, 1, 2].map((slot) => {
              const med = selected[slot];
              return (
                <div key={slot}>
                  {med ? (
                    <div className="relative bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-5">
                      <button
                        onClick={() => removeMedicine(med.id)}
                        className="absolute top-3 right-3 p-1 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
                      >
                        <X className="w-4 h-4 text-text-light" />
                      </button>
                      <div className="w-12 h-12 rounded-xl medical-gradient flex items-center justify-center mb-3">
                        <Pill className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)]">
                        {med.medicine_name}
                      </h3>
                      <p className="text-sm text-text-light dark:text-dark-text-secondary">{med.generic_name}</p>
                      <p className="text-xs text-text-light dark:text-dark-text-secondary mt-1">{med.company_name}</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowSearch(true)}
                      className="w-full h-full min-h-[160px] border-2 border-dashed border-border dark:border-dark-border rounded-2xl flex flex-col items-center justify-center gap-2 text-text-light dark:text-dark-text-secondary hover:border-primary hover:text-primary dark:hover:text-primary-light transition-colors"
                    >
                      <Plus className="w-8 h-8" />
                      <span className="text-sm font-medium">Add Medicine</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Search Modal */}
          {showSearch && (
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50" onClick={() => setShowSearch(false)}>
              <div className="w-full max-w-lg bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-border dark:border-dark-border">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search medicine to add..."
                    className="w-full px-4 py-3 bg-background dark:bg-dark-bg rounded-xl text-text-dark dark:text-dark-text outline-none"
                    autoFocus
                  />
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.slice(0, 10).map((med) => (
                      <button
                        key={med.id}
                        onClick={() => addMedicine(med)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-border transition-colors flex items-center gap-3"
                      >
                        <Pill className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-text-dark dark:text-dark-text">{med.medicine_name}</div>
                          <div className="text-xs text-text-light dark:text-dark-text-secondary">{med.generic_name} — {med.company_name}</div>
                        </div>
                      </button>
                    ))
                  ) : searchQuery.trim() ? (
                    <div className="p-8 text-center text-text-light dark:text-dark-text-secondary text-sm">No medicines found</div>
                  ) : (
                    <div className="p-8 text-center text-text-light dark:text-dark-text-secondary text-sm">Type to search medicines</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Comparison Table */}
          {selected.length >= 2 && (
            <AnimatedSection>
              <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-background dark:bg-dark-bg">
                        <th className="text-left px-5 py-4 text-sm font-semibold text-text-dark dark:text-dark-text w-40">Property</th>
                        {selected.map((med) => (
                          <th key={med.id} className="text-left px-5 py-4 text-sm font-semibold text-text-dark dark:text-dark-text">
                            {med.medicine_name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border dark:divide-dark-border">
                      {[
                        { label: "Generic Name", icon: Pill, key: "generic_name" as const },
                        { label: "Company", icon: Building2, key: "company_name" as const },
                        { label: "Type", icon: Pill, key: "type" as const },
                        { label: "Category", icon: Scale, key: "category" as const },
                      ].map((row) => (
                        <tr key={row.label}>
                          <td className="px-5 py-3 text-sm font-medium text-text-dark dark:text-dark-text flex items-center gap-2">
                            <row.icon className="w-4 h-4 text-primary" />
                            {row.label}
                          </td>
                          {selected.map((med) => (
                            <td key={med.id} className="px-5 py-3 text-sm text-text-light dark:text-dark-text-secondary">
                              {med[row.key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <td className="px-5 py-3 text-sm font-medium text-text-dark dark:text-dark-text flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-primary" />
                          Unit Price
                        </td>
                        {selected.map((med) => (
                          <td key={med.id} className="px-5 py-3 text-sm font-semibold text-primary dark:text-primary-light">
                            ৳{med.price.unit_price.toFixed(2)}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="px-5 py-3 text-sm font-medium text-text-dark dark:text-dark-text flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-primary" />
                          Strip Price
                        </td>
                        {selected.map((med) => (
                          <td key={med.id} className="px-5 py-3 text-sm text-text-light dark:text-dark-text-secondary">
                            ৳{med.price.strip_price.toFixed(2)}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="px-5 py-3 text-sm font-medium text-text-dark dark:text-dark-text flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-primary" />
                          Adult Dosage
                        </td>
                        {selected.map((med) => (
                          <td key={med.id} className="px-5 py-3 text-sm text-text-light dark:text-dark-text-secondary">
                            {med.dosage.adult}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="px-5 py-3 text-sm font-medium text-text-dark dark:text-dark-text flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-warning" />
                          Common Side Effects
                        </td>
                        {selected.map((med) => (
                          <td key={med.id} className="px-5 py-3 text-sm text-text-light dark:text-dark-text-secondary">
                            {med.side_effects.common.join(", ")}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="px-5 py-3 text-sm font-medium text-text-dark dark:text-dark-text flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-danger" />
                          Serious Side Effects
                        </td>
                        {selected.map((med) => (
                          <td key={med.id} className="px-5 py-3 text-sm text-text-light dark:text-dark-text-secondary">
                            {med.side_effects.serious.join(", ")}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>
          )}

          {selected.length < 2 && (
            <div className="text-center py-12">
              <Scale className="w-16 h-16 text-text-light/20 mx-auto mb-4" />
              <p className="text-text-light dark:text-dark-text-secondary">
                Add at least 2 medicines to start comparing
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
