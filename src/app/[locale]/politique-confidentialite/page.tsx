import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialite",
};

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <article
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{
          __html: `<h1>Politique de confidentialite</h1>
<p><strong>Derniere mise a jour : 2026-03-08</strong></p>
<h2>1. Introduction</h2>
<p>[Nom entreprise] (ci-apres "nous") s'engage a proteger les renseignements personnels</p>
<p>de ses utilisateurs conformement a la <strong>Loi 25 du Quebec</strong> (Loi modernisant des dispositions</p>
<p>legislatives en matiere de protection des renseignements personnels).</p>
<p>Cette politique explique quels renseignements nous collectons, pourquoi nous les collectons,</p>
<p>comment nous les utilisons, et quels sont vos droits.</p>
<h2>2. Responsable de la protection des renseignements personnels (RPP)</h2>
<p>Le responsable de la protection des renseignements personnels est :</p>
<ul>
<li><strong>Nom</strong> : [Nom du RPP]</li>
<li><strong>Titre</strong> : [Titre du RPP]</li>
<li><strong>Courriel</strong> : [courriel@example.com]</li>
</ul>
<p>Pour toute question relative a la protection de vos renseignements personnels,</p>
<p>vous pouvez communiquer avec le RPP a l'adresse ci-dessus.</p>
<h2>3. Renseignements personnels collectes</h2>
<p>Dans le cadre de nos activites, nous pouvons collecter les types de renseignements</p>
<p>personnels suivants :</p>
<ul>
<li>Nom, prenom, courriel</li>
<li>Adresse IP</li>
<li>Donnees de navigation</li>
</ul>
<h2>4. Finalites de la collecte</h2>
<p>Nous collectons vos renseignements personnels aux fins suivantes :</p>
<ul>
<li>Fournir nos services</li>
<li>Ameliorer l'experience utilisateur</li>
<li>Communications marketing (avec consentement)</li>
</ul>
<p>Conformement a l'article 4 de la Loi 25, nous ne collectons que les renseignements</p>
<p>necessaires aux finalites declarees ci-dessus.</p>
<h2>5. Consentement</h2>
<p>Conformement a l'article 8.1 de la Loi 25, nous obtenons votre consentement</p>
<p>manifeste, libre et eclaire avant de collecter vos renseignements personnels.</p>
<ul>
<li>Les temoins (cookies) non essentiels ne sont actives qu'apres votre consentement explicite.</li>
<li>Vous pouvez modifier vos preferences a tout moment via le lien "Gestion des temoins"</li>
</ul>
<p>en bas de chaque page.</p>
<h2>6. Duree de conservation</h2>
<p>Vos renseignements personnels sont conserves pendant : <strong>24 mois apres la derniere interaction</strong></p>
<p>Apres cette periode, ils sont detruits de maniere securisee conformement</p>
<p>a l'article 23 de la Loi 25.</p>
<h2>7. Vos droits</h2>
<p>En vertu de la Loi 25, vous avez le droit de :</p>
<ul>
<li><strong>Acceder</strong> a vos renseignements personnels que nous detenons</li>
<li><strong>Rectifier</strong> vos renseignements s'ils sont inexacts ou incomplets</li>
<li><strong>Demander la suppression</strong> de vos renseignements lorsque la finalite est atteinte</li>
<li><strong>Retirer votre consentement</strong> a tout moment</li>
<li><strong>Porter plainte</strong> aupres de la Commission d'acces a l'information du Quebec (CAI)</li>
</ul>
<h3>Comment exercer vos droits</h3>
<p>Pour exercer l'un de ces droits, veuillez communiquer avec notre RPP :</p>
<ul>
<li><strong>Courriel</strong> : [courriel@example.com]</li>
<li><strong>Adresse</strong> : [Adresse]</li>
</ul>
<p>Nous repondrons a votre demande dans un delai de 30 jours.</p>
<h2>8. Services tiers</h2>
<p>Nous utilisons les services tiers suivants qui peuvent avoir acces a vos</p>
<p>renseignements personnels :</p>
<ul>
<li>Google Analytics (analytique)</li>
<li>Vercel (hebergement)</li>
</ul>
<p>Chaque service tiers a sa propre politique de confidentialite. Nous vous</p>
<p>encourageons a les consulter.</p>
<h2>9. Transfert hors Quebec</h2>
<p>Certaines donnees peuvent etre traitees par des services heberges hors du Quebec (ex : Vercel, Google). Nous nous assurons que ces transferts respectent les exigences de la Loi 25.</p>
<h2>10. Temoins (cookies)</h2>
<p>Notre site utilise les categories de temoins suivantes :</p>
<ul>
<li><strong>Essentiels</strong> : Necessaires au fonctionnement du site. Toujours actifs.</li>
<li><strong>Analytiques</strong> : Nous aident a comprendre l'utilisation du site (ex : Google Analytics).</li>
</ul>
<p>Actives uniquement avec votre consentement.</p>
<ul>
<li><strong>Marketing</strong> : Utilises pour des publicites ciblees. Actives uniquement avec votre</li>
</ul>
<p>consentement.</p>
<p>Par defaut, seuls les temoins essentiels sont actifs (confidentialite maximale),</p>
<p>conformement a l'article 8.1 de la Loi 25.</p>
<h2>11. Securite</h2>
<p>Nous mettons en place des mesures de securite raisonnables pour proteger vos</p>
<p>renseignements personnels, conformement a l'article 3.3 de la Loi 25, notamment :</p>
<ul>
<li>Chiffrement HTTPS (TLS) pour toutes les communications</li>
<li>Headers de securite HTTP complets</li>
<li>Aucune cle API exposee cote client</li>
</ul>
<h2>12. Incident de confidentialite</h2>
<p>En cas d'incident de confidentialite presentant un risque de prejudice serieux,</p>
<p>nous nous engageons a :</p>
<p>1. Aviser la Commission d'acces a l'information du Quebec (CAI)</p>
<p>2. Aviser les personnes concernees</p>
<p>3. Tenir un registre des incidents</p>
<p><strong>Courriel de notification d'incident</strong> : [courriel@example.com]</p>
<h2>13. Modifications</h2>
<p>Nous pouvons modifier cette politique a tout moment. La date de derniere mise a jour</p>
<p>est indiquee en haut de cette page. Nous vous encourageons a la consulter regulierement.</p>
<h2>14. Contact</h2>
<p>Pour toute question, veuillez communiquer avec :</p>
<p><strong>[Nom entreprise]</strong></p>
<p>[Adresse]</p>
<p>[Telephone]</p>
<p>[courriel@example.com]</p>
<p>RPP : [Nom du RPP] — [courriel@example.com]</p>`,
        }}
      />
    </main>
  );
}
