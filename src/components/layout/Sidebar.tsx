import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  BarChart2, 
  Ticket, 
  MessageSquare, 
  Book, 
  Settings, 
  Users, 
  Zap,
  Link as LinkIcon,
  UserCircle,
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: BarChart2, label: "Analytics", path: "/analytics" },
    { icon: Ticket, label: "Tickets", path: "/tickets" },
    { icon: MessageSquare, label: "Live Chat", path: "/chat" },
    { icon: Book, label: "Knowledge Base", path: "/knowledge-base" },
    { 
      icon: Settings, 
      label: "Settings", 
      path: "/settings",
      subItems: [
        { icon: UserCircle, label: "Profile", path: "/settings/profile" },
        { icon: Users, label: "Team", path: "/settings/team" },
        { icon: Zap, label: "Automation", path: "/settings/automation" },
        { icon: LinkIcon, label: "Integrations", path: "/settings/integration" },
      ]
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50",
        "w-64 bg-zinc-900 border-r border-zinc-800 p-4",
        "transform transition-transform duration-300 ease-in-out",
        "md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/platapay-logo.png" 
            alt="PlataPay" 
            className="w-8 h-8"
          />
          <span className="text-lg font-semibold text-white">PlataPay</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <div key={item.path}>
            <Link
              to={item.path}
              onClick={onClose}
              className="flex items-center gap-3 px-2 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
            {item.subItems && (
              <div className="ml-6 mt-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    onClick={onClose}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors text-sm"
                  >
                    <subItem.icon className="w-4 h-4" />
                    <span>{subItem.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;