"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FetchWatch } from "../../../types/watches";
import { useRouter } from "next/navigation";

const MensCategory = () => {
  const [watches, setWatches] = useState<FetchWatch[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const fetchWatches = async () => {
        const query = `*[_type == "watch" && category == "mens"] | order(price asc) [0..3] {
            _id,
            "slug": slug.current,
            name,
            price,
            originalPrice,
            "image": image.asset->url
          }`;

      const data = await client.fetch(query);
      setWatches(data);
      setLoading(false);
    };

    fetchWatches();
  }, []);

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Mens <span className="text-blue-600 dark:text-blue-400">Watches</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto px-4">
        {loading ? (
          // Skeleton Loaders
          [...Array(8)].map((_, index) => <SkeletonCard key={index} />)
        ) : watches.length > 0 ? (
          watches.map((watch) => 
            <>
          <HoverableCard key={watch._id} watch={watch} />
          </>
        )
          
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No featured products found
          </p>
          
        )}
      </div>
      <div className="flex justify-center mt-8">
        <Button
          className="px-6 py-2 rounded-lg"
          onClick={() => router.push("/shop/mens-watch")}
        >
          View More
        </Button>
      </div>
    </section>
  );
};

// Skeleton Loading Card Component
const SkeletonCard = () => {
  return (
    <Card className="shadow-lg rounded-lg overflow-hidden bg-gray-200 animate-pulse">
      <div className="w-full h-60 bg-gray-300"></div>
      <CardContent className="p-4">
        <div className="mt-4 flex gap-5">
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="h-4 w-20 bg-gray-400 rounded"></div>
        </div>
        <div className="mt-4 h-10 w-full bg-gray-300 rounded"></div>
      </CardContent>
    </Card>
  );
};

const HoverableCard: React.FC<{ watch: FetchWatch }> = ({ watch }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  function handleNavigate(slug: string) {
    router.push(`/shop/${slug}`);
  }

  return (
    <>
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
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h3 className="text-lg font-semibold mt-4">{watch.name}</h3>
        <div className="flex gap-5 mt-4">
          <p className="text-gray-600 dark:text-gray-300">PKR {watch.price}</p>
          <p className="text-red-600 line-through">PKR {watch.originalPrice}</p>
        </div>
        {hovered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white gap-2 transition-opacity duration-300">
            <Button className="bg-white text-black">Add to Cart</Button>
            <Button
              variant="outline"
              className="bg-white text-black"
              onClick={() => handleNavigate(watch.slug)}
            >
              View Details
            </Button>
          </div>
        )}
            
      </CardContent>
    </Card>

    {/* View More Button */}
    
    
    </>
  );
};

export default MensCategory;
