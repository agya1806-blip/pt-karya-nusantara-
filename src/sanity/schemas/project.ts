import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Portfolio Projects",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image" }),
    defineField({ name: "images", title: "Gallery Images", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "featured", title: "Featured on Homepage", type: "boolean" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
