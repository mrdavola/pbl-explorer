"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Home,
  ExternalLink,
  Video,
  FileText,
  BookOpen,
  Wrench,
} from "lucide-react";
import { resources } from "@/lib/data/resources";

const typeConfig = {
  video: { icon: Video, label: "Video", color: "bg-blue-100 text-blue-700" },
  pdf: { icon: FileText, label: "PDF", color: "bg-red-100 text-red-700" },
  article: { icon: BookOpen, label: "Article", color: "bg-green-100 text-green-700" },
  tool: { icon: Wrench, label: "Tool", color: "bg-purple-100 text-purple-700" },
} as const;

const categories = [
  { key: "all", label: "All" },
  { key: "tool", label: "Frameworks" },
  { key: "article", label: "Protocols" },
  { key: "pdf", label: "Templates" },
  { key: "video", label: "Videos" },
] as const;

type CategoryKey = (typeof categories)[number]["key"];

export default function ToolkitPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryKey>("all");

  const filtered =
    activeFilter === "all"
      ? resources
      : resources.filter((r) => r.type === activeFilter);

  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between px-5 py-3 max-w-2xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </Link>
          <h1 className="text-lg font-bold font-[family-name:var(--font-display)] tracking-tight">
            PBL Toolkit
          </h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Content */}
      <main className="px-5 py-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)]">
            PBL Toolkit
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Curated resources for your PBL journey
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === cat.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Resource grid */}
        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map((resource, i) => {
            const config = typeConfig[resource.type];
            const TypeIcon = config.icon;

            return (
              <motion.a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-neutral-300 hover:shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600"
              >
                <div className="flex-1 min-w-0">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${config.color}`}
                    >
                      <TypeIcon className="h-3 w-3" />
                      {config.label}
                    </span>
                  </div>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {resource.title}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {resource.source}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {resource.description}
                  </p>
                </div>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-600 dark:group-hover:text-neutral-300" />
              </motion.a>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-12">
            No resources found for this category.
          </p>
        )}

        <div className="h-12" />
      </main>
    </div>
  );
}
