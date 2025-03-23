"use client";
import { client } from "@/sanity/lib/client";
import { orderType } from "../../../../../../types/order";
import Sidebar from "@/app/admin/component/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function Orders() {

  const [order, setOrder] = useState<orderType[]>([]); // ✅ Declared at the top level

  

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.firstName} {order.lastName}</TableCell>
                  <TableCell>${order.total}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
