import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "content", title: "Content", type: "text" }),
    defineField({ name: "avatar", title: "Avatar", type: "image" }),
    defineField({ name: "rating", title: "Rating", type: "number", options: { list: [1, 2, 3, 4, 5] } }),
  ],
});
