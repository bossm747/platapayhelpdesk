import { toast } from "sonner";
import OpenAI from 'openai';

interface AIAnalysisResult {
  title?: string;
  category?: string;
  summary?: string;
  tags?: string[];
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeFileContent(file: File): Promise<AIAnalysisResult> {
  try {
    // Read file content
    const text = await file.text();
    
    // Prepare the prompt for OpenAI
    const prompt = `Analyze this document and provide:
    1. A clear title
    2. A category (Technical, Documentation, Guide, or General)
    3. A concise summary
    4. Relevant tags
    
    Document content:
    ${text.slice(0, 1500)}`; // Limit content length

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o",
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error("No response from AI");

    // Parse AI response
    const lines = response.split('\n');
    const title = lines.find(l => l.toLowerCase().includes('title'))?.split(':')[1]?.trim() || file.name;
    const category = lines.find(l => l.toLowerCase().includes('category'))?.split(':')[1]?.trim() || 'General';
    const summary = lines.find(l => l.toLowerCase().includes('summary'))?.split(':')[1]?.trim() || '';
    const tags = lines.find(l => l.toLowerCase().includes('tags'))?.split(':')[1]?.split(',').map(t => t.trim()) || [];

    return {
      title,
      category,
      summary,
      tags: [...tags, 'ai-generated']
    };
  } catch (error) {
    console.error('AI Analysis error:', error);
    toast.error("Failed to analyze file content. Please try again or fill the form manually.");
    throw error;
  }
}