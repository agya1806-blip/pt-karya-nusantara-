import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "backgroundImage", title: "Background Image", type: "image" }),
    defineField({
      name: "ctaButtons",
      title: "CTA Buttons",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", title: "Label", type: "string" },
          { name: "href", title: "Link", type: "string" },
          { name: "variant", title: "Variant", type: "string", options: { list: ["primary", "outline"] } },
        ],
      }],
    }),
  ],
});
