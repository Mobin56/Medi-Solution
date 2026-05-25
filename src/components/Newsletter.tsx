"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl medical-gradient p-8 sm:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6"
            >
              <Mail className="w-7 h-7 text-white" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-heading)] mb-3">
              Stay Updated with Health News
            </h2>
            <p className="text-blue-100 mb-8">
              Subscribe to our newsletter for medicine updates, health tips, and medical news.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-2 text-white"
              >
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg font-medium">Thank you for subscribing!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-3 rounded-xl bg-white/20 text-white placeholder:text-blue-200 border border-white/30 outline-none focus:bg-white/30 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
