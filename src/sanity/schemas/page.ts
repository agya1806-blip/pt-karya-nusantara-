import { defineType, defineField } from "sanity";

export default defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text" }),
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      of: [
        { name: "heroRef", type: "reference", to: [{ type: "hero" }] },
        { name: "serviceRef", type: "reference", to: [{ type: "service" }] },
        { name: "projectRef", type: "reference", to: [{ type: "project" }] },
      ],
    }),
  ],
});
