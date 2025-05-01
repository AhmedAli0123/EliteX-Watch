"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

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
      <form onSubmit={handleUpdate} className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            placeholder="Enter product name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            placeholder="Enter product slug"
            name="slug"
            value={product.slug}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="originalPrice">Original Price</Label>
            <Input
              id="originalPrice"
              type="number"
              placeholder="Enter original price"
              name="originalPrice"
              value={product.originalPrice}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            value={product.category}
            onValueChange={(value) => handleChange({ target: { name: 'category', value } })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mens">Men&lsquo;`s Watch</SelectItem>
              <SelectItem value="ladies">Ladies Watch</SelectItem>
              <SelectItem value="smart">Smart Watch</SelectItem>
              <SelectItem value="sport">Sport Watch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            name="featured"
            checked={product.featured}
            onCheckedChange={(checked) => handleChange({ target: { name: 'featured', checked } })}
          />
          <Label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Featured Product
          </Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter product description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Product"
          )}
        </Button>
      </form>
    </div>
  );
}
