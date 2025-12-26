import Image from "next/image";
import { fetchServiceBySlugs, getServiceParams } from "../../../../../lib/queries.js";
import { urlForImage } from "../../../../../lib/image.js";

export const dynamic = "force-static";

export async function generateStaticParams() {
  // Generate all location/type/category/service quadruples
  return getServiceParams();
}

export default async function ServicePage({ params }) {
  const { location, type, category, service } = params;
  const data = await fetchServiceBySlugs({ locationSlug: location, typeSlug: type, categorySlug: category, serviceSlug: service });

  const imgUrl = data?.image ? await urlForImage(data.image) : "";

  return (
    <main className="pt-28 max-w-4xl mx-auto px-4 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{data?.title || service}</h1>
        <p className="text-gray-600">
          {type} • {category} • {location}
        </p>
      </div>

      {imgUrl ? (
        <div className="relative aspect-video w-full overflow-hidden rounded">
          <Image src={imgUrl} alt={data?.title || "Service image"} fill className="object-cover" />
        </div>
      ) : null}

      {data?.description ? (
        <div className="prose max-w-none">
          <p>{data.description}</p>
        </div>
      ) : (
        <p className="text-gray-500">No description available.</p>
      )}
    </main>
  );
}