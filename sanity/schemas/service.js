export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() },
    { name: "description", title: "Description", type: "text" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "location", title: "Location", type: "reference", to: [{ type: "location" }], validation: (Rule) => Rule.required() },
    { name: "serviceType", title: "Service Type", type: "reference", to: [{ type: "serviceType" }], validation: (Rule) => Rule.required() },
    { name: "category", title: "Category", type: "reference", to: [{ type: "category" }], validation: (Rule) => Rule.required() },
    { name: "price", title: "Price", type: "number" },
  ],
  preview: {
    select: { title: "title", media: "image", subtitle: "category.name" },
  },
};