"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart, BarChart3, icons, Menu, Package, Plus, Settings, X } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

type SidebarProps = {
  currentPath: string;
};

const navItems = [
  { label: "Dashboard", href: "/dashboard",icon:BarChart3 },
  { label: "Inventory", href: "/inventory",icon:Package },
  { label: "Add Product", href: "/add-product",icon:Plus },
  { label: "Settings", href: "/settings",icon:Settings },
];

const Sidebar = ({ currentPath }: SidebarProps) => {
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => currentPath === path;
  const {user} = useUser()

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="z-[999] md:hidden flex items-center justify-between px-4 py-3 bg-green-900 text-white">
        <span className="font-semibold tracking-wide">@Inventory </span>
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
            
          fixed inset-y-0 h-[100vh] w-64 bg-black text-green-100
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-green-900">
          <h2 className="text-lg font-bold tracking-wide flex items-center justify-start gap-1 pt-4 "><BarChart3 className="text-white"/> @Inventory App</h2>
          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-3 py-6">
          {navItems.map((item) => {
         const IconComponent = item.icon
return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={` flex items-center justify-start gap-2
                px-3 py-2 rounded-sm text-sm font-medium
                transition-colors
                ${
                  isActive(item.href)
                    ? "bg-green-300/40 text-white"
                    : "hover:bg-green-100/20 hover:text-white"
                }
              `}
            >
                <IconComponent className="w-5 h-5 text-white"/>
                  { item.label}

            </Link>)
})}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 inset-x-0 px-6 min-h-20 py-4 text-xs text-green-100 border-t border-green-900 flex 
        items-center justify-between">
            
            <UserButton appearance={{
    elements: {
      avatarBox: "w-16 h-16",
     
    },
  }} />
            <div className="h-full flex flex-col gap-2 pr-2">
                <p>{user?.fullName}</p>
                                <p>{user?.primaryEmailAddress?.emailAddress}</p>

            </div>
            
          
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
