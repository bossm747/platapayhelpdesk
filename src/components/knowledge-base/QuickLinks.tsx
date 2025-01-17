import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, FileText, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const QuickLinks = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Button
          variant="outline"
          className="w-full justify-between hover:bg-zinc-800/50 border-zinc-800"
          onClick={() => window.open('https://platapay.com/docs', '_blank')}
        >
          <span className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Documentation
          </span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Button
          variant="outline"
          className="w-full justify-between hover:bg-zinc-800/50 border-zinc-800"
          onClick={() => window.open('https://platapay.com/community', '_blank')}
        >
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Community Forum
          </span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Button
          variant="outline"
          className="w-full justify-between lg:col-span-1 md:col-span-2 hover:bg-zinc-800/50 border-zinc-800"
          onClick={() => window.open('https://platapay.com/status', '_blank')}
        >
          <span className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            System Status
          </span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
};

export default QuickLinks;