"use client";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import Sidebar from "@/app/admin/component/Sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'completed';
  paymentMethod: string;
  createdAt: string;
  quantity: number[];
  foods: Array<{
    _id: string;
    title: string;
    imageUrl: string;
    name: string;
  }>;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await client
        .patch(orderId)
        .set({ status: newStatus })
        .commit();

      // Update local state
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus as 'pending' | 'processing' | 'shipped' | 'completed' } : order
      ));
      
      if (selectedOrder?._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus as 'pending' | 'processing' | 'shipped' | 'completed' });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const query = `*[_type == "order"] | order(createdAt desc){
        _id,
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        city,
        zipCode,
        total,
        status,
        paymentMethod,
        createdAt,
        quantity,
        "foods": foods[]->{
  _id,
  "title": name,
  "imageUrl": image.asset->url
}
      }`;
      const data = await client.fetch(query, {}, { cache: "no-store" });
      setOrders(data);
    };
    fetchOrder();
  }, []);

  return (
    <div className="flex flex-col gap-4 lg:flex-row my-16">
      <Sidebar className="w-full lg:w-64" />
      <div className="p-4 lg:p-10 w-full">
        <h1 className="text-xl lg:text-2xl font-bold mb-4">View Orders</h1>
        <div className="overflow-x-auto rounded-lg border dark:border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800">
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">Total</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: any) => (
                <TableRow key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell className="font-medium">{order.firstName} {order.lastName}</TableCell>
                  <TableCell className="font-medium">${order.total}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-2xl w-full overflow-y-auto max-h-[90vh] shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order Details</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedOrder(null)}
                  className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Close
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Name:</strong> {selectedOrder.firstName} {selectedOrder.lastName}</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Email:</strong> {selectedOrder.email}</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Phone:</strong> {selectedOrder.phoneNumber}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Address:</strong> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.zipCode}</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Payment:</strong> {selectedOrder.paymentMethod}</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  <div className="flex items-center gap-2">
                    <strong className="text-gray-900 dark:text-white">Status:</strong>
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(value: 'pending' | 'processing' | 'shipped' | 'completed') => updateOrderStatus(selectedOrder._id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ordered Items</h3>
                <ul className="space-y-4">
                  {selectedOrder.foods?.map((food: any, index: number) => (
                    <li key={food._id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      {food.imageUrl && (
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image 
                            src={food.imageUrl} 
                            alt={food.title} 
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <p className="font-medium text-gray-900 dark:text-white">{food.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {selectedOrder.quantity[index]}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total: <span className="text-gray-800 dark:text-gray-400">${selectedOrder.total}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
