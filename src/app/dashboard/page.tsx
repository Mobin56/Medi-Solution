"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, History, Bell, Pill, Clock, Trash2, Plus } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { medicines } from "@/lib/data";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"favorites" | "history" | "reminders">("favorites");
  const [favorites, setFavorites] = useState(medicines.slice(0, 3).map((m) => m.id));
  const [reminders, setReminders] = useState([
    { id: "1", medicine: "Napa Extra", time: "08:00 AM", frequency: "Daily", active: true },
    { id: "2", medicine: "Sergel 20", time: "07:00 AM", frequency: "Daily", active: true },
    { id: "3", medicine: "Neuro-B", time: "01:00 PM", frequency: "Daily", active: false },
  ]);

  const favoriteMedicines = medicines.filter((m) => favorites.includes(m.id));
  const historyMedicines = medicines.slice(0, 5);

  const toggleReminder = (id: string) => {
    setReminders(reminders.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((f) => f !== id));
  };

  const tabs = [
    { key: "favorites" as const, label: "Favorites", icon: Heart, count: favoriteMedicines.length },
    { key: "history" as const, label: "History", icon: History, count: historyMedicines.length },
    { key: "reminders" as const, label: "Reminders", icon: Bell, count: reminders.length },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 medical-gradient opacity-[0.03] dark:opacity-[0.08]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-2">
              My Dashboard
            </h1>
            <p className="text-text-light dark:text-dark-text-secondary">
              Manage your saved medicines, history, and reminders
            </p>
          </AnimatedSection>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? "bg-primary text-white"
                    : "bg-card dark:bg-dark-card border border-border dark:border-dark-border text-text-light dark:text-dark-text-secondary hover:border-primary"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.key ? "bg-white/20" : "bg-gray-100 dark:bg-dark-border"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Favorites Tab */}
          {activeTab === "favorites" && (
            <AnimatedSection>
              {favoriteMedicines.length > 0 ? (
                <div className="space-y-3">
                  {favoriteMedicines.map((med) => (
                    <div key={med.id} className="bg-card dark:bg-dark-card rounded-xl border border-border dark:border-dark-border p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl medical-gradient-subtle flex items-center justify-center shrink-0">
                        <Pill className="w-6 h-6 text-primary dark:text-primary-light" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/medicines/${med.id}`} className="text-base font-semibold text-text-dark dark:text-dark-text hover:text-primary dark:hover:text-primary-light transition-colors">
                          {med.medicine_name}
                        </Link>
                        <p className="text-sm text-text-light dark:text-dark-text-secondary">{med.generic_name} — {med.company_name}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-primary dark:text-primary-light font-semibold">৳{med.price.unit_price.toFixed(2)}</div>
                      </div>
                      <button onClick={() => removeFavorite(med.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg shrink-0">
                        <Trash2 className="w-4 h-4 text-danger" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border">
                  <Heart className="w-12 h-12 text-text-light/20 mx-auto mb-3" />
                  <p className="text-text-light dark:text-dark-text-secondary mb-4">No favorite medicines yet</p>
                  <Link href="/medicines" className="inline-flex items-center gap-2 px-5 py-2.5 medical-gradient text-white font-medium rounded-xl text-sm">
                    <Plus className="w-4 h-4" />
                    Browse Medicines
                  </Link>
                </div>
              )}
            </AnimatedSection>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <AnimatedSection>
              <div className="space-y-3">
                {historyMedicines.map((med, i) => (
                  <div key={med.id} className="bg-card dark:bg-dark-card rounded-xl border border-border dark:border-dark-border p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl medical-gradient-subtle flex items-center justify-center shrink-0">
                      <Pill className="w-6 h-6 text-primary dark:text-primary-light" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/medicines/${med.id}`} className="text-base font-semibold text-text-dark dark:text-dark-text hover:text-primary dark:hover:text-primary-light transition-colors">
                        {med.medicine_name}
                      </Link>
                      <p className="text-sm text-text-light dark:text-dark-text-secondary">{med.generic_name}</p>
                    </div>
                    <div className="text-xs text-text-light dark:text-dark-text-secondary flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      {i === 0 ? "Just now" : i === 1 ? "1 hour ago" : `${i} hours ago`}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Reminders Tab */}
          {activeTab === "reminders" && (
            <AnimatedSection>
              <div className="space-y-3">
                {reminders.map((reminder) => (
                  <div key={reminder.id} className="bg-card dark:bg-dark-card rounded-xl border border-border dark:border-dark-border p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      reminder.active ? "medical-gradient" : "bg-gray-200 dark:bg-dark-border"
                    }`}>
                      <Bell className={`w-6 h-6 ${reminder.active ? "text-white" : "text-text-light"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-semibold text-text-dark dark:text-dark-text">{reminder.medicine}</div>
                      <p className="text-sm text-text-light dark:text-dark-text-secondary">{reminder.time} — {reminder.frequency}</p>
                    </div>
                    <button
                      onClick={() => toggleReminder(reminder.id)}
                      className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                        reminder.active ? "bg-primary" : "bg-gray-300 dark:bg-dark-border"
                      }`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        reminder.active ? "left-7" : "left-1"
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
}
