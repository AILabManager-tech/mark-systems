import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="section-container text-center">
        <span className="mb-4 block font-mono text-8xl font-bold text-text-tertiary/30">
          {t("code")}
        </span>
        <h1 className="mb-4 text-h2 font-bold text-text-primary">
          {t("title")}
        </h1>
        <p className="mx-auto mb-8 max-w-md text-text-secondary">
          {t("description")}
        </p>
        <Button href="/" variant="secondary">
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Button>
      </div>
    </section>
  );
}
