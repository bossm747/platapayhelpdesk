import { Link } from "react-router-dom";
import { LayoutDashboard, BarChart2, Users, Settings } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: BarChart2, label: "Analytics", path: "/analytics" },
    { icon: Users, label: "Team", path: "/team" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-zinc-900 border-r border-zinc-800 p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 bg-violet-600 rounded-lg" />
        <span className="text-lg font-semibold">Startup OS</span>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;