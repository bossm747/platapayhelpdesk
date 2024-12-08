import { Button } from "@/components/ui/button";
import { HelpCircle, Headset, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useSession } from '@supabase/auth-helpers-react';

const RoleSelector = () => {
  const session = useSession();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Visitor Section */}
      <Link to="/knowledge-base" className="group">
        <div className="relative p-6 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
          <div className="absolute -top-3 -right-3">
            <span className="inline-flex items-center rounded-full bg-violet-500/10 px-2 py-1 text-xs text-violet-500">
              No login required
            </span>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-violet-500/10">
              <HelpCircle className="w-6 h-6 text-violet-500" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Visitor</h3>
              <p className="text-sm text-zinc-400">
                Browse our knowledge base, FAQs, and get instant AI assistance
              </p>
            </div>
            <Button variant="outline" className="w-full group-hover:bg-violet-500/10">
              Get Help
            </Button>
          </div>
        </div>
      </Link>

      {/* Live Support Section */}
      <Link to={session ? "/chat" : "/"} className="group">
        <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
          {!session && (
            <div className="absolute -top-3 -right-3">
              <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-1 text-xs text-amber-500">
                Login required
              </span>
            </div>
          )}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-green-500/10">
              <Headset className="w-6 h-6 text-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Live Support</h3>
              <p className="text-sm text-zinc-400">
                Handle customer inquiries, manage tickets, and provide real-time assistance
              </p>
            </div>
            <Button variant="outline" className="w-full group-hover:bg-green-500/10">
              Support Dashboard
            </Button>
          </div>
        </div>
      </Link>

      {/* Admin Section */}
      <Link to={session ? "/settings" : "/"} className="group">
        <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
          {!session && (
            <div className="absolute -top-3 -right-3">
              <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-1 text-xs text-amber-500">
                Login required
              </span>
            </div>
          )}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-blue-500/10">
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Administrator</h3>
              <p className="text-sm text-zinc-400">
                Manage team members, configure settings, and monitor system performance
              </p>
            </div>
            <Button variant="outline" className="w-full group-hover:bg-blue-500/10">
              Admin Panel
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoleSelector;