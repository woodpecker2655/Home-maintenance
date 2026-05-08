export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    {
      name: "description",
      title: "Detailed Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
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
