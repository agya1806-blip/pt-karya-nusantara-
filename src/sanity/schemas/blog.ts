import { defineType, defineField } from "sanity";

export default defineType({
  name: "blog",
  title: "Blog Posts",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({ name: "content", title: "Content", type: "blockContent" }),
    defineField({ name: "image", title: "Cover Image", type: "image" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "author", title: "Author", type: "string" }),
  ],
});
