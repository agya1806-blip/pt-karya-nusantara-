import type { JsonLd } from "@/types";

interface JsonLdProps {
  data: JsonLd;
  id?: string;
}

export function JsonLdScript({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
