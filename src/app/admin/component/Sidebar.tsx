"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for open/close

const ResponsiveSidebar = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
    <section className="">
      {/* Hamburger Menu Button (Visible on Mobile) */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 bg-blue-500 text-white p-2 rounded-md my-16"
        onClick={() => setIsOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar (Hidden on Mobile, Always Visible on Large Screens) */}
      <aside
        className={`fixed my-16 top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:relative lg:flex lg:flex-col p-5`}
      >
        {/* Close Button (Only on Mobile) */}
        <button
          className="lg:hidden absolute top-4 right-4 text-white"
          onClick={() => setIsOpen(false)}
        >
          <FiX size={24} />
        </button>

        {/* Sidebar Content */}
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button
            className="hover:bg-gray-700 p-2 rounded"
            onClick={() => router.push("/admin/login/dashboard")}
          >
            Dashboard
          </button>
          <button
            className="hover:bg-gray-700 p-2 rounded"
            onClick={() => router.push("/admin/login/dashboard/products")}
          >
            Manage Products
          </button>
          <button
            className="hover:bg-gray-700 p-2 rounded"
            onClick={() => router.push("/admin/login/dashboard/orders")}
          >
            Orders
          </button>
        </nav>
      </aside>

      {/* Overlay for Mobile (Click to Close Sidebar) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      </section>
    </>
  );
};

export default ResponsiveSidebar;
