"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Video,
  FileText,
  BookOpen,
  Wrench,
} from "lucide-react";
import type { Resource } from "@/lib/data/resources";

const typeConfig = {
  video: { icon: Video, label: "Video", color: "bg-blue-100 text-blue-700" },
  pdf: { icon: FileText, label: "PDF", color: "bg-red-100 text-red-700" },
  article: { icon: BookOpen, label: "Article", color: "bg-green-100 text-green-700" },
  tool: { icon: Wrench, label: "Tool", color: "bg-purple-100 text-purple-700" },
} as const;

interface GoDeeperProps {
  resources: Resource[];
  moduleColor?: string;
}

export function GoDeeper({ resources, moduleColor }: GoDeeperProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (resources.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <span
            className="text-lg font-semibold"
            style={moduleColor ? { color: moduleColor } : undefined}
          >
            Go Deeper
          </span>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-neutral-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-neutral-500" />
          )}
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid gap-3 px-4 pb-4 pt-2">
                {resources.map((resource) => {
                  const config = typeConfig[resource.type];
                  const TypeIcon = config.icon;

                  return (
                    <a
                      key={resource.title}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
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
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
