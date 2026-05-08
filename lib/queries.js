// GROQ query helpers filtered by location and type
import { getSanityClient } from "./sanityClient.js";

export async function fetchLocations() {
  const client = await getSanityClient();
  const query = '*[_type == "location"]{ "slug": slug.current, name, image, description } | order(name asc)';
  return client.fetch(query);
}

export async function fetchTypes() {
  const client = await getSanityClient();
  const query = '*[_type == "serviceType"]{ "slug": slug.current, name, description } | order(name asc)';
  return client.fetch(query);
}

export async function fetchCategoriesByLocationAndType(locationSlug, typeSlug) {
  const client = await getSanityClient();
  // Query where the combinations array contains an object with matching location and serviceType
  const query = `*[_type == "category" && count(combinations[location->slug.current == $locationSlug && serviceType->slug.current == $typeSlug]) > 0]{
    _id,
    name,
    "slug": slug.current,
    image,
    description
  } | order(name asc)`;
  return client.fetch(query, { locationSlug, typeSlug });
}

export async function fetchServicesByLocationAndType({ locationSlug, typeSlug, categorySlug }) {
  const client = await getSanityClient();
  // Find services that belong to the specified category
  // The location/type validation is implicitly handled by the category existence in those params
  const query = `*[_type == "service" && references(*[_type == "category" && slug.current == $categorySlug]._id)]{
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    "categories": categories[]->{name, "slug": slug.current}
  } | order(title asc)`;
  return client.fetch(query, { categorySlug });
}

export async function fetchServiceBySlugs({ locationSlug, typeSlug, categorySlug, serviceSlug }) {
  const client = await getSanityClient();
  // Fetch service by slug and ensure it belongs to the specified category
  const query = `*[_type == "service" && slug.current == $serviceSlug && references(*[_type == "category" && slug.current == $categorySlug]._id)][0]{
    _id,
    title,
    description,
    image,
    price,
    stats,
    variants[]{
      title,
      image,
      originalPrice,
      discountedPrice,
      description,
      rating
    },
    "categories": categories[]->{name, "slug": slug.current}
  }`;
  return client.fetch(query, { categorySlug, serviceSlug });
}

// Static params helpers for build-time
export async function getLocationParams() {
  const locs = await fetchLocations();
  return locs.map((l) => ({ location: l.slug }));
}

export async function getTypeParams() {
  const client = await getSanityClient();
  // Fetch combinations for each category
  const query = `*[_type == "category"]{ "combinations": combinations[]{ "location": location->slug.current, "type": serviceType->slug.current } }`;
  const rows = await client.fetch(query);
  
  const seen = new Set();
  const params = [];
  
  for (const r of rows) {
    const combos = r.combinations || [];
    
    for (const combo of combos) {
      if (combo.location && combo.type) {
        const key = `${combo.location}|${combo.type}`;
        if (!seen.has(key)) {
          seen.add(key);
          params.push({ location: combo.location, type: combo.type });
        }
      }
    }
  }
  return params;
}

export async function getCategoryParams() {
  const client = await getSanityClient();
  const query = `*[_type == "category"]{ "combinations": combinations[]{ "location": location->slug.current, "type": serviceType->slug.current }, "category": slug.current }`;
  const rows = await client.fetch(query);
  
  const params = [];
  for (const r of rows) {
    const combos = r.combinations || [];
    
    for (const combo of combos) {
      if (combo.location && combo.type && r.category) {
        params.push({ location: combo.location, type: combo.type, category: r.category });
      }
    }
  }
  return params;
}

export async function getServiceParams() {
  const client = await getSanityClient();
  // Get all services with their categories and those categories' combinations
  const query = `*[_type == "service"]{
    "service": slug.current,
    "categories": categories[]->{
      "category": slug.current,
      "combinations": combinations[]{
        "location": location->slug.current,
        "type": serviceType->slug.current
      }
    }
  }`;
  const services = await client.fetch(query);
  
  const params = [];
  for (const s of services) {
    if (!s.categories) continue;
    for (const cat of s.categories) {
      if (!cat.combinations) continue;
      for (const combo of cat.combinations) {
        if (combo.location && combo.type && cat.category && s.service) {
          params.push({
            location: combo.location,
            type: combo.type,
            category: cat.category,
            service: s.service
          });
        }
      }
    }
  }
  return params;
}
