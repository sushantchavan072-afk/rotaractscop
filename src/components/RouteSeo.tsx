import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface RouteMetadata {
  title: string;
  description: string;
  keywords: string;
}

const SITE_NAME = "Rotaract Club of SCOP";
const DEFAULT_DESCRIPTION = "Rotaract Club of Sinhgad College of Pharmacy — a youth-led community creating meaningful service, leadership, fellowship, and professional development opportunities in Pune.";

const metadata: Record<string, RouteMetadata> = {
  "/": {
    title: "Rotaract Club of SCOP | Youth Leadership & Community Service",
    description: "Discover Rotaract Club of Sinhgad College of Pharmacy: young leaders building community impact through service, fellowship, and professional development in Pune.",
    keywords: "Rotaract SCOP, Rotaract Club of Sinhgad College of Pharmacy, youth leadership Pune, community service Pune",
  },
  "/about": {
    title: "About Us | Rotaract Club of SCOP",
    description: "Learn about the values, theme, district, leaders, and purpose behind Rotaract Club of Sinhgad College of Pharmacy.",
    keywords: "about Rotaract SCOP, Rotaract District 3131, Rotary International, REIGN theme",
  },
  "/events": {
    title: "Events | Rotaract Club of SCOP",
    description: "Explore upcoming events, creative experiences, service activities, and community initiatives by Rotaract Club of SCOP.",
    keywords: "Rotaract SCOP events, Pune youth events, community service events, Paintscape, Brandscape",
  },
  "/members": {
    title: "Our Members | Rotaract Club of SCOP",
    description: "Meet the members and leaders of Rotaract Club of SCOP who bring service, fellowship, and purposeful action to life.",
    keywords: "Rotaract SCOP members, Rotaract leadership, student leaders Pune, Rotaract team",
  },
  "/avenue": {
    title: "Avenues of Service | Rotaract Club of SCOP",
    description: "Explore the seven avenues through which Rotaract Club of SCOP develops people, strengthens communities, and creates lasting impact.",
    keywords: "Rotaract avenues of service, professional development, community service, DEI, international service",
  },
  "/info": {
    title: "Club Information | Rotaract Club of SCOP",
    description: "Find club details, contact information, joining guidance, and frequently asked questions for Rotaract Club of SCOP.",
    keywords: "Rotaract SCOP contact, club ID 8826281, Rotaract District 3131, join Rotaract",
  },
  "/contact": {
    title: "Contact Us | Rotaract Club of SCOP",
    description: "Contact Rotaract Club of SCOP about membership, sponsorship, event partnerships, or general enquiries.",
    keywords: "contact Rotaract SCOP, Rotaract enquiry, Rotaract sponsorship contact, join Rotaract Pune",
  },
  "/join": {
    title: "Join Rotaract | Rotaract Club of SCOP",
    description: "Take the first step toward youth leadership, service, fellowship, and professional growth by joining Rotaract Club of SCOP.",
    keywords: "join Rotaract Pune, Rotaract membership, student leadership, Rotaract SCOP application",
  },
  "/sponsorship": {
    title: "Partner With Us | Rotaract Club of SCOP",
    description: "Explore partnership pathways that help Rotaract Club of SCOP support young leaders and create meaningful community impact.",
    keywords: "Rotaract sponsorship, sponsor youth leadership Pune, community partnership, Rotaract SCOP partners",
  },
  "/bod-application": {
    title: "Membership Application | Rotaract Club of SCOP",
    description: "Apply to take an active leadership role in Rotaract Club of SCOP and contribute to a year of service, learning, and impact.",
    keywords: "Rotaract board application, Rotaract leadership application, SCOP membership application",
  },
};

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
};

const RouteSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = metadata[pathname] ?? {
      title: `Page Not Found | ${SITE_NAME}`,
      description: DEFAULT_DESCRIPTION,
      keywords: "Rotaract Club of SCOP, Rotaract District 3131",
    };
    const canonicalUrl = new URL(pathname, window.location.origin).toString();
    const imageUrl = new URL("/src/assets/logo.png", window.location.origin).toString();

    document.title = page.title;
    upsertMeta("name", "description", page.description);
    upsertMeta("name", "keywords", page.keywords);
    upsertMeta("name", "author", SITE_NAME);
    upsertMeta("property", "og:title", page.title);
    upsertMeta("property", "og:description", page.description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", page.title);
    upsertMeta("name", "twitter:description", page.description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertLink("canonical", canonicalUrl);

    const structuredDataId = "rotaract-route-structured-data";
    let structuredData = document.getElementById(structuredDataId) as HTMLScriptElement | null;
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = structuredDataId;
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      url: new URL("/", window.location.origin).toString(),
      logo: imageUrl,
      areaServed: "Pune, Maharashtra, India",
      memberOf: {
        "@type": "Organization",
        name: "Rotaract District 3131",
      },
    });
  }, [pathname]);

  return null;
};

export default RouteSeo;
