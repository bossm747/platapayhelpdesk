import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LiveChatWidget from "../support/LiveChatWidget";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar onMenuClick={handleMenuClick} />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
        <main className={cn("flex-1 overflow-y-auto p-8 pt-16", className)}>
          {children}
        </main>
      </div>
      <LiveChatWidget />
    </div>
  );
};

export default Layout;