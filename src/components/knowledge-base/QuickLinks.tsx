import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const QuickLinks = () => {
  return (
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
  );
};

export default QuickLinks;