"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { FetchWatch } from "../../../../types/watches";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LadiesWatches = () => {
  const [watches, setWatches] = useState<FetchWatch[]>([]);

  useEffect(() => {
    const fetchWatches = async () => {
      const query = `*[_type == "watch" && category == "ladies"]{_id, name, price,"slug": slug.current, originalPrice, "image": image.asset->url}`;
      const data: FetchWatch[] = await client.fetch(query);
      setWatches(data);
    };
    fetchWatches();
  }, []);

  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-900 min-h-screen my-14">
      <h2 className="text-3xl font-bold text-center mb-6">
        Ladies <span className="text-blue-600 dark:text-blue-400">Watches</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto px-4">
        {watches.map((watch) => (
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
            layout="fill"
            objectFit="cover"
            loading="lazy"
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

export default LadiesWatches;
