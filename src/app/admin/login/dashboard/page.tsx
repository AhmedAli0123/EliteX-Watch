"use client";

import { useRouter } from "next/navigation";
import ResponsiveSidebar from "../../component/Sidebar";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const router = useRouter();

  const navigateTo = (path:string) => {
    router.push(path);
  };

  return (
      <div className="flex flex-col justify-around  md:flex-row my-16 min-h-screen gap-5">
        <ResponsiveSidebar />
        <div className="flex-1 p-4 md:ml-64">
          <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
          <p className="mt-4">Here you can manage products and orders.</p>
          <div className="flex gap-5 mt-9">
          <Button onClick={() => navigateTo('/admin/login/dashboard/products')}>Manage Product</Button>
          <Button onClick={() => navigateTo('/admin/login/dashboard/orders')}>Manage Order</Button>
          </div>
        </div>
      </div>
  );
}
