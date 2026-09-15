import type { Metadata } from "next";
import CVView from "@/components/CVView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vorlos.eu";
const title = "Petr Vorlíček · CV";
const description =
  "Životopis Petra Vorlíčka, fullstack vývojáře z Prahy — vzdělání, technologie a vybrané projekty.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cv" },
  openGraph: {
    type: "profile",
    url: `${siteUrl}/cv`,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function CVPage() {
  return <CVView />;
}
