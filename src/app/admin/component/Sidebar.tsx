import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package, ShoppingBag } from "lucide-react";
import { useRouter } from 'next/navigation';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const navigateTo = (path:string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <div className={className}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2  rounded-md">
            <Menu className="w-6 h-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64  p-4 mt-[72px]">
          <h2 className="text-2xl font-semibold mb-4">EliteX Watch</h2>
          <button 
            className="flex items-center gap-2 px-4 py-2  rounded-md"
            onClick={() => navigateTo('/admin/login/dashboard/products')}
          >
            <Package className="w-5 h-5" /> Manage Products
          </button>

          <button 
            className="flex items-center gap-2 px-4 py-2  rounded-md"
            onClick={() => navigateTo('/admin/login/dashboard/orders')}
          >
            <ShoppingBag className="w-5 h-5" /> Orders
          </button>
        </SheetContent>
      </Sheet>
    </div>
  );
}
