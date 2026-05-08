export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() },
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
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { 
      name: "categories", 
      title: "Categories", 
      type: "array", 
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.required().min(1)
    },
    { name: "price", title: "Price", type: "number" },
    {
      name: "variants",
      title: "Sub Services / Variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            { name: "originalPrice", title: "Original Price", type: "number" },
            { name: "discountedPrice", title: "Discounted Price", type: "number" },
            { name: "description", title: "Short Description", type: "string" },
            { name: "rating", title: "Rating", type: "number", validation: Rule => Rule.min(0).max(5) }
          ]
        }
      ]
    },
    {
      name: "stats",
      title: "Service Stats",
      type: "object",
      fields: [
        { name: "rating", title: "Average Rating", type: "string", initialValue: "4.5/5" },
        { name: "startFrom", title: "Starting Price", type: "number" },
        { name: "doneOrders", title: "Orders Completed", type: "number" }
      ]
    }
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
};
