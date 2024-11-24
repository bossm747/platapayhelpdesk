import { Bell, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <div className="h-16 border-b border-zinc-800 fixed top-0 right-0 left-64 bg-background/50 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-6">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-zinc-800 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800 transition-colors">
              <User className="w-5 h-5" />
              <span>John Doe</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;