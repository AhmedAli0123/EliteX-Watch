"use client";
import { client } from "@/sanity/lib/client";
import { orderType } from "../../../../../../types/order";
import Sidebar from "@/app/admin/component/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Orders() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const [order, setOrder] = useState<orderType[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      const query = `*[_type == "order"] | order(createdAt desc){
        _id,
        firstName,
        lastName,
        total,
        status
      }`;
      const data = await client.fetch(query, {}, { cache: "no-store" });
      setOrder(data);
    };
    fetchOrder();
  }, []);

  return (
    <div className="flex flex-col gap-4 lg:flex-row my-16">
      <Sidebar className="w-full lg:w-64" />
      <div className="p-4 lg:p-10 w-full">
        <h1 className="text-xl lg:text-2xl font-bold mb-4">View Orders</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm lg:text-base">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="border p-2">Customer</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {order.map((order) => (
                <tr key={order._id}>
                  <td className="border p-2">{order.firstName} {order.lastName}</td>
                  <td className="border p-2">${order.total}</td>
                  <td className="border p-2">{order.status}</td>
                  <td className="border p-2 flex flex-wrap gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs lg:text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
