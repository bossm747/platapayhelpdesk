import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Navbar />
      <main className="pl-64 pt-16">
        <div className="p-6 animate-fade-in">{children}</div>
      </main>
    </div>
  );
};

export default Layout;