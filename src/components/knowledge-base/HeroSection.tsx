import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useSession } from '@supabase/auth-helpers-react';

const HeroSection = () => {
  const session = useSession();

  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold">Welcome to PlataPay Support</h1>
      <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
        Get the help you need with our comprehensive support system. Find answers, tutorials, and guides to help you succeed with PlataPay.
      </p>
      {session && (
        <Link to="/knowledge-base/new">
          <Button className="mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Create New Article
          </Button>
        </Link>
      )}
    </div>
  );
};

export default HeroSection;