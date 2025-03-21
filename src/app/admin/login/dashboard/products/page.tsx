"use client";

import Sidebar from "@/app/admin/component/Sidebar";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { FetchWatch } from "../../../../../../types/watches";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ProductsPage = () => {
  const [order, setOrder] = useState<FetchWatch[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchWatches = async () => {
      const query = `*[_type == "watch"]{_id, name, price, category, "slug": slug.current, originalPrice, "image": image.asset->url}`;
      const data: FetchWatch[] = await client.fetch(query);
      setOrder(data);
    };
    fetchWatches();
  }, []);

  const filteredData = categoryFilter === "all" ? order : order.filter((product) => product.category === categoryFilter);

  return (
    <div className="flex flex-col gap-4 lg:flex-row my-16">
      <Sidebar className="w-full lg:w-64" />
      <div className="p-4 lg:p-10 w-full">
        <h1 className="text-xl lg:text-2xl font-bold mb-4">Manage Products</h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { label: "All", value: "all" },
            { label: "Men's Watches", value: "mens" },
            { label: "Ladies Watches", value: "ladies" },
            { label: "Sport Watches", value: "sport" },
            { label: "Smart Watches", value: "smart" }
          ].map(({ label, value }) => (
            <button
              key={value}
              className={`px-4 py-2 text-sm rounded transition ${categoryFilter === value ? "bg-blue-500 text-black"  : "bg-gray-300 text-black hover:bg-gray-400"}`}
              onClick={() => setCategoryFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm lg:text-base">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="border p-2">Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((product) => (
                <tr key={product._id} className="">
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">${product.price}</td>
                  <td className="border p-2">{product.category}</td>
                  <td className="border p-2 flex flex-wrap gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs lg:text-sm">Edit</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-xs lg:text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
