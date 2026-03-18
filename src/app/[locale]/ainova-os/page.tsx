import { redirect } from "next/navigation";

export default function AinovaOsRedirect({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}/systems`);
}
