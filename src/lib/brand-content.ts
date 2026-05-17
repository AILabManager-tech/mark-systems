import type { Locale } from "@/i18n/routing";

type Localized<T> = {
  fr: T;
  en: T;
};

function pick<T>(localized: Localized<T>, locale: string): T {
  return localized[locale === "fr" ? "fr" : "en"];
}

export function getBrandContent(locale: string) {
  const typedLocale: Locale = locale === "fr" ? "fr" : "en";

  return {
    services: pick(
      {
        fr: {
          heroLabel: "Services",
          heroTitle: "On conçoit des actifs numériques qui font avancer l'entreprise.",
          heroText:
            "Chaque service chez Mark Systems vise un résultat concret: mieux présenter l'offre, mieux opérer, mieux qualifier, mieux décider. Pas de livrable vide, pas de système sans usage.",
          pillars: [
            {
              title: "Clarté commerciale",
              text: "Positionnement, structure, CTA, friction réduite et meilleure lisibilité pour vendre plus proprement.",
            },
            {
              title: "Capacité opérationnelle",
              text: "Automatisations, outils, reporting et flux qui enlèvent du poids aux équipes au lieu d'en ajouter.",
            },
            {
              title: "Base technique durable",
              text: "Stack propre, architecture claire, qualité, gouvernance et capacité d'évolution plutôt que livraison jetable.",
            },
          ],
          workLabel: "Ce qu'on prend en charge",
          workTitle: "Des missions bien cadrées, pas du bruit technique",
          workText:
            "Vous pouvez venir pour un site, une automatisation, un audit ou une architecture IA. Le point commun: on structure le projet pour qu'il serve vraiment l'entreprise.",
          outcomesLabel: "Ce que les clients achètent vraiment",
          outcomesTitle: "Pas une techno. Un changement mesurable.",
          outcomes: [
            "Un site qui inspire confiance et convertit mieux",
            "Des opérations plus fluides et moins manuelles",
            "Des outils internes mieux branchés à la réalité métier",
            "Une lecture plus claire de la qualité, des risques et des opportunités",
          ],
          ctaTitle: "Si le problème est encore flou, on commence par le clarifier.",
          ctaText:
            "Le meilleur point d'entrée reste le brief. Il nous donne assez de signal pour cadrer le bon service, pas seulement vendre la mauvaise prestation plus vite.",
          ctaPrimary: "Démarrer un brief",
          ctaSecondary: "Parler à Mark Systems",
        },
        en: {
          heroLabel: "Services",
          heroTitle: "We design digital assets that move the business forward.",
          heroText:
            "Every Mark Systems service targets a concrete outcome: better positioning, better operations, better qualification, better decisions. No empty deliverables, no systems without use.",
          pillars: [
            {
              title: "Commercial clarity",
              text: "Positioning, structure, CTA design, less friction, and stronger readability to sell more cleanly.",
            },
            {
              title: "Operational capacity",
              text: "Automation, tools, reporting, and flows that remove weight from teams instead of adding more.",
            },
            {
              title: "Durable technical base",
              text: "Clean stack, clear architecture, quality, governance, and room to evolve instead of disposable delivery.",
            },
          ],
          workLabel: "What we handle",
          workTitle: "Clearly scoped missions, not technical noise",
          workText:
            "You can come for a site, an automation layer, an audit, or an AI architecture. The common point: we structure the project so it truly serves the business.",
          outcomesLabel: "What clients are actually buying",
          outcomesTitle: "Not a technology. A measurable change.",
          outcomes: [
            "A website that builds trust and converts better",
            "Smoother, less manual operations",
            "Internal tools more closely aligned with business reality",
            "A clearer read on quality, risks, and opportunities",
          ],
          ctaTitle: "If the problem is still fuzzy, we start by clarifying it.",
          ctaText:
            "The best entry point remains the brief. It gives us enough signal to frame the right service instead of selling the wrong one faster.",
          ctaPrimary: "Start a brief",
          ctaSecondary: "Talk to Mark Systems",
        },
      },
      typedLocale
    ),
    projects: pick(
      {
        fr: {
          heroLabel: "Études de cas",
          heroTitle: "Des projets qui prouvent une méthode, pas juste un style.",
          heroText:
            "Nos projets servent à montrer comment on pense: architecture, exécution, mesure, qualité et capacité à livrer autre chose qu'une belle façade.",
          proofLabel: "Ce que ces projets démontrent",
          proofTitle: "Chaque étude de cas doit répondre à une vraie question client",
          proofItems: [
            {
              title: "Est-ce que vous savez livrer ?",
              text: "Oui, avec des projets déployés, des stacks cohérentes et des signaux tangibles.",
            },
            {
              title: "Est-ce que vous comprenez le business ?",
              text: "Oui, parce que les projets sont pensés autour d'un usage, d'un public et d'un résultat attendu.",
            },
            {
              title: "Est-ce que vous avez une vraie profondeur technique ?",
              text: "Oui, parce que derrière les vitrines il y a aussi audit, gouvernance, systèmes internes et architecture.",
            },
          ],
          framingTitle: "Comment lire notre portfolio",
          framingText:
            "Vous n'avez pas besoin que chaque projet ressemble au vôtre. Vous avez besoin de voir qu'on sait résoudre des problèmes avec cohérence, rigueur et ambition.",
          ctaTitle: "Si vous voulez voir comment on cadrerait votre projet, passez par le brief.",
          ctaPrimary: "Démarrer un brief",
          ctaSecondary: "Nous contacter",
        },
        en: {
          heroLabel: "Case studies",
          heroTitle: "Projects that prove a method, not just a style.",
          heroText:
            "Our projects show how we think: architecture, execution, measurement, quality, and the ability to deliver more than a polished facade.",
          proofLabel: "What these projects prove",
          proofTitle: "Every case study should answer a real client question",
          proofItems: [
            {
              title: "Can you actually deliver?",
              text: "Yes, through deployed work, coherent stacks, and visible signals.",
            },
            {
              title: "Do you understand business reality?",
              text: "Yes, because projects are built around a use case, a real audience, and an expected outcome.",
            },
            {
              title: "Do you have real technical depth?",
              text: "Yes, because behind the websites there is also audit, governance, internal systems, and architecture.",
            },
          ],
          framingTitle: "How to read our portfolio",
          framingText:
            "You do not need every project to look like yours. You need to see that we solve problems with coherence, rigor, and ambition.",
          ctaTitle: "If you want to see how we'd frame your project, start with the brief.",
          ctaPrimary: "Start a brief",
          ctaSecondary: "Contact us",
        },
      },
      typedLocale
    ),
    about: pick(
      {
        fr: {
          heroLabel: "À propos",
          heroTitle: "Mark Systems existe pour combler l'écart entre belle présence numérique et vrai système utile.",
          heroText:
            "On ne s'intéresse pas aux sites qui décorent, aux automatisations qui cassent en silence ou aux outils IA qui impressionnent sans servir. Notre travail est d'aligner design, structure et utilité.",
          principlesLabel: "Nos principes",
          principlesTitle: "Ce qu'on valorise quand on construit",
          principles: [
            {
              title: "Clarté avant complexité",
              text: "Si une architecture ne peut pas être expliquée clairement, elle va coûter trop cher à maintenir.",
            },
            {
              title: "Systèmes avant effets",
              text: "Le visuel compte, mais il doit servir un usage, un parcours et un avantage concret.",
            },
            {
              title: "Mesure avant intuition seule",
              text: "On aime la vision. Mais on aime encore plus les signaux qui permettent d'itérer proprement.",
            },
            {
              title: "Rigueur avant improvisation",
              text: "Qualité, conformité, audit et structure ne sont pas des extras. Ce sont des bases.",
            },
          ],
          founderLabel: "Fondateur",
          founderTitle: "Une posture d'ingénierie, pas seulement de prestation",
          founderText:
            "Mark Systems est porté comme un studio technique: penser l'architecture, exécuter proprement, puis relier le tout à un usage réel et à une logique business.",
        },
        en: {
          heroLabel: "About",
          heroTitle: "Mark Systems exists to close the gap between polished presence and genuinely useful systems.",
          heroText:
            "We are not interested in decorative websites, brittle automation, or AI tools that impress without helping. Our work is to align design, structure, and utility.",
          principlesLabel: "Our principles",
          principlesTitle: "What we value when we build",
          principles: [
            {
              title: "Clarity before complexity",
              text: "If an architecture cannot be explained clearly, it will cost too much to maintain.",
            },
            {
              title: "Systems before effects",
              text: "Visual design matters, but it must serve a use case, a journey, and a real advantage.",
            },
            {
              title: "Measurement before intuition alone",
              text: "We value vision. We value signals even more when it comes to iterating properly.",
            },
            {
              title: "Rigor before improvisation",
              text: "Quality, compliance, audit, and structure are not extras. They are foundations.",
            },
          ],
          founderLabel: "Founder",
          founderTitle: "An engineering posture, not just a service posture",
          founderText:
            "Mark Systems is run like a technical studio: think architecture, execute cleanly, and connect it all to real usage and business logic.",
        },
      },
      typedLocale
    ),
    contact: pick(
      {
        fr: {
          heroLabel: "Contact",
          heroTitle: "Le bon projet commence souvent par une bonne conversation.",
          heroText:
            "Si vous hésitez entre site, automatisation, audit ou système IA, c'est normal. Le rôle du premier échange est de clarifier le vrai besoin, pas de vous pousser vers une solution prématurée.",
          sideCards: [
            {
              title: "Quand nous écrire",
              text: "Quand vous sentez que votre site, vos opérations ou votre outillage interne freinent la croissance au lieu de l'aider.",
            },
            {
              title: "Ce qu'on peut clarifier rapidement",
              text: "Le type de mandat, la bonne offre d'entrée, l'ordre des priorités et le niveau d'effort réaliste.",
            },
            {
              title: "Le meilleur point d'entrée",
              text: "Si votre besoin est déjà assez clair, le brief reste la meilleure porte d'entrée pour cadrer le projet proprement.",
            },
          ],
          briefCta: "Passer par le brief",
        },
        en: {
          heroLabel: "Contact",
          heroTitle: "The right project often starts with the right conversation.",
          heroText:
            "If you are still unsure whether you need a website, automation, an audit, or an AI system, that is normal. The first conversation exists to clarify the real need, not to push you into a premature solution.",
          sideCards: [
            {
              title: "When to reach out",
              text: "When your website, operations, or internal tooling start slowing growth instead of supporting it.",
            },
            {
              title: "What we can clarify quickly",
              text: "The right engagement type, the best entry offer, the order of priorities, and a realistic effort level.",
            },
            {
              title: "Best entry point",
              text: "If your need is already fairly clear, the brief remains the best way to frame the project properly.",
            },
          ],
          briefCta: "Go through the brief",
        },
      },
      typedLocale
    ),
    brief: pick(
      {
        fr: {
          heroLabel: "Brief",
          heroTitle: "Le brief n'est pas une formalité. C'est déjà le début de l'architecture.",
          heroText:
            "Cette étape nous aide à comprendre votre contexte, votre réalité métier, votre niveau d'ambition et les contraintes qui doivent guider la solution. Plus le brief est clair, plus la proposition sera juste.",
          points: [
            {
              title: "Ce qu'on cherche à capter",
              text: "Le vrai besoin derrière la demande, les objectifs du projet, les contraintes légales et le niveau de sophistication souhaité.",
            },
            {
              title: "Pourquoi c'est utile",
              text: "Un bon brief évite les devis flous, les délais mal calibrés et les solutions séduisantes mais mal adaptées.",
            },
            {
              title: "Ce que vous recevez",
              text: "Un cadrage plus propre, un point de départ concret et un niveau de conversation plus élevé que le simple \"combien ça coûte\".",
            },
          ],
        },
        en: {
          heroLabel: "Brief",
          heroTitle: "The brief is not paperwork. It is already the beginning of the architecture.",
          heroText:
            "This step helps us understand your context, your business reality, your ambition level, and the constraints that should shape the solution. The clearer the brief, the more accurate the proposal.",
          points: [
            {
              title: "What we are trying to capture",
              text: "The real need behind the request, the project goals, legal constraints, and the level of sophistication you actually want.",
            },
            {
              title: "Why it matters",
              text: "A strong brief avoids vague proposals, poorly calibrated timelines, and attractive but misaligned solutions.",
            },
            {
              title: "What you get from it",
              text: "Cleaner framing, a more concrete starting point, and a higher-level conversation than just asking for a price.",
            },
          ],
        },
      },
      typedLocale
    ),
  };
}
