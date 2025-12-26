export async function urlForImage(source) {
  try {
    const mod = await import("@sanity/image-url");
    const { default: imageUrlBuilder } = mod;
    const { getSanityClient } = await import("./sanityClient.js");
    const client = await getSanityClient();
    const builder = imageUrlBuilder(client);
    return builder.image(source).url();
  } catch (err) {
    return "";
  }
}