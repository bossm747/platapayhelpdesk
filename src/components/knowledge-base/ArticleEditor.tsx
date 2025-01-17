import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';
import { toast } from 'sonner';
import { saveArticle } from '@/lib/supabase';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';

interface ArticleEditorProps {
  onSave?: () => void;
}

const ArticleEditor = ({ onSave }: ArticleEditorProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[200px] p-4 focus:outline-none',
      },
    },
  });

  const handleSave = async () => {
    if (!title || !category || !editor?.getText()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    try {
      await saveArticle({
        title,
        content: editor?.getHTML() || '',
        category,
      });
      
      toast.success('Article saved successfully');
      onSave?.();
      
      // Reset form
      setTitle('');
      setCategory('');
      editor?.commands.setContent('');
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error('Failed to save article');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Article title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-xl font-bold"
      />
      
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="technical">Technical</SelectItem>
          <SelectItem value="billing">Billing</SelectItem>
          <SelectItem value="account">Account</SelectItem>
          <SelectItem value="general">General</SelectItem>
        </SelectContent>
      </Select>

      <div className="border border-zinc-800 rounded-lg">
        <div className="border-b border-zinc-800 p-2 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={editor?.isActive('bold') ? 'bg-zinc-800' : ''}
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={editor?.isActive('italic') ? 'bg-zinc-800' : ''}
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={editor?.isActive('bulletList') ? 'bg-zinc-800' : ''}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={editor?.isActive('orderedList') ? 'bg-zinc-800' : ''}
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>
        
        <EditorContent editor={editor} />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Article'}
        </Button>
      </div>
    </div>
  );
};

export default ArticleEditor;