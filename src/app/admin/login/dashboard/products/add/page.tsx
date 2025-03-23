"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

const AddProduct = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  // State for Product Details
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    price: "",
    originalPrice: "",
    category: "mens", // Default category
    featured: false,
    description: "",
    image: null, // File object
  });

  // Handle Text & Select Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setProduct({ ...product, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  // Handle File Input Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProduct({ ...product, image: e.target.files[0] });
    }
  };

  // Generate Slug Automatically from Name
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  };

  // Upload Product to Sanity
  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.price ||
      !product.originalPrice ||
      !product.description ||
      !product.image
    ) {
      return Swal.fire("Error", "Please fill in all required fields", "error");
    }

    try {
      setLoading(true);
      const assetRef = await uploadImage(product.image);

      const productDoc = {
        _type: "watch",
        name: product.name,
        slug: {
          _type: "slug",
          current: product.slug || generateSlug(product.name),
        },
        price: parseFloat(product.price),
        originalPrice: parseFloat(product.originalPrice),
        category: product.category,
        featured: product.featured,
        description: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: product.description,
              },
            ],
          },
        ],
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: assetRef,
          },
        },
      };

      await client.create(productDoc);
      Swal.fire("Success", "Product added successfully", "success");
      router.push("/admin/login/dashboard/products"); // Redirect after success
    } catch (error) {
      console.error("Failed to add product:", error);
      Swal.fire("Error", "Failed to add product", "error");
    } finally {
      setLoading(false);
    }
  };

  // Upload Image to Sanity
  const uploadImage = async (file: File) => {
    const asset = await client.assets.upload("image", file);
    return asset._id;
  };

  if (!session) {
    router.push("/admin/login");
    return null;
  }

  return (
    <div className="p-10 my-16">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleAddProduct} className="space-y-4 bg-white p-6 shadow-md rounded">
        
        {/* Name Field */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Slug Field (Optional) */}
        <input
          type="text"
          name="slug"
          placeholder="Slug (Auto-generated if left empty)"
          value={product.slug}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Price Field */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Original Price Field */}
        <input
          type="number"
          name="originalPrice"
          placeholder="Original Price"
          value={product.originalPrice}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Category Select */}
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="mens">Men&apos;s Watch</option>
          <option value="ladies">Ladies Watch</option>
          <option value="sport">Sport Watch</option>
          <option value="smart">Smart Watch</option>
        </select>

        {/* Featured Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={product.featured}
            onChange={handleChange}
          />
          <label>Featured Product for add in home page</label>
        </div>

        {/* Description Field */}
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={5}
        ></textarea>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
        />

        {/* Submit and Cancel Buttons */}
        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
          <Button variant="outline" onClick={() => router.push("/admin/products/manage")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
