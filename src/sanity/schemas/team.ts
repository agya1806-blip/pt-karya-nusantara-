import { defineType, defineField } from "sanity";

export default defineType({
  name: "team",
  title: "Team Members",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
    defineField({ name: "image", title: "Photo", type: "image" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
});
