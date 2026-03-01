import type { BriefOutput } from "./brief-types";

export async function generateBriefPdf(brief: BriefOutput, locale: string): Promise<void> {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const fr = locale === "fr";

  let y = 20;

  function heading(text: string) {
    doc.setFontSize(14);
    doc.setTextColor(0, 161, 155);
    doc.text(text, 20, y);
    y += 8;
    doc.setDrawColor(0, 161, 155);
    doc.line(20, y, 190, y);
    y += 6;
  }

  function field(label: string, value: string | null | undefined) {
    if (!value) return;
    checkPage();
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(label, 20, y);
    doc.setTextColor(40);
    doc.text(String(value), 75, y);
    y += 6;
  }

  function fieldList(label: string, items: string[]) {
    if (!items.length) return;
    field(label, items.join(", "));
  }

  function checkPage() {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  }

  // Title
  doc.setFontSize(20);
  doc.setTextColor(0, 161, 155);
  doc.text("NEXOS — Brief Client", 20, y);
  y += 8;
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(`Mark Systems | ${new Date().toLocaleDateString(locale)}`, 20, y);
  y += 14;

  // Company
  heading(fr ? "Entreprise" : "Company");
  field(fr ? "Nom" : "Name", brief.client.name);
  field("Slug", brief.client.slug);
  field(fr ? "Courriel" : "Email", brief.company.email);
  field(fr ? "Telephone" : "Phone", brief.company.phone);
  field(fr ? "Adresse" : "Address", brief.company.address);
  field("NEQ", brief.company.neq);
  y += 4;

  // Site
  checkPage();
  heading(fr ? "Configuration du site" : "Site Configuration");
  field("Type", brief.site.type);
  fieldList("Pages", brief.site.pages);
  fieldList(fr ? "Langues" : "Languages", brief.site.languages);
  fieldList("Features", brief.site.features);
  field(fr ? "Hebergement" : "Hosting", brief.site.hosting);
  field(fr ? "Domaine" : "Domain", brief.site.domain);
  y += 4;

  // Legal
  checkPage();
  heading(fr ? "Conformite Loi 25" : "Law 25 Compliance");
  const legal = brief.legal as Record<string, unknown>;
  const rpp = legal.rpp as Record<string, string> | undefined;
  if (rpp) {
    field("RPP", `${rpp.name} <${rpp.email}>`);
    field(fr ? "Titre" : "Title", rpp.title);
  }
  fieldList(fr ? "Donnees" : "Data", (legal.data_collected as string[]) || []);
  fieldList(fr ? "Finalites" : "Purposes", (legal.purposes as string[]) || []);
  field(fr ? "Retention" : "Retention", legal.retention as string);
  field(fr ? "Transfert hors QC" : "Transfer outside QC",
    (legal.transfer_outside_qc as boolean) ? (fr ? "Oui" : "Yes") : "Non");
  field(fr ? "Consentement" : "Consent", legal.consent_mode as string);
  y += 4;

  // Design
  checkPage();
  heading("Design");
  field(fr ? "Style" : "Style", brief.design.style);
  field(fr ? "Palette" : "Palette", brief.design.palette);
  field(fr ? "Typographie" : "Typography", brief.design.typography);
  field("Logo", brief.design.logo_provided ? (fr ? "Fourni" : "Provided") : "Non");
  y += 4;

  // SEO
  checkPage();
  heading(fr ? "Contexte & SEO" : "Context & SEO");
  fieldList(fr ? "Concurrents" : "Competitors", brief.context.competitors);
  fieldList(fr ? "Mots-cles SEO" : "SEO Keywords", brief.context.keywords_seo);
  field(fr ? "Notes" : "Notes", brief.context.free_text);

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(180);
    doc.text("Mark Systems — marksystems.ca", 20, 290);
    doc.text(`${i}/${pageCount}`, 185, 290);
  }

  doc.save(`brief-${brief.client.slug}.pdf`);
}
