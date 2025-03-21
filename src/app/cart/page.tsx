"use client";

import React, { useEffect, useState } from "react";
import { FetchWatch } from "../../../types/watches";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

function Page() {
  const [cartItems, setCartItems] = useState<
    (FetchWatch & { quantity: number; cartPrice: number })[]
  >([]);

  // Fetch Cart Data from Local Storage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    setCartItems(Object.values(cart)); // Convert object to array
  }, []);

  const MySwal = withReactContent(Swal);

  const removeFromCart = (slug: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        const cart = JSON.parse(localStorage.getItem("cart") || "{}");
        delete cart[slug]; // Remove item
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        setCartItems(Object.values(cart)); // Update state

        MySwal.fire({
          title: "Removed!",
          text: "The item has been removed from your cart.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Update Local Storage with New Cart Data
  const updateCartInLocalStorage = (updatedCart: typeof cartItems) => {
    const newCart = updatedCart.reduce(
      (acc, item) => {
        acc[item.slug] = item;
        return acc;
      },
      {} as Record<string, FetchWatch & { quantity: number; cartPrice: number }>
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(updatedCart);
  };

  // Handle Increment
  const handleIncrement = (slug: string) => {
    const updatedProducts = cartItems.map((product) => {
      if (product.slug === slug) {
        return {
          ...product,
          quantity: (product.quantity ?? 1) + 1,
          cartPrice: product.price * ((product.quantity ?? 1) + 1), // Update Price
        };
      }
      return product;
    });

    updateCartInLocalStorage(updatedProducts);
  };

  // Handle Decrement
  const handleDecrement = (slug: string) => {
    const updatedProducts = cartItems.map((product) => {
      if (product.slug === slug && (product.quantity ?? 1) > 1) {
        return {
          ...product,
          quantity: (product.quantity ?? 1) - 1,
          cartPrice: product.price * ((product.quantity ?? 1) - 1), // Update Price
        };
      }
      return product;
    });

    updateCartInLocalStorage(updatedProducts);
  };

  // Calculate Totals
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.cartPrice,
    0
  );
  const shippingCharge = cartItems.length > 0 ? 200 : 0;
  const tax = cartSubtotal * 0.02;
  const discount = 0; // Future discount logic can be added here
  const totalAmount = cartSubtotal + shippingCharge + tax - discount;

  // Coupon Code
  const [couponInput, setCouponInput] = useState("");

  const handleCouponCode = () => {
    if (couponInput === "Ahmed") {
      // Generate Notification
      MySwal.fire({
        title: "Coupon Applied!",
        text: "Your coupon has been applied successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
        timer: 3000,
      });
    } else {
      MySwal.fire({
        title: "Invalid Coupon Code!",
        text: "Please enter a valid coupon code.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
        timer: 3000,
      });
      setCouponInput(""); // Clear input after failed attempt
      return;
    }
  };

  // Loading and Error State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cart Transfer to checkout page
  const router = useRouter();
  // Navigate to checkout
  const handleNavigation = () => {
    if (cartItems.length === 0) {
      MySwal.fire({
        title: "Cart is empty!",
        text: "Please add some items to your cart.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
        timer: 3000,
      });
      setError("Cart is empty.");
      return;
    }
    setLoading(true);
    setError(null);
    setTimeout(() => {
      // Simulating an API call or delay
      router.push("/checkout");
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="min-h-screen py-12 px-6 md:px-16 lg:px-32 bg-gray-50 dark:bg-gray-900 mt-14">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Shopping Cart
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          <p className="ml-4 text-lg">Redirecting to checkout...</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              {/* Product Image */}
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-blue-600 dark:text-blue-400">
                    PKR {item.cartPrice}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleDecrement(item.slug)}
                      className="bg-gray-800 text-white px-3 py-1 rounded-l hover:bg-gray-700"
                    >
                      -
                    </button>
                    <span className="px-4 text-black dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrement(item.slug)}
                      className="bg-gray-800 text-white px-3 py-1 rounded-r hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <Button
                variant="outline"
                className="border-red-600 text-red-600 px-4 py-2 rounded-lg"
                onClick={() => removeFromCart(item.slug)}
              >
                Remove
              </Button>
            </div>
          ))}

          {/* Coupon and Total Bill Section */}
{/* Coupon and Total Bill Section */}
<div className="max-w-5xl mx-auto px-4 py-8">
  <div className="flex flex-col lg:flex-row gap-8">
    {/* Coupon Code Section */}
    <div className="w-full lg:w-1/2 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Coupon Code
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
        Enter your coupon code if you have one.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          type="text"
          placeholder="Enter coupon code"
          className="w-full sm:flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleCouponCode}
          className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Apply
        </button>
      </div>
    </div>

    {/* Total Bill Section */}
    <div className="w-full lg:w-1/2 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Total Bill
      </h3>
      <div className="space-y-4 text-gray-600 dark:text-gray-400">
        <div className="flex justify-between">
          <span>Cart Subtotal</span>
          <span className="text-gray-900 dark:text-white">
            PKR {totalAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Charge</span>
          <span className="text-gray-900 dark:text-white">PKR 0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span className="text-gray-900 dark:text-white">
            PKR {tax.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-gray-900 dark:text-white">
            -PKR {discount.toFixed(2)}
          </span>
        </div>
        <hr className="border-gray-300 dark:border-gray-700" />
        <div className="flex justify-between text-gray-900 dark:text-white font-bold text-lg">
          <span>Total Amount</span>
          <span>PKR {(totalAmount + Number(tax) - discount).toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handleNavigation}
        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
      >
        Proceed to Checkout
      </button>
    </div>
  </div>
</div>





  </div>
      )}
    </section>
  );
}

export default Page;
