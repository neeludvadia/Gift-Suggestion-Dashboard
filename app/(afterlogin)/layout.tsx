"use client"
import Sidebar from "@/components/Sidebar";
import Navbar from "../../components/Navbar";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="px-2 flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
      <div className="flex-1 flex flex-col md:ml-60 transition-all">
        {/* Navbar (top bar) */}
        <div className="sticky top-0 z-40 bg-white">
          <Navbar onToggleSidebar={setIsSidebarOpen} />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
