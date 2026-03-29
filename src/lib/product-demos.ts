export const FEATURED_PRODUCT_DEMO_IDS = ["estimaweb-qc", "osiris-scanner", "one-click-report"] as const;
export const PRODUCT_DEMO_IDS = [
  ...FEATURED_PRODUCT_DEMO_IDS,
  "inbox-zero",
  "summeet",
  "financial-intelligence-suite",
] as const;

export type ProductDemoId = (typeof PRODUCT_DEMO_IDS)[number];
export type ProductLocale = "fr" | "en";

type LocalizedText = { fr: string; en: string };
type LocalizedList = { fr: string[]; en: string[] };

export type ProductDemo = {
  id: ProductDemoId;
  score: number;
  title: LocalizedText;
  category: LocalizedText;
  tagline: LocalizedText;
  audience: LocalizedText;
  whyNow: LocalizedText;
  testIntro: LocalizedText;
  metricValue: string;
  metricLabel: LocalizedText;
  technologies: string[];
  decision: LocalizedText;
  bullets: LocalizedList;
};

export const PRODUCT_DEMOS: Record<ProductDemoId, ProductDemo> = {
  "estimaweb-qc": {
    id: "estimaweb-qc",
    score: 9.4,
    title: { fr: "EstimaWeb QC", en: "EstimaWeb QC" },
    category: { fr: "Estimateur interactif", en: "Interactive estimator" },
    tagline: {
      fr: "Le produit le plus simple a comprendre, a tester et a vendre en premiere ligne.",
      en: "The easiest product to understand, test, and sell as a front-door offer.",
    },
    audience: {
      fr: "PME, consultants et clients qui veulent une reponse concrete avant de parler a un vendeur.",
      en: "SMBs, consultants, and buyers who want a concrete answer before talking to sales.",
    },
    whyNow: {
      fr: "Tres faible friction, valeur immediate, excellent outil de qualification et de capture de leads.",
      en: "Very low friction, immediate value, and a strong lead-qualification wedge.",
    },
    testIntro: {
      fr: "Testez une version rapide de l'estimateur pour voir le potentiel de qualification.",
      en: "Try a quick estimator version to see how it qualifies a project.",
    },
    metricValue: "3",
    metricLabel: { fr: "scenarios monetisables", en: "monetizable scenarios" },
    technologies: ["Next.js", "Wizard UX", "Lead capture", "PDF export"],
    decision: {
      fr: "A afficher en tete: c'est le produit le plus accessible pour convertir un visiteur froid.",
      en: "Feature first: it is the most accessible product for converting cold traffic.",
    },
    bullets: {
      fr: [
        "Question universelle: combien va couter mon site?",
        "Resultat immediat percu comme utile",
        "Peut devenir un aimant a leads autonome",
      ],
      en: [
        "Universal question: how much will my website cost?",
        "Immediate outcome perceived as useful",
        "Can become an autonomous lead magnet",
      ],
    },
  },
  "osiris-scanner": {
    id: "osiris-scanner",
    score: 8.9,
    title: { fr: "OSIRIS Scanner", en: "OSIRIS Scanner" },
    category: { fr: "Audit web operationnel", en: "Operational web audit" },
    tagline: {
      fr: "Un wedge d'audit tres vendable pour ouvrir des mandats performance, securite et refonte.",
      en: "A highly sellable audit wedge to open performance, security, and redesign engagements.",
    },
    audience: {
      fr: "Entreprises avec site existant, agences, equipes marketing qui soupconnent des problemes sans savoir ou agir.",
      en: "Companies with an existing site, agencies, and marketing teams that suspect issues but lack clarity.",
    },
    whyNow: {
      fr: "Le besoin est clair, le ROI est lisible, et un scan peut servir d'entree vers audit, optimisation ou maintenance.",
      en: "The need is clear, the ROI is legible, and a scan opens the door to audits, optimization, or maintenance.",
    },
    testIntro: {
      fr: "Simulez un score OSIRIS pour comprendre comment un site est juge avant intervention.",
      en: "Simulate an OSIRIS score to see how a site is assessed before intervention.",
    },
    metricValue: "4",
    metricLabel: { fr: "axes lisibles", en: "clear axes" },
    technologies: ["Python", "Lighthouse", "Security headers", "Playwright"],
    decision: {
      fr: "A afficher comme produit d'appel diagnostic: facile a comprendre, tres utile en vente consultative.",
      en: "Show as a diagnostic entry product: easy to grasp, strong for consultative selling.",
    },
    bullets: {
      fr: [
        "Parle de performance, securite et trackers sans jargon inutile",
        "Transforme un site existant en opportunite commerciale",
        "Peut devenir un audit gratuit ou payant en front-end",
      ],
      en: [
        "Talks about performance, security, and trackers without useless jargon",
        "Turns an existing site into a commercial opportunity",
        "Can become a free or paid audit frontend",
      ],
    },
  },
  "one-click-report": {
    id: "one-click-report",
    score: 9.0,
    title: { fr: "One-Click Report AI", en: "One-Click Report AI" },
    category: { fr: "Rapports visuels IA", en: "AI visual reports" },
    tagline: {
      fr: "Le plus immediat pour vendre aux dirigeants: transformer des donnees brutes en rapport visuel exploitable en un clic.",
      en: "The most immediate product for executives: turn raw data into a usable visual report in one click.",
    },
    audience: {
      fr: "Directions, operations, consultants et agences qui doivent livrer des rapports clairs sans perdre des heures en mise en forme.",
      en: "Executives, operations teams, consultants, and agencies that need clear reports without losing hours to formatting.",
    },
    whyNow: {
      fr: "Le gain de temps est evident, la demo se comprend en secondes et la valeur percue est tres forte des le premier essai.",
      en: "The time savings are obvious, the demo is understandable in seconds, and the perceived value is strong on first use.",
    },
    testIntro: {
      fr: "Simulez la creation d'un rapport executive a partir d'un lot de donnees et voyez ce que le client recoit.",
      en: "Simulate the generation of an executive report from a data batch and see what the client receives.",
    },
    metricValue: "4",
    metricLabel: { fr: "formats d'entree", en: "input formats" },
    technologies: ["FastAPI", "Next.js", "PDF", "OCR"],
    decision: {
      fr: "A mettre devant SOIC en vitrine: beaucoup plus simple a vendre rapidement a des clients B2B.",
      en: "Place ahead of SOIC in the storefront: much easier to sell quickly to B2B buyers.",
    },
    bullets: {
      fr: [
        "Transforme des donnees brutes en livrable executive",
        "Demo simple a comprendre pour un prospect froid",
        "Peut devenir SaaS, service premium ou outil interne client",
      ],
      en: [
        "Turns raw data into an executive-ready deliverable",
        "Simple demo for cold prospects to understand",
        "Can become a SaaS, premium service, or client internal tool",
      ],
    },
  },
  "inbox-zero": {
    id: "inbox-zero",
    score: 8.7,
    title: { fr: "Inbox Zero AI", en: "Inbox Zero AI" },
    category: { fr: "Triage email intelligent", en: "Intelligent email triage" },
    tagline: {
      fr: "Une promesse tres concrete pour dirigeants et equipes surchargees: classer, prioriser et suggerer des reponses avant meme d'ouvrir la boite mail.",
      en: "A very concrete promise for overloaded teams: classify, prioritize, and draft responses before anyone opens the inbox.",
    },
    audience: {
      fr: "Dirigeants, consultants, support, ventes et operations qui vivent dans leur email toute la journee.",
      en: "Executives, consultants, support, sales, and ops teams living in email all day.",
    },
    whyNow: {
      fr: "La douleur est universelle, la demo est facile a comprendre et le gain de temps se vend sans effort.",
      en: "The pain is universal, the demo is easy to understand, and the time savings sell themselves.",
    },
    testIntro: {
      fr: "Simulez un flux de triage pour voir comment les emails sont classes et prepares pour action.",
      en: "Simulate a triage flow to see how emails are classified and prepared for action.",
    },
    metricValue: "5",
    metricLabel: { fr: "classes d'emails", en: "email classes" },
    technologies: ["Python", "LLM routing", "IMAP", "Dashboard"],
    decision: {
      fr: "Excellent candidat de deuxieme vague: probleme universel, discours simple, forte demo de productivite.",
      en: "Excellent second-wave candidate: universal pain point, simple pitch, strong productivity demo.",
    },
    bullets: {
      fr: [
        "Classe urgent, action, info, delegation et suppression",
        "Peut devenir dashboard interne ou service premium",
        "Ideal pour demos de productivite dirigeant-equipe",
      ],
      en: [
        "Classifies urgent, action, info, delegate, and delete",
        "Can become an internal dashboard or premium service",
        "Ideal for executive and team productivity demos",
      ],
    },
  },
  summeet: {
    id: "summeet",
    score: 8.5,
    title: { fr: "SumMeet", en: "SumMeet" },
    category: { fr: "Resume de reunions IA", en: "AI meeting summarizer" },
    tagline: {
      fr: "Transforme notes ou audio en compte rendu exploitable avec decisions, actions et prochaines etapes.",
      en: "Turns notes or audio into an actionable meeting summary with decisions, actions, and next steps.",
    },
    audience: {
      fr: "PME, equipes projet, consultants et operations qui perdent du temps a reconstruire les suivis de reunion.",
      en: "SMBs, project teams, consultants, and ops groups wasting time reconstructing meeting follow-ups.",
    },
    whyNow: {
      fr: "Le besoin est immediat, l'effet waouh est fort et la valeur est visible des le premier compte rendu.",
      en: "The need is immediate, the wow factor is strong, and the value is visible from the first summary.",
    },
    testIntro: {
      fr: "Entrez des infos de reunion pour simuler un resume structure, avec decisions et actions extraites.",
      en: "Enter meeting details to simulate a structured summary with extracted decisions and action items.",
    },
    metricValue: "3",
    metricLabel: { fr: "modes d'entree", en: "input modes" },
    technologies: ["Flask", "Whisper", "OpenAI", "SQLite"],
    decision: {
      fr: "A montrer en deuxieme vague: tres clair a comprendre, tres credible en productivite assistee par IA.",
      en: "Show in the second wave: very easy to understand and very credible as AI-assisted productivity.",
    },
    bullets: {
      fr: [
        "Passe de la reunion brute au suivi structure",
        "Compatible notes, audio et uploads",
        "Peut devenir outil interne ou portail client",
      ],
      en: [
        "Moves from raw meeting input to structured follow-up",
        "Supports notes, audio, and uploads",
        "Can become an internal tool or client portal",
      ],
    },
  },
  "financial-intelligence-suite": {
    id: "financial-intelligence-suite",
    score: 8.2,
    title: { fr: "Financial Intelligence Suite", en: "Financial Intelligence Suite" },
    category: { fr: "Dashboard financier executif", en: "Executive finance dashboard" },
    tagline: {
      fr: "Un cockpit financier premium pour dirigeants avec scores, actifs, tendances et signaux visuels.",
      en: "A premium financial cockpit for executives with scores, assets, trends, and visual signals.",
    },
    audience: {
      fr: "Cabinets, dirigeants, conseillers et equipes finance qui veulent un tableau de bord plus intelligible.",
      en: "Firms, executives, advisors, and finance teams who want a more legible decision dashboard.",
    },
    whyNow: {
      fr: "Tres fort visuellement et premium, mais a vendre avec un positionnement plus cible que les autres.",
      en: "Very strong visually and premium, but requires tighter positioning than the others.",
    },
    testIntro: {
      fr: "Ajustez quelques signaux de portefeuille pour simuler un cockpit financier executive simplifie.",
      en: "Adjust a few portfolio signals to simulate a simplified executive finance cockpit.",
    },
    metricValue: "6",
    metricLabel: { fr: "indicateurs visuels", en: "visual indicators" },
    technologies: ["React", "Vite", "Recharts", "Tailwind"],
    decision: {
      fr: "A garder comme produit premium de deuxieme ligne: tres beau et credible si la cible finance est precise.",
      en: "Keep as a premium second-line product: very compelling if the finance target is explicit.",
    },
    bullets: {
      fr: [
        "Excellent impact visuel pour demos haut de gamme",
        "Positionne Mark Systems sur des dashboards plus premium",
        "Moins universel que l'email ou les reunions, mais plus haut de gamme",
      ],
      en: [
        "Excellent visual impact for premium demos",
        "Positions Mark Systems on more premium dashboards",
        "Less universal than email or meetings, but more high-end",
      ],
    },
  },
};

export function getProductDemo(locale: ProductLocale, id: ProductDemoId) {
  const product = PRODUCT_DEMOS[id];
  return {
    ...product,
    title: product.title[locale],
    category: product.category[locale],
    tagline: product.tagline[locale],
    audience: product.audience[locale],
    whyNow: product.whyNow[locale],
    testIntro: product.testIntro[locale],
    metricLabel: product.metricLabel[locale],
    decision: product.decision[locale],
    bullets: product.bullets[locale],
  };
}
