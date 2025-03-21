"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { FetchWatch } from "../../../../types/watches";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Swal from "sweetalert2"
import RelatedProducts from "./component/RelatedProducts";

const ProductDetail = () => {
  const [watch, setWatch] = useState<FetchWatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cartPrice, setCartPrice] = useState(0);

  // Extracting slug from URL
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    const fetchWatch = async () => {
      const query = `*[_type == "watch" && slug.current == $slug][0]{
        _id, name, price, originalPrice, "image": image.asset->url, description, "slug": slug.current ,category
      }`;
      const data: FetchWatch = await client.fetch(query, { slug });

      setWatch(data);
      setCartPrice(data?.price || 0);
      setLoading(false);
    };

    fetchWatch();
  }, [slug]);

  if (loading) {
    return <Skeleton className="w-full h-screen my-14" />;
  }

  if (!watch) {
    return <p className="text-center text-lg text-gray-600">Product not found</p>;
  }

  // Update cart in local storage
  const updateCartInLocalStorage = (
    slug: string,
    newQuantity: number,
    newPrice: number
  ) => {
    const cart: Record<
      string,
      FetchWatch & { quantity: number; cartPrice: number }
    > = JSON.parse(localStorage.getItem("cart") || "{}");

    cart[slug] = { ...watch, quantity: newQuantity, cartPrice: newPrice };

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Handle Increment
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    const newPrice = newQuantity * watch.price;
    setQuantity(newQuantity);
    setCartPrice(newPrice);
    updateCartInLocalStorage(watch.slug, newQuantity, newPrice);
  };

  // Handle Decrement
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      const newPrice = newQuantity * watch.price;
      setQuantity(newQuantity);
      setCartPrice(newPrice);
      updateCartInLocalStorage(watch.slug, newQuantity, newPrice);
    }
  };

  // Handle Add to Cart Button
  const handleAddToCart = () => {
    updateCartInLocalStorage(watch.slug, quantity, cartPrice);
    
    Swal.fire({
      title: "Success!",
      text: "Item added to cart!",
      icon: "success",
      theme:"auto",
      showConfirmButton: false,
      timer: 1500, // Auto close after 1.5 seconds
    });
  };

  return (
    <>
    <section className="min-h-screen py-12 px-6 md:px-16 lg:px-32 bg-gray-50 dark:bg-gray-900 my-14">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <div className="relative w-full h-96 md:h-[500px]">
          <Image
            src={watch.image}
            alt={watch.name}
            layout="fill"
            objectFit="contain"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{watch.name}</h1>

          {/* Description */}
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed prose">
            <PortableText value={watch.description}  />
          </div>

          <div className="flex gap-5 mt-4">
          <p className="text-gray-600 dark:text-gray-300">PKR {cartPrice}</p>
          <p className="text-red-600 line-through">PKR {watch.originalPrice}</p>
        </div>

          {/* Quantity Button */}
          <div className="flex items-center text-black dark:text-white">
            {/* Minus Button */}
            <button
              onClick={handleDecrement}
              className="w-16 h-[50px] text-2xl border border-gray-500 hover:bg-blue-600"
            >
              -
            </button>

            {/* Counter Value */}
            <div className="w-16 h-[50px] text-2xl flex items-center justify-center border border-gray-500">
              {quantity}
            </div>

            {/* Plus Button */}
            <button
              onClick={handleIncrement}
              className="w-16 h-[50px] text-2xl border border-gray-500 hover:bg-blue-600"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <Button onClick={handleAddToCart} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
              Add to Cart
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600 px-6 py-2 rounded-lg">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </section>

    <RelatedProducts category={watch?.category ?? ""} currentSlug={watch.slug} />
    </>
  );
};

export default ProductDetail;
