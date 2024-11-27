import { toast } from "sonner";
import OpenAI from 'openai';
import { supabase } from '@/integrations/supabase/client';

interface AIAnalysisResult {
  title?: string;
  category?: string;
  summary?: string;
  tags?: string[];
}

export async function analyzeFileContent(file: File): Promise<AIAnalysisResult> {
  try {
    // First get the API key from Supabase
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from('api_keys')
      .select('key')
      .eq('provider', 'openai')
      .single();

    if (apiKeyError) {
      console.error('Error fetching API key:', apiKeyError);
      toast.error('Failed to fetch OpenAI API key. Please ensure you are logged in and have configured the API key.');
      throw new Error('Failed to fetch OpenAI API key');
    }

    if (!apiKeyData?.key) {
      toast.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    const openai = new OpenAI({
      apiKey: apiKeyData.key,
      dangerouslyAllowBrowser: true
    });

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
      model: "gpt-4",
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