/*
 * Page schema helper. Route-level title, description, canonical, and social tags
 * are owned by shared RouteHead + server rendering to prevent duplicate SEO tags.
 */
const SITE_URL = "https://www.thelocalcaterer.com";

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  schema?: object | object[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  keywords?: string;
}

export default function SEO({ schema, breadcrumbs }: SEOProps) {
  const breadcrumbSchema = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          ...breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 2,
            name: crumb.name,
            item: `${SITE_URL}${crumb.url}`,
          })),
        ],
      }
    : undefined;

  const schemas = [
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ...(schema ? (Array.isArray(schema) ? schema : [schema]) : []),
  ];

  return (
    <>
      {schemas.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item).replace(/</g, "\\u003c")}
        </script>
      ))}
    </>
  );
}
