export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  const title = locale === "fr" ? "Mentions légales" : "Legal Notice";
  const description =
    locale === "fr"
      ? "Mentions légales du site Mark Systems"
      : "Legal notice for the Mark Systems website";
  return { title, description };
}

function MentionsFR() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Mentions légales</h1>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        1. Identification de l&apos;entreprise
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Dénomination sociale</strong> : Mark Systems
        </li>
        <li>
          <strong>Adresse</strong> : Longueuil, QC, Canada
        </li>
        <li>
          <strong>Courriel</strong> : marc@marksystems.ca
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        2. Responsable de la protection des renseignements personnels
      </h2>
      <p className="mb-4">
        Conformément à la Loi 25 du Québec (art. 3.1), le responsable de la
        protection des renseignements personnels est :
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Nom</strong> : Marc-André
        </li>
        <li>
          <strong>Courriel</strong> : marc@marksystems.ca
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Hébergement</h2>
      <p className="mb-2">Ce site est hébergé par :</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Hébergeur</strong> : Vercel Inc.
        </li>
        <li>
          <strong>Adresse</strong> : 340 S Lemon Ave #4133, Walnut, CA 91789,
          USA
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        4. Conditions d&apos;utilisation
      </h2>
      <p className="mb-4">
        L&apos;utilisation de ce site implique l&apos;acceptation pleine et
        entière des conditions générales d&apos;utilisation décrites ci-après.
        Ces conditions sont susceptibles d&apos;être modifiées à tout moment.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        5. Propriété intellectuelle
      </h2>
      <p className="mb-4">
        L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo,
        icônes, etc.) est la propriété de Mark Systems ou de ses partenaires et
        est protégé par les lois applicables en matière de propriété
        intellectuelle. Toute reproduction, représentation, modification ou
        exploitation non autorisée est interdite.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        6. Limitation de responsabilité
      </h2>
      <p className="mb-4">
        Mark Systems s&apos;efforce de fournir des informations exactes et à
        jour sur ce site. Toutefois, nous ne pouvons garantir l&apos;exactitude,
        la complétude ou l&apos;actualité des informations présentées. Mark
        Systems ne peut être tenu responsable des dommages directs ou indirects
        résultant de l&apos;utilisation de ce site.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. Liens externes</h2>
      <p className="mb-4">
        Ce site peut contenir des liens vers des sites externes. Mark Systems
        n&apos;exerce aucun contrôle sur ces sites et décline toute
        responsabilité quant à leur contenu.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        8. Droit applicable
      </h2>
      <p className="mb-4">
        Les présentes mentions légales sont régies par les lois du Québec et du
        Canada. Tout litige relatif à l&apos;utilisation de ce site sera soumis
        aux tribunaux compétents du district judiciaire de Longueuil.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">9. Contact</h2>
      <p className="mb-4">
        Pour toute question relative à ces mentions légales :
        <br />
        <strong>Mark Systems</strong>
        <br />
        Longueuil, QC, Canada
        <br />
        marc@marksystems.ca
      </p>
    </>
  );
}

function MentionsEN() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Legal Notice</h1>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        1. Company Identification
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Company name</strong>: Mark Systems
        </li>
        <li>
          <strong>Address</strong>: Longueuil, QC, Canada
        </li>
        <li>
          <strong>Email</strong>: marc@marksystems.ca
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        2. Person Responsible for the Protection of Personal Information
      </h2>
      <p className="mb-4">
        In accordance with Quebec&apos;s Law 25 (s. 3.1), the person responsible
        for the protection of personal information is:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Name</strong>: Marc-André
        </li>
        <li>
          <strong>Email</strong>: marc@marksystems.ca
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Hosting</h2>
      <p className="mb-2">This site is hosted by:</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Host</strong>: Vercel Inc.
        </li>
        <li>
          <strong>Address</strong>: 340 S Lemon Ave #4133, Walnut, CA 91789, USA
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Terms of Use</h2>
      <p className="mb-4">
        Use of this site implies full acceptance of the general terms and
        conditions described herein. These terms may be modified at any time.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        5. Intellectual Property
      </h2>
      <p className="mb-4">
        All content on this site (text, images, graphics, logo, icons, etc.) is
        the property of Mark Systems or its partners and is protected by
        applicable intellectual property laws. Any unauthorized reproduction,
        representation, modification, or exploitation is prohibited.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        6. Limitation of Liability
      </h2>
      <p className="mb-4">
        Mark Systems strives to provide accurate and up-to-date information on
        this site. However, we cannot guarantee the accuracy, completeness, or
        timeliness of the information presented. Mark Systems cannot be held
        liable for any direct or indirect damages resulting from the use of this
        site.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. External Links</h2>
      <p className="mb-4">
        This site may contain links to external sites. Mark Systems has no
        control over these sites and disclaims any responsibility for their
        content.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        8. Applicable Law
      </h2>
      <p className="mb-4">
        These legal notices are governed by the laws of Quebec and Canada. Any
        dispute relating to the use of this site shall be submitted to the
        competent courts of the judicial district of Longueuil.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">9. Contact</h2>
      <p className="mb-4">
        For any questions regarding these legal notices:
        <br />
        <strong>Mark Systems</strong>
        <br />
        Longueuil, QC, Canada
        <br />
        marc@marksystems.ca
      </p>
    </>
  );
}

export default async function MentionsLegalesPage(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <article className="prose prose-invert max-w-none">
          {locale === "fr" ? <MentionsFR /> : <MentionsEN />}
        </article>
      </div>
    </section>
  );
}
