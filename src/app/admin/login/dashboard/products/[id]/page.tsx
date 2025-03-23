"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "react-hot-toast";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams(); 
  const { id } = params;
  
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    price: "",
    originalPrice: "",
    category: "",
    featured: false,
    description: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "watch" && _id == $id][0]`;
        const data = await client.fetch(query, { id },{ cache: "no-store" });
        setProduct({
          name: data.name,
          slug: data.slug.current,
          price: data.price,
          originalPrice: data.originalPrice,
          category: data.category,
          featured: data.featured,
          description: data.description[0]?.children[0]?.text || "",
        });
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle Input Change
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Update Product
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await client
        .patch(String(id))
        .set({
          name: product.name,
          slug: { current: product.slug },
          price: Number(product.price),
          originalPrice: Number(product.originalPrice),
          category: product.category,
          featured: product.featured,
          description: [{ children: [{ text: product.description }] }],
        })
        .commit();
      toast.success("Product updated successfully!");
      router.push("/admin/login/dashboard/products"); // Navigate back
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  if (!product.name) return <p>Loading product...</p>;

  return (
    <div className="p-6 my-16">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <Input
          placeholder="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <Input
          placeholder="Slug"
          name="slug"
          value={product.slug}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          placeholder="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          placeholder="Original Price"
          name="originalPrice"
          value={product.originalPrice}
          onChange={handleChange}
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="mens">Men&apos;s Watch</option>
          <option value="ladies">Ladies Watch</option>
          <option value="smart">Smart Watch</option>
          <option value="sport">Sport Watch</option>
        </select>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={product.featured}
            onChange={handleChange}
          />
          <label>Featured Product</label>
        </div>

        <Textarea
          placeholder="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
}
