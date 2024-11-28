import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import FloatingChatWidget from "../chat/FloatingChatWidget";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className={cn("flex-1 overflow-y-auto p-8", className)}>
          {children}
        </main>
      </div>
      <FloatingChatWidget />
    </div>
  );
};

export default Layout;