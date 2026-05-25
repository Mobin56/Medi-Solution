"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative medical-gradient rounded-3xl p-8 sm:p-12 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            {!submitted ? (
              <>
                <Mail className="w-12 h-12 text-white/80 mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-heading)] mb-3">
                  {t("newsletter_title")}
                </h2>
                <p className="text-white/80 mb-8 max-w-xl mx-auto">
                  {t("newsletter_subtitle")}
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("newsletter_placeholder")}
                    className="flex-1 px-5 py-3 rounded-xl bg-white/20 text-white placeholder:text-white/60 outline-none border border-white/20 focus:border-white/50 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-white/90 transition-colors whitespace-nowrap"
                  >
                    {t("newsletter_submit")}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-4">
                <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)] mb-2">
                  {t("newsletter_success")}
                </h3>
                <p className="text-white/80">{t("newsletter_success_desc")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
