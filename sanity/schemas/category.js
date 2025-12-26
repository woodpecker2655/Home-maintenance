export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() },
    {
      name: "combinations",
      title: "Available Combinations",
      description: "Select where this category is available (Location + Service Type pairs)",
      type: "array",
      of: [
        {
          type: "object",
          name: "combination",
          title: "Combination",
          fields: [
            {
              name: "location",
              title: "Location",
              type: "reference",
              to: [{ type: "location" }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "serviceType",
              title: "Service Type",
              type: "reference",
              to: [{ type: "serviceType" }],
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              location: "location.name",
              type: "serviceType.name",
            },
            prepare(selection) {
              const { location, type } = selection;
              return {
                title: `${location || '...'} + ${type || '...'}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        subtitle: "Multi-location Category",
      };
    },
  },
};
