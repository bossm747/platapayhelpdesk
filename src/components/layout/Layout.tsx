import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarOpen && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target as Node) &&
          window.innerWidth < 768) { // Only on mobile
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-background">
      <div ref={sidebarRef}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
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