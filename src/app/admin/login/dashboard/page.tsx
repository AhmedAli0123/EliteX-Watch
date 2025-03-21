"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ResponsiveSidebar from "../../component/Sidebar";
import ProtectedRoute from "../../component/ProtectedRoute";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push("/admin/login");
    return null;
  }
  return (
    <ProtectedRoute>
    <div className="flex my-14">
      <ResponsiveSidebar />
      <div className="ml-64 p-10">
        <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
        <p className="mt-4">Here you can manage products and orders.</p>
      </div>
    </div>
    </ProtectedRoute>
  );
}
