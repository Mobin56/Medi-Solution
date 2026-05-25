"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <AnimatedSection className="w-full max-w-md">
        <div className="bg-card dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 medical-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)]">
              Welcome Back
            </h1>
            <p className="text-sm text-text-light dark:text-dark-text-secondary mt-1">
              Sign in to your Medi-Solution account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-dark dark:text-dark-text mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-background dark:bg-dark-bg border border-border dark:border-dark-border text-text-dark dark:text-dark-text outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-text-dark dark:text-dark-text mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-background dark:bg-dark-bg border border-border dark:border-dark-border text-text-dark dark:text-dark-text outline-none focus:border-primary transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-text-light" />
                  ) : (
                    <Eye className="w-4 h-4 text-text-light" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 medical-gradient text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-text-light dark:text-dark-text-secondary mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary dark:text-primary-light font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
