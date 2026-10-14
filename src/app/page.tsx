import type { Metadata } from "next";
import { homeContent } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { SplitHero } from "@/components/home/SplitHero";
import {
  CompanyStory,
  Differentiation,
  EucalyptusFeature,
  FeaturedProjects,
  FinalCta,
  PlannedFeature,
  RelationshipProcess,
  Specialties,
} from "@/components/home/HomeSections";

export const metadata: Metadata = {
  ...pageMetadata({ ...homeContent.meta, path: "/" }),
  title: { absolute: homeContent.meta.title },
};

export default function HomePage() {
  return (
    <>
      <SplitHero />
      <Specialties />
      <Differentiation />
      <PlannedFeature />
      <EucalyptusFeature />
      <CompanyStory />
      <FeaturedProjects />
      <RelationshipProcess />
      <FinalCta />
    </>
  );
}
