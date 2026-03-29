export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  const title =
    locale === "fr" ? "Politique de confidentialité" : "Privacy Policy";
  const description =
    locale === "fr"
      ? "Politique de confidentialité de Mark Systems — Loi 25 du Québec"
      : "Mark Systems Privacy Policy — Quebec Law 25";
  return { title, description };
}

function PrivacyFR() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Politique de confidentialité</h1>
      <p className="text-sm text-txt-secondary mb-8">
        Dernière mise à jour : 2026-03-25
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Introduction</h2>
      <p className="mb-4">
        Mark Systems (ci-après « nous ») s&apos;engage à protéger les
        renseignements personnels de ses utilisateurs conformément à la{" "}
        <strong>Loi 25 du Québec</strong> (Loi modernisant des dispositions
        législatives en matière de protection des renseignements personnels).
        Cette politique explique quels renseignements nous collectons, pourquoi
        nous les collectons, comment nous les utilisons, et quels sont vos
        droits.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        2. Responsable de la protection des renseignements personnels (RPP)
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Nom</strong> : Marc-André
        </li>
        <li>
          <strong>Titre</strong> : Responsable de la protection des
          renseignements personnels
        </li>
        <li>
          <strong>Courriel</strong> : marc@marksystems.ca
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        3. Renseignements personnels collectés
      </h2>
      <p className="mb-2">
        Dans le cadre de nos activités, nous collectons les renseignements
        suivants :
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Nom</li>
        <li>Courriel</li>
        <li>Téléphone</li>
        <li>Données de navigation (adresse IP, pages visitées, durée)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        4. Finalités de la collecte
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Formulaire de contact</strong> : répondre à vos demandes
        </li>
        <li>
          <strong>Analytics</strong> : améliorer l&apos;expérience utilisateur et
          les performances du site
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        5. Durée de conservation
      </h2>
      <p className="mb-4">
        Vos renseignements personnels sont conservés pendant{" "}
        <strong>12 mois</strong> après la dernière interaction. Après cette
        période, ils sont détruits de manière sécurisée conformément à
        l&apos;article 23 de la Loi 25.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Services tiers</h2>
      <p className="mb-2">
        Nous utilisons les services tiers suivants qui peuvent avoir accès à vos
        renseignements :
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Vercel</strong> — hébergement et analytics
        </li>
        <li>
          <strong>Formspree</strong> — traitement des formulaires de contact
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        7. Transfert hors Québec
      </h2>
      <p className="mb-4">
        Certaines données peuvent être traitées aux{" "}
        <strong>États-Unis</strong> par Vercel et Formspree. Nous nous assurons
        que ces transferts respectent les exigences de la Loi 25.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">8. Vos droits</h2>
      <p className="mb-2">En vertu de la Loi 25, vous avez le droit de :</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Accéder</strong> à vos renseignements personnels
        </li>
        <li>
          <strong>Rectifier</strong> vos renseignements s&apos;ils sont inexacts
        </li>
        <li>
          <strong>Demander la suppression</strong> de vos renseignements
        </li>
        <li>
          <strong>Retirer votre consentement</strong> à tout moment
        </li>
        <li>
          <strong>Porter plainte</strong> auprès de la Commission d&apos;accès à
          l&apos;information du Québec (CAI)
        </li>
      </ul>
      <p className="mb-4">
        Pour exercer vos droits, contactez notre RPP à marc@marksystems.ca.
        Nous répondrons dans un délai de 30 jours.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        9. Gestion des témoins (cookies)
      </h2>
      <p className="mb-4">
        Par défaut, seuls les témoins essentiels sont actifs. Les témoins
        analytiques ne sont activés qu&apos;après votre consentement explicite
        via la bannière de cookies. Vous pouvez modifier vos préférences à tout
        moment.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        10. Incident de confidentialité
      </h2>
      <p className="mb-4">
        En cas d&apos;incident présentant un risque de préjudice sérieux, nous
        nous engageons à : (1) aviser la Commission d&apos;accès à
        l&apos;information du Québec, (2) aviser les personnes concernées,
        (3) tenir un registre des incidents. Courriel de notification :
        marc@marksystems.ca.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">11. Contact</h2>
      <p className="mb-4">
        Pour toute question relative à cette politique :
        <br />
        <strong>Mark Systems</strong>
        <br />
        Longueuil, QC, Canada
        <br />
        marc@marksystems.ca
        <br />
        RPP : Marc-André — marc@marksystems.ca
      </p>
    </>
  );
}

