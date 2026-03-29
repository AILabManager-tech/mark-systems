"use client";

import { Link } from "@/i18n/navigation";
import { BowlerMascot } from "@/components/mascot/BowlerMascot";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="mx-auto max-w-md text-center px-4">
        <span className="mb-4 block font-mono text-8xl font-bold text-txt-tertiary/30">
          404
        </span>

        <div className="mb-6 flex justify-center">
          <BowlerMascot
            mood="thinking"
            size="lg"
            message="Oups ! Cette page semble introuvable."
            showBubbleOnHover={false}
          />
        </div>

        <h1 className="mb-4 text-h2 font-bold text-txt-primary">
          Page introuvable
        </h1>
        <p className="mx-auto mb-8 text-txt-secondary">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-cyber-cyan/30 px-6 py-3 font-mono text-sm text-cyber-cyan transition-all hover:border-cyber-cyan/60 hover:shadow-glow-cyan"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
