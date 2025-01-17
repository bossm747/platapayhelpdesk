import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ArticleSearchProps {
  onSearch: (query: string) => void;
}

const ArticleSearch = ({ onSearch }: ArticleSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
      <Input
        placeholder="Search for articles..."
        className="pl-10 h-12 text-lg"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default ArticleSearch;