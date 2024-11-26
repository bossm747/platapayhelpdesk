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
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
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
    const { data, error } = await supabase
      .from('api_keys')
      .upsert(
        {
          provider,
          key,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'provider'
        }
      )
      .select()
      .single();

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
      .eq('provider', provider)
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
