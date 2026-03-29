import { getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Agile from "@/components/Agile";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getSiteUrl } from "@/lib/site-url";
import { homeJsonLdGraph } from "@/lib/seo-jsonld";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const base = getSiteUrl();
  const t = await getTranslations({ locale, namespace: "meta" });
  const jsonLd = homeJsonLdGraph({
    baseUrl: base,
    locale,
    siteDescription: t("description"),
  });

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Agile />
      <Contact />
      <Footer />
    </main>
  );
}
