import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ArticleSearchProps {
  onSearch: (query: string) => void;
}

const ArticleSearch = ({ onSearch }: ArticleSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
      <Input
        placeholder="Search articles..."
        className="pl-10"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default ArticleSearch;