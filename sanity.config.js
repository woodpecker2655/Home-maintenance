import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./sanity/schemas/index";
import deskStructure from "./sanity/deskStructure";

export default defineConfig({
  name: "default",
  title: "Home Maintenance CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "yourProjectId",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production",
  plugins: [
    deskTool({
      name: "studio",
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schemaTypes,
    // Optional: define templates to prefill references
    templates: (prev) => prev,
  },
});
