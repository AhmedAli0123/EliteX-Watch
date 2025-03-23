"use client";

import Sidebar from "@/app/admin/component/Sidebar";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { FetchWatch } from "../../../../../../types/watches";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Swal from "sweetalert2";


const ProductsPage = () => {
  const [order, setOrder] = useState<FetchWatch[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/admin/login");
      return;
    }
    
    const fetchWatches = async () => {
      const query = `*[_type == "watch"]{_id, name, price, category, "slug": slug.current, originalPrice, "image": image.asset->url}`;
      const data: FetchWatch[] = await client.fetch(query, {}, { cache: "no-store" });
      setOrder(data);
    };
    fetchWatches();
  }, [session, status, router]);


const handleDelete = async (id: string) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this product? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, keep it",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await client.delete(id);
        setOrder((prevOrders) => prevOrders.filter((product) => product._id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "The product has been deleted successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Failed to delete product:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to delete the product.",
          icon: "error",
        });
      }
    }
  });
};


  const filteredData = categoryFilter === "all" ? order : order.filter((product) => product.category === categoryFilter);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null;
  }


  return (
    <div className="flex flex-col gap-4 lg:flex-row my-16">
      <Sidebar className="w-full lg:w-64" />
      <div className="p-4 lg:p-10 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl lg:text-2xl font-bold">Manage Products</h1>
          <Button variant="default" onClick={()=>router.push("/admin/login/dashboard/products/add")}>Add New Product</Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {["all", "mens", "ladies", "sport", "smart"].map((category) => (
            <Button
              key={category}
              variant={categoryFilter === category ? "secondary" : "outline"}
              onClick={() => setCategoryFilter(category)}
            >
              {category === "all" ? "All" : `${category.charAt(0).toUpperCase()}${category.slice(1)} Watches`}
            </Button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.NO</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="flex flex-col lg:flex-row  gap-2">
                    <Button variant="secondary" size="sm" onClick={() => router.push(`/admin/login/dashboard/products/${product._id}`)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(product._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
