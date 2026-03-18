import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions legales",
};

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <article
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{
          __html: `<h1>Mentions legales</h1>
<h2>1. Identification de l'entreprise</h2>
<ul>
<li><strong>Denomination sociale</strong> : [Nom entreprise]</li>
<li><strong>Numero d'entreprise du Quebec (NEQ)</strong> : [NEQ]</li>
<li><strong>Adresse du siege</strong> : [Adresse]</li>
<li><strong>Telephone</strong> : [Telephone]</li>
<li><strong>Courriel</strong> : [courriel@example.com]</li>
</ul>
<h2>2. Hebergement</h2>
<p>Ce site est heberge par :</p>
<ul>
<li><strong>Hebergeur</strong> : Vercel Inc.</li>
<li><strong>Adresse</strong> : 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
</ul>
<h2>3. Responsable de la protection des renseignements personnels</h2>
<p>Conformement a la Loi 25 du Quebec (art. 3.1), le responsable de la protection</p>
<p>des renseignements personnels est :</p>
<ul>
<li><strong>Nom</strong> : [Nom du RPP]</li>
<li><strong>Titre</strong> : [Titre du RPP]</li>
<li><strong>Courriel</strong> : [courriel@example.com]</li>
</ul>
<h2>4. Propriete intellectuelle</h2>
<p>L'ensemble du contenu de ce site (textes, images, graphismes, logo, icones, etc.)</p>
<p>est la propriete de [Nom entreprise] ou de ses partenaires et est protege par</p>
<p>les lois applicables en matiere de propriete intellectuelle.</p>
<p>Toute reproduction, representation, modification ou exploitation non autorisee</p>
<p>est interdite.</p>
<h2>5. Limitation de responsabilite</h2>
<p>[Nom entreprise] s'efforce de fournir des informations exactes et a jour sur ce site.</p>
<p>Toutefois, nous ne pouvons garantir l'exactitude, la completude ou l'actualite</p>
<p>des informations presentees.</p>
<p>[Nom entreprise] ne peut etre tenu responsable des dommages directs ou indirects</p>
<p>resultant de l'utilisation de ce site.</p>
<h2>6. Liens externes</h2>
<p>Ce site peut contenir des liens vers des sites externes. [Nom entreprise] n'exerce</p>
<p>aucun controle sur ces sites et decline toute responsabilite quant a leur contenu.</p>
<h2>7. Droit applicable</h2>
<p>Les presentes mentions legales sont regies par les lois du Quebec et du Canada.</p>
<p>Tout litige relatif a l'utilisation de ce site sera soumis aux tribunaux competents</p>
<p>du district judiciaire de Quebec.</p>
<h2>8. Contact</h2>
<p>Pour toute question relative a ces mentions legales :</p>
<p><strong>[Nom entreprise]</strong></p>
<p>[Adresse]</p>
<p>[Telephone]</p>
<p>[courriel@example.com]</p>`,
        }}
      />
    </main>
  );
}
