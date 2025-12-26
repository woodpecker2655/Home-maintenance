import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./sanity/schemas/index";
import deskStructure from "./sanity/deskStructure";

// Read env with client/server-friendly fallbacks
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  "yourProjectId";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  "production";

export default defineConfig({
  name: "default",
  title: "Home Maintenance CMS",
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schemaTypes,
    // Optional: define templates to prefill references
    templates: (prev) => prev,
  },
});
