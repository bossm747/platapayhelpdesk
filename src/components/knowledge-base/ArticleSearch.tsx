import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface ArticleSearchProps {
  onSearch: (query: string) => void;
}

const ArticleSearch = ({ onSearch }: ArticleSearchProps) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 w-6 h-6" />
      <Input
        placeholder="Search for help articles..."
        className="pl-12 h-14 text-lg rounded-xl bg-zinc-900/50 border-zinc-800 focus:ring-2 focus:ring-primary"
        onChange={(e) => onSearch(e.target.value)}
      />
    </motion.div>
  );
};

export default ArticleSearch;