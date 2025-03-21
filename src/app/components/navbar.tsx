"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "@/components/Theme-btn";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const route = useRouter();

  function handleCartNavigation() {
    route.push("/cart");
  }

  return (
    <header className="w-full shadow-md bg-background/50 border-b backdrop-blur fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4 relative">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-black dark:text-white"
        >
          EliteX
          <span className="text-blue-600 dark:text-blue-400">Watches</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-lg font-medium">
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            About
          </Link>

          {/* Shop with NavigationMenu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-blue-600 dark:hover:text-blue-400 text-lg font-medium">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-md p-2">
                  <div className="flex flex-col w-48">
                    <Link
                      href="/shop/smart-watch"
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      Smart Watch
                    </Link>
                    <Link
                      href="/shop/sport-watch"
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      Sport Watch
                    </Link>
                    <Link
                      href="/shop/mens-watch"
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      Men&apos;s Watch
                    </Link>
                    <Link
                      href="/shop/female-watch"
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      Ladies Watch
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href="/contact"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Contact
          </Link>
        </nav>

        {/* Cart & Mobile Menu */}
        <div className="flex items-center gap-4 relative">
          {/* Theme Toggle */}
          <ModeToggle />

          {/* Shopping Cart */}
          <Button variant="ghost" className="relative" onClick={handleCartNavigation}>
            <ShoppingCart size={24} className="text-black dark:text-white" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu size={24} className="text-black dark:text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 p-4 bg-white dark:bg-gray-900 text-black dark:text-white"
            >
              <nav className="flex flex-col gap-4 text-lg font-medium">
                <Link
                  href="/"
                  className="text-2xl font-bold mb-5 text-black dark:text-white"
                >
                  Watch
                  <span className="text-blue-600 dark:text-blue-400">
                    Store
                  </span>
                </Link>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  About
                </Link>
                {/* Shop with NavigationMenu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-blue-600 dark:hover:text-blue-400 text-lg font-medium">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-md p-2">
                  <div className="flex flex-col w-48">
                    <Link
                      href="/shop/smart-watch"
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      Smart Watch
                    </Link>
                    <Link
                      href="/shop/sport-watch"
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      Sport Watch
                    </Link>
                    <Link
                      href="/shop/mens-watch"
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      Men&apos;s Watch
                    </Link>
                    <Link
                      href="/shop/female-watch"
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      Ladies Watch
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
