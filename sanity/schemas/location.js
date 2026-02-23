export default {
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    },
    {
      name: "image",
      title: "Icon/Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current", media: "image" },
  },
};
