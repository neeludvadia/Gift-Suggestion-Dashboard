"use client";

import React, { useState } from "react";
import {
  Home,
  Users,
  Gift,
  Settings,
  Menu,
  X,
  Upload,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/" },
    { name: "Customers", icon: <Users size={18} />, href: "/customers" },
    { name: "Gift Ideas", icon: <Gift size={18} />, href: "/gifts" },
    { name: "Uploads", icon: <Upload size={18} />, href: "/uploads" },
    { name: "Settings", icon: <Settings size={18} />, href: "/settings" },
  ];

  return (
    <>
      {/* Mobile toggle button
      <div className="md:hidden fixed top-3 left-3 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="border-slate-300"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div> */}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r shadow-sm transition-all z-40
          ${isOpen ? "w-64" : "w-0 md:w-60"} 
          overflow-hidden md:overflow-visible`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h1 className="text-xl font-semibold text-indigo-600">
            🎁 Gift Suggestion
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onClose}
            className="md:hidden"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Nav Links */}
        <nav className="mt-4 px-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md transition-all text-sm font-medium"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-4 w-full px-5">
          <div className="text-xs text-gray-500 text-center">
            © 2025 Gift Suggestion
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
