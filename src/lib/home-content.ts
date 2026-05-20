import type { Locale } from "@/i18n/routing";

type Localized<T> = {
  fr: T;
  en: T;
};

function pick<T>(localized: Localized<T>, locale: string): T {
  return localized[locale === "fr" ? "fr" : "en"];
}

export function getHomeContent(locale: string) {
  const typedLocale: Locale = locale === "fr" ? "fr" : "en";

  return {
    hero: pick(
      {
        fr: {
          badge: "Studio technique · IA appliquée · Automatisation · Architecture",
          title: "On construit des systèmes numériques qui vendent, opèrent et évoluent.",
          description:
            "Mark Systems conçoit des sites premium, des automatisations métier et des outils IA sur mesure pour les entreprises qui veulent plus qu'une vitrine: un actif réel, mesurable et durable.",
          primaryCta: "Démarrer un brief",
          primaryHref: "/brief",
          secondaryCta: "Voir les projets",
          secondaryHref: "/projects",
          tertiaryCta: "Demander un audit",
          tertiaryHref: "/contact",
          proofLabel: "Ce qu'on apporte",
          proofItems: [
            { value: "Web", label: "expériences premium qui inspirent confiance" },
            { value: "Automation", label: "opérations allégées et mieux orchestrées" },
            { value: "AI", label: "outils utiles, pas gadgets de démonstration" },
          ],
        },
        en: {
          badge: "Technical studio · Applied AI · Automation · Architecture",
          title: "We build digital systems that sell, operate, and scale.",
          description:
            "Mark Systems designs premium websites, business automation, and custom AI tools for companies that want more than a digital brochure: they want a measurable asset built to last.",
          primaryCta: "Start a brief",
          primaryHref: "/brief",
          secondaryCta: "View projects",
          secondaryHref: "/projects",
          tertiaryCta: "Request an audit",
          tertiaryHref: "/contact",
          proofLabel: "What we deliver",
          proofItems: [
            { value: "Web", label: "premium experiences that build trust" },
            { value: "Automation", label: "leaner operations with stronger flow" },
            { value: "AI", label: "useful systems, not demo gimmicks" },
          ],
        },
      },
      typedLocale
    ),
    offer: pick(
      {
        fr: {
          label: "Ce qu'on construit",
          title: "Trois couches, un même objectif",
          description:
            "Nos projets combinent design, infrastructure et logique métier. On évite les stacks jetables, les funnels vides et les automatisations fragiles.",
          items: [
            {
              title: "Sites premium et expériences clients",
              text: "Des vitrines, plateformes et interfaces qui donnent de la crédibilité, convertissent mieux et restent propres quand le projet grandit.",
              bullets: ["Positionnement clair", "Design sur mesure", "Stack moderne et maintainable"],
            },
            {
              title: "Automatisation et opérations numériques",
              text: "Des workflows qui remplacent le copier-coller humain, fluidifient les suivis et connectent vos outils au lieu de les laisser vivre en silos.",
              bullets: ["Lead intake", "Reporting", "Synchronisation d'outils"],
            },
            {
              title: "Outils IA et systèmes internes",
              text: "Des assistants, moteurs de qualification, tableaux de bord et systèmes de décision conçus pour résoudre un problème précis avec gouvernance et visibilité.",
              bullets: ["IA appliquée", "Dashboards", "Orchestration agentique"],
            },
          ],
        },
        en: {
          label: "What we build",
          title: "Three layers, one objective",
          description:
            "Our work combines design, infrastructure, and business logic. We avoid disposable stacks, empty funnels, and brittle automation.",
          items: [
            {
              title: "Premium websites and client experiences",
              text: "Showcase sites, platforms, and interfaces that build credibility, convert better, and remain clean as the business grows.",
              bullets: ["Clear positioning", "Custom design", "Modern maintainable stack"],
            },
            {
              title: "Automation and digital operations",
              text: "Workflows that replace human copy-paste, streamline follow-up, and connect your tools instead of leaving them siloed.",
              bullets: ["Lead intake", "Reporting", "Tool synchronization"],
            },
            {
              title: "AI tools and internal systems",
              text: "Assistants, qualification engines, dashboards, and decision systems built to solve a precise business problem with governance and visibility.",
              bullets: ["Applied AI", "Dashboards", "Agent orchestration"],
            },
          ],
        },
      },
      typedLocale
    ),
    proof: pick(
      {
        fr: {
          label: "Pourquoi nous",
          title: "On ne vend pas seulement une exécution. On apporte une structure.",
          items: [
            {
              title: "Approche quality-first",
              text: "Scoring, audit, conformité, tests et standards internes pour éviter l'improvisation coûteuse.",
            },
            {
              title: "Systèmes internes réels",
              text: "SOIC, OSIRIS, AINOVA_OS, workflows d'automatisation et briques de gouvernance nourrissent nos projets.",
            },
            {
              title: "Focus PME et équipes ambitieuses",
              text: "On construit pour les structures qui veulent un vrai gain opérationnel, pas juste un site “plus beau”.",
            },
          ],
          metrics: [
            { value: "1", suffix: " stack", label: "cohérente plutôt qu'un collage d'outils" },
            { value: "3", suffix: " angles", label: "web, automation, IA" },
            { value: "0", suffix: " fluff", label: "on préfère les preuves aux slogans vagues" },
          ],
        },
        en: {
          label: "Why us",
          title: "We do not only deliver execution. We bring structure.",
          items: [
            {
              title: "Quality-first approach",
              text: "Scoring, audit, compliance, tests, and internal standards to avoid expensive improvisation.",
            },
            {
              title: "Real internal systems",
              text: "SOIC, OSIRIS, AINOVA_OS, automation workflows, and governance primitives feed our delivery.",
            },
            {
              title: "Built for ambitious SMBs and teams",
              text: "We build for organizations that want operational leverage, not just a prettier website.",
            },
          ],
          metrics: [
            { value: "1", suffix: " stack", label: "coherent rather than glued together" },
            { value: "3", suffix: " lenses", label: "web, automation, AI" },
            { value: "0", suffix: " fluff", label: "we prefer proof over vague slogans" },
          ],
        },
      },
      typedLocale
    ),
    systems: pick(
      {
        fr: {
          label: "Actifs internes",
          title: "Une profondeur technique qu'on convertit en avantage client",
          description:
            "Tes clients n'ont pas besoin de connaître tous les noms de code. Mais ils doivent sentir qu'il y a derrière Mark Systems de vraies briques de méthode, d'audit et de gouvernance.",
          items: [
            {
              name: "SOIC",
              summary: "Cadre de qualité et de scoring pour mesurer la solidité d'un projet, plutôt que de juger à l'instinct.",
            },
            {
              name: "OSIRIS",
              summary: "Scanner de santé opérationnelle web pour objectiver performance, sécurité et ressources.",
            },
            {
              name: "AINOVA_OS",
              summary: "Vision plateforme pour des systèmes IA gouvernés, auditables et durables.",
            },
            {
              name: "NEXOS v4.4.0",
              summary: "Pipeline web 6 phases, 57 agents spécialisés, 595 tests, conformité Loi 25 native et déploiement Next.js 15 sur Vercel — l'asset technique sous chaque livraison Mark Systems.",
            },
          ],
        },
        en: {
          label: "Internal assets",
          title: "Technical depth translated into client advantage",
          description:
            "Clients do not need every codename. But they should feel that Mark Systems stands on real methods, audit layers, and governance systems.",
          items: [
            {
              name: "SOIC",
              summary: "A quality and scoring framework used to assess the strength of a project instead of relying on instinct.",
            },
            {
              name: "OSIRIS",
              summary: "A web operational health scanner to objectify performance, security, and resource quality.",
            },
            {
              name: "AINOVA_OS",
              summary: "A platform vision for governed, auditable, durable AI systems.",
            },
            {
              name: "NEXOS v4.4.0",
              summary: "A 6-phase web pipeline with 57 specialized agents, 595 tests, native Law 25 compliance, and Next.js 15 deployment on Vercel — the technical asset behind every Mark Systems delivery.",
            },
          ],
        },
      },
      typedLocale
    ),
    process: pick(
      {
        fr: {
          label: "Comment on travaille",
          title: "Un parcours simple, sans brouillard",
          steps: [
            {
              title: "1. Clarifier",
              text: "On qualifie le besoin, l'offre, le contexte d'affaires et les contraintes techniques.",
            },
            {
              title: "2. Structurer",
              text: "On définit l'architecture, les sections, les contenus, les données et les flux d'automatisation.",
            },
            {
              title: "3. Construire",
              text: "On exécute avec une stack propre, un design cohérent et des validations réelles.",
            },
            {
              title: "4. Améliorer",
              text: "On mesure, on corrige, on itère. Un projet vivant doit produire du signal, pas juste exister en ligne.",
            },
          ],
        },
        en: {
          label: "How we work",
          title: "A clear path, without fog",
          steps: [
            {
              title: "1. Clarify",
              text: "We qualify the need, the offer, the business context, and technical constraints.",
            },
            {
              title: "2. Structure",
              text: "We define architecture, sections, content, data, and automation flows.",
            },
            {
              title: "3. Build",
              text: "We execute with a clean stack, a coherent design, and real validation.",
            },
            {
              title: "4. Improve",
              text: "We measure, correct, and iterate. A living project should produce signal, not just exist online.",
            },
          ],
        },
      },
      typedLocale
    ),
    finalCta: pick(
      {
        fr: {
          label: "Prêt à avancer",
          title: "Dis-nous où ça bloque, et on conçoit le bon système.",
          text: "Que vous ayez besoin d'un site plus crédible, d'une automatisation plus fluide ou d'un outil IA réellement utile, on peut cadrer ça proprement.",
          primary: "Démarrer un brief",
          primaryHref: "/brief",
          secondary: "Parler à Mark Systems",
          secondaryHref: "/contact",
        },
        en: {
          label: "Ready to move",
          title: "Tell us where the friction is, and we will design the right system.",
          text: "Whether you need a more credible website, smoother automation, or an AI tool that actually helps, we can frame it properly.",
          primary: "Start a brief",
          primaryHref: "/brief",
          secondary: "Talk to Mark Systems",
          secondaryHref: "/contact",
        },
      },
      typedLocale
    ),
  };
}
