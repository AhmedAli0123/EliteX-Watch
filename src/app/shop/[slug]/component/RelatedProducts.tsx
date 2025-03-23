"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { FetchWatch } from "../../../../../types/watches";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface RelatedProductsProps {
  category: string;
  currentSlug: string;
}

const RelatedProducts = ({ category, currentSlug }: RelatedProductsProps) => {
  const [relatedWatches, setRelatedWatches] = useState<FetchWatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const query = `*[_type == "watch" && category == $category && slug.current != $currentSlug]{
        _id, name, price, originalPrice, "image": image.asset->url, "slug": slug.current
      }`;

      const data: FetchWatch[] = await client.fetch(query, { category, currentSlug });

      setRelatedWatches(data);
      setLoading(false);
    };

    fetchRelatedProducts();
  }, [category, currentSlug]);

  if (loading) {
    return <Skeleton className="w-full h-60 my-10" />;
  }

  if (relatedWatches.length === 0) {
    return <p className="text-center text-lg text-gray-600">No related products found.</p>;
  }

  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-900 min-h-screen my-14">
    <h2 className="text-3xl font-bold text-center mb-6">
      Relat<span className="text-blue-600 dark:text-blue-400">ed Watches</span>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto px-4">
      {relatedWatches.map((watch) => (
        <HoverableCard key={watch._id} watch={watch} />
      ))}
    </div>
  </section>
);
};

interface HoverableCardProps {
watch: FetchWatch;
}

const HoverableCard: React.FC<HoverableCardProps> = ({ watch }) => {
const [hovered, setHovered] = useState(false);
//Navigating Function Navigate to the Dynamic Route
const router =useRouter()
function handleNavigate(slug: string) {
  router.push(`/shop/${slug}`);
}


return (
  <Card
    className="shadow-lg rounded-lg overflow-hidden relative cursor-pointer"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
  >
    <CardContent className="p-4 relative">
      <div className="relative w-full h-60">
        <Image
          src={watch.image}
          alt={watch.name}
            loading="lazy"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h3 className="text-lg font-semibold mt-4 text-gray-900 dark:text-white">
        {watch.name}
      </h3>
      <div className="flex gap-5 mt-4">
        <p className="text-gray-600 dark:text-gray-300">PKR {watch.price}</p>
        <p className="text-red-600 line-through">PKR {watch.originalPrice}</p>
      </div>
      {hovered && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white gap-2 transition-opacity duration-300">
          <Button className="bg-white text-black">Add to Cart</Button>
          
          <Button variant="outline" className="bg-white text-black"
          onClick={()=> handleNavigate(watch.slug)}
          >
            View Details
          </Button>
        </div>
      )}
    </CardContent>
  </Card>
);
};

export default RelatedProducts;
