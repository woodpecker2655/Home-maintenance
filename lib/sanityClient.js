export async function getSanityClient() {
  try {
    const mod = await import("@sanity/client");
    const { createClient } = mod;
    const projectId =
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
      process.env.SANITY_PROJECT_ID ||
      "";
    const dataset =
      process.env.NEXT_PUBLIC_SANITY_DATASET ||
      process.env.SANITY_DATASET ||
      "production";
    const apiVersion =
      process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
      process.env.SANITY_API_VERSION ||
      "2024-10-01";
    return createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  } catch (err) {
    // Fallback client to avoid build-time errors when dependency/env is missing
    return {
      fetch: async () => [],
    };
  }
}