function PrivacyEN() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-txt-secondary mb-8">
        Last updated: 2026-03-25
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Introduction</h2>
      <p className="mb-4">
        Mark Systems (&quot;we&quot;) is committed to protecting the personal
        information of its users in accordance with{" "}
        <strong>Quebec&apos;s Law 25</strong> (Act to modernize legislative
        provisions as regards the protection of personal information). This
        policy explains what information we collect, why we collect it, how we
        use it, and what your rights are.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        2. Person Responsible for the Protection of Personal Information
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Name</strong>: Marc-André
        </li>
        <li>
          <strong>Title</strong>: Person Responsible for the Protection of
          Personal Information
        </li>
        <li>
          <strong>Email</strong>: marc@marksystems.ca
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        3. Personal Information Collected
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Name</li>
        <li>Email</li>
        <li>Phone number</li>
        <li>Browsing data (IP address, pages visited, duration)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        4. Purposes of Collection
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Contact form</strong>: to respond to your inquiries
        </li>
        <li>
          <strong>Analytics</strong>: to improve user experience and site
          performance
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        5. Retention Period
      </h2>
      <p className="mb-4">
        Your personal information is retained for <strong>12 months</strong>{" "}
        after the last interaction. After this period, it is securely destroyed
        in accordance with section 23 of Law 25.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        6. Third-Party Services
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Vercel</strong> — hosting and analytics
        </li>
        <li>
          <strong>Formspree</strong> — contact form processing
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        7. Transfer Outside Quebec
      </h2>
      <p className="mb-4">
        Some data may be processed in the <strong>United States</strong> by
        Vercel and Formspree. We ensure these transfers comply with Law 25
        requirements.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">8. Your Rights</h2>
      <p className="mb-2">Under Law 25, you have the right to:</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Access</strong> your personal information
        </li>
        <li>
          <strong>Rectify</strong> inaccurate information
        </li>
        <li>
          <strong>Request deletion</strong> of your information
        </li>
        <li>
          <strong>Withdraw consent</strong> at any time
        </li>
        <li>
          <strong>File a complaint</strong> with the Commission d&apos;accès à
          l&apos;information du Québec (CAI)
        </li>
      </ul>
      <p className="mb-4">
        To exercise your rights, contact our RPP at marc@marksystems.ca. We
        will respond within 30 days.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        9. Cookie Management
      </h2>
      <p className="mb-4">
        By default, only essential cookies are active. Analytics cookies are
        only enabled after your explicit consent via the cookie banner. You can
        change your preferences at any time.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        10. Privacy Incident Process
      </h2>
      <p className="mb-4">
        In the event of a privacy incident presenting a risk of serious harm, we
        commit to: (1) notifying the Commission d&apos;accès à
        l&apos;information du Québec, (2) notifying affected individuals,
        (3) maintaining an incident register. Notification email:
        marc@marksystems.ca.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">11. Contact</h2>
      <p className="mb-4">
        For any questions regarding this policy:
        <br />
        <strong>Mark Systems</strong>
        <br />
        Longueuil, QC, Canada
        <br />
        marc@marksystems.ca
        <br />
        RPP: Marc-André — marc@marksystems.ca
      </p>
    </>
  );
}

export default async function PolitiqueConfidentialitePage(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <article className="prose prose-invert max-w-none">
          {locale === "fr" ? <PrivacyFR /> : <PrivacyEN />}
        </article>
      </div>
    </section>
  );
}
