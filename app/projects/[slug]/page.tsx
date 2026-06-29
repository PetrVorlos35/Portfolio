import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/content/caseStudies";
import CaseStudyView from "@/components/CaseStudyView";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return {};

  const { title, tagline } = study.en;
  const fullTitle = `${title} · Case study · Petr Vorlíček`;
  return {
    title: fullTitle,
    description: tagline,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${slug}`,
      title: fullTitle,
      description: tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: tagline,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!caseStudies[slug]) notFound();
  return <CaseStudyView slug={slug} />;
}
