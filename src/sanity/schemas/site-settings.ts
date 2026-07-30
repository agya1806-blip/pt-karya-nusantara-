import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Site Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "favicon", title: "Favicon", type: "image" }),
    defineField({
      name: "contact",
      title: "Contact Info",
      type: "object",
      fields: [
        { name: "phone", title: "Phone", type: "string" },
        { name: "email", title: "Email", type: "string" },
        { name: "address", title: "Address", type: "text" },
        { name: "mapsUrl", title: "Google Maps URL", type: "url" },
      ],
    }),
    defineField({
      name: "social",
      title: "Social Media",
      type: "object",
      fields: [
        { name: "instagram", title: "Instagram URL", type: "url" },
        { name: "linkedin", title: "LinkedIn URL", type: "url" },
      ],
    }),
    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "day", title: "Day", type: "string" },
          { name: "hours", title: "Hours", type: "string" },
        ],
      }],
    }),
  ],
});
