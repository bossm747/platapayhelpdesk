import Layout from "@/components/layout/Layout";
import RoleSelector from "@/components/RoleSelector";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to PlataPay Support</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Get the help you need with our comprehensive support system. Choose your role below to get started.
          </p>
        </div>

        {/* Role Selection */}
        <RoleSelector />

        {/* Quick Links */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Button
            variant="outline"
            className="justify-between"
            onClick={() => window.open('https://platapay.com', '_blank')}
          >
            Visit PlataPay Website
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            className="justify-between"
            onClick={() => window.open('https://docs.platapay.com', '_blank')}
          >
            Developer Documentation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            className="justify-between lg:col-span-1 md:col-span-2"
            onClick={() => window.open('https://status.platapay.com', '_blank')}
          >
            System Status
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;