"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, BookOpen } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/components/LanguageProvider";
import { getBlogBySlug, blogPosts } from "@/lib/data";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getBlogBySlug(slug);
  const { t } = useLanguage();

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-light dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary-light transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("blog_back")}
        </Link>

        <AnimatedSection>
          <article>
            {/* Header */}
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-light dark:text-dark-text-secondary">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.read_time}
                </span>
              </div>
            </div>

            {/* Featured Image Placeholder */}
            <div className="h-64 sm:h-80 medical-gradient-subtle rounded-2xl flex items-center justify-center mb-8">
              <BookOpen className="w-16 h-16 text-primary/20 dark:text-primary-light/20" />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-[family-name:var(--font-heading)] prose-headings:text-text-dark dark:prose-headings:text-dark-text prose-p:text-text-light dark:prose-p:text-dark-text-secondary prose-li:text-text-light dark:prose-li:text-dark-text-secondary prose-strong:text-text-dark dark:prose-strong:text-dark-text">
              {post.content.split("\n").map((paragraph, idx) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={idx} className="text-xl font-semibold mt-8 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={idx} className="text-lg font-semibold mt-6 mb-3">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <li key={idx} className="ml-4 mb-1">
                      {paragraph.replace("- ", "")}
                    </li>
                  );
                }
                if (paragraph.match(/^\d+\.\s/)) {
                  return (
                    <li key={idx} className="ml-4 mb-1 list-decimal">
                      {paragraph.replace(/^\d+\.\s/, "")}
                    </li>
                  );
                }
                if (paragraph.trim() === "") return null;
                return (
                  <p key={idx} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </article>
        </AnimatedSection>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <AnimatedSection delay={0.2}>
            <div className="mt-12 pt-8 border-t border-border dark:border-dark-border">
              <h2 className="text-xl font-semibold text-text-dark dark:text-dark-text font-[family-name:var(--font-heading)] mb-6">
                {t("blog_related")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((related) => (
                  <Link key={related.id} href={`/blog/${related.slug}`}>
                    <div className="premium-card p-4 rounded-xl bg-card dark:bg-dark-card border border-border dark:border-dark-border group">
                      <span className="text-xs text-primary dark:text-primary-light font-medium">{related.category}</span>
                      <h3 className="text-sm font-semibold text-text-dark dark:text-dark-text group-hover:text-primary dark:group-hover:text-primary-light transition-colors mt-1 line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-xs text-text-light dark:text-dark-text-secondary mt-1">{related.read_time}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
