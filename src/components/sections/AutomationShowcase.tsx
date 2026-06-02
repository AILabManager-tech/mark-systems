"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Database,
  Zap,
  Mail,
  FileText,
  CheckCircle2,
  ArrowDownRight,
  Settings,
  BarChart3,
} from "lucide-react";

const PIPELINE_NODES = [
  { icon: Database, color: "#3B82F6", key: "trigger" },
  { icon: Settings, color: "#8B5CF6", key: "process" },
  { icon: Zap, color: "#00A19B", key: "automate" },
  { icon: Mail, color: "#F59E0B", key: "notify" },
  { icon: FileText, color: "#10B981", key: "report" },
  { icon: BarChart3, color: "#EC4899", key: "analyze" },
];

export function AutomationShowcase() {
  const t = useTranslations("automation");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeNode, setActiveNode] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    let idx = 0;
    const interval = setInterval(() => {
      setActiveNode(idx);
      idx++;
      if (idx >= PIPELINE_NODES.length) {
        setTimeout(() => setActiveNode(-1), 1500);
        idx = 0;
      }
    }, 800);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-mono tracking-widest uppercase text-accent bg-accent/10 border border-accent/20 rounded-full">
            <Zap className="w-3 h-3" />
            {t("tag")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            {t("title")}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-text-secondary">
            {t("description")}
          </p>
        </motion.div>

        {/* Pipeline Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Pipeline container */}
          <div className="relative p-8 md:p-12 rounded-2xl border border-border/50 bg-surface/30 backdrop-blur-sm overflow-hidden">
            {/* Animated background grid lines */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
                  style={{ top: `${(i + 1) * 16}%`, left: 0, right: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: [0, 0.5, 0],
                          x: ["-100%", "0%", "100%"],
                        }
                      : {}
                  }
                  transition={{
                    duration: 4,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Nodes grid */}
            <div className="relative grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {PIPELINE_NODES.map((node, i) => {
                const Icon = node.icon;
                const isActive = activeNode === i;
                const isCompleted = activeNode > i;

                return (
                  <motion.div
                    key={node.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="relative"
                  >
                    <motion.div
                      animate={
                        isActive
                          ? {
                              scale: [1, 1.05, 1],
                              boxShadow: [
                                `0 0 0 0 ${node.color}00`,
                                `0 0 30px 8px ${node.color}30`,
                                `0 0 0 0 ${node.color}00`,
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 0.6 }}
                      className={`relative p-6 rounded-xl border transition-all duration-500 ${
                        isActive
                          ? "border-accent/50 bg-accent/10"
                          : isCompleted
                            ? "border-accent/30 bg-accent/5"
                            : "border-border/50 bg-surface/50"
                      }`}
                    >
                      {/* Status indicator */}
                      <div className="absolute -top-2 -right-2">
                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center justify-center w-5 h-5 rounded-full bg-accent"
                          >
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                        {isActive && (
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-3 h-3 rounded-full bg-accent"
                          />
                        )}
                      </div>

                      {/* Icon */}
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-lg mb-3"
                        style={{
                          backgroundColor: `${node.color}15`,
                          border: `1px solid ${node.color}30`,
                        }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: node.color }}
                        />
                      </div>

                      {/* Label */}
                      <h3 className="text-sm font-semibold text-text-primary mb-1">
                        {t(`steps.${node.key}.title`)}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {t(`steps.${node.key}.desc`)}
                      </p>

                      {/* Connection arrow (not on last item) */}
                      {i < PIPELINE_NODES.length - 1 && i % 3 !== 2 && (
                        <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2">
                          <ArrowDownRight
                            className={`w-4 h-4 transition-colors duration-300 ${
                              isCompleted
                                ? "text-accent"
                                : "text-border"
                            }`}
                          />
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Data flow line */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent via-teal-400 to-cyan-400 rounded-full"
              animate={
                isInView
                  ? {
                      width: [
                        "0%",
                        `${((activeNode + 1) / PIPELINE_NODES.length) * 100}%`,
                      ],
                    }
                  : { width: "0%" }
              }
              transition={{ duration: 0.5, ease: "easeOut" as const }}
            />
          </div>
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {(["metric1", "metric2", "metric3"] as const).map((key) => (
            <div
              key={key}
              className="text-center p-4 rounded-xl border border-border/30 bg-surface/20"
            >
              <div className="text-2xl font-bold gradient-text">
                {t(`metrics.${key}.value`)}
              </div>
              <div className="mt-1 text-sm text-text-secondary">
                {t(`metrics.${key}.label`)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
