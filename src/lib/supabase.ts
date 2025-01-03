import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export { supabase };

// Helper functions for knowledge base
export async function saveArticle(article: {
  title: string;
  content: string;
  category: string;
  tags?: string[];
}) {
  try {
    // First analyze the article content
    const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-article', {
      body: { content: article.content }
    });

    if (analysisError) {
      console.error('Error analyzing article:', analysisError);
    }

    const { data, error } = await supabase
      .from('articles')
      .insert([{
        ...article,
        tags: analysisData?.analysis?.tags || article.tags
      }])
      .select()
      .single();

    if (error) {
      toast.error('Failed to save article');
      throw error;
    }
    
    toast.success('Article saved successfully');
    return data;
  } catch (error) {
    console.error('Error saving article:', error);
    throw error;
  }
}

export async function getArticles() {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch articles');
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting articles:', error);
    throw error;
  }
}

// Helper functions for API keys
export async function saveApiKey(provider: string, key: string) {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session?.session?.access_token) {
    toast.error('You must be logged in to save API keys');
    throw new Error('Not authenticated');
  }

  try {
    const { data, error } = await supabase.functions.invoke('save-api-key', {
      body: { provider, key }
    });

    if (error) {
      toast.error('Failed to save API key');
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error saving API key:', error);
    throw error;
  }
}

export async function getApiKey(provider: string) {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session?.session?.access_token) {
    toast.error('You must be logged in to access API keys');
    throw new Error('Not authenticated');
  }

  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('key')
      .eq('provider', provider.toUpperCase())
      .maybeSingle();

    if (error) {
      console.error('Error fetching API key:', error);
      return null;
    }
    
    return data?.key;
  } catch (error) {
    console.error('Error getting API key:', error);
    return null;
  }
}

// Helper functions for ticket processing
export async function processTicket(ticketData: any) {
  try {
    const { data, error } = await supabase.functions.invoke('process-ticket', {
      body: { ticket: ticketData }
    });

    if (error) {
      toast.error('Failed to process ticket');
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error processing ticket:', error);
    throw error;
  }
}
