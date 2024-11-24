import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <main className={cn(
        "transition-all duration-300",
        "pt-16 px-4 md:px-6",
        "md:pl-64"
      )}>
        <div className="animate-fade-in max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;