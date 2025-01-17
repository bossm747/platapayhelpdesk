import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export { supabase };

export async function saveArticle(article: {
  title: string;
  content: string;
  category: string;
  tags?: string[];
}) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([{
        ...article,
        views: 0,
        rating_sum: 0,
        rating_count: 0
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
      console.error('Error fetching articles:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting articles:', error);
    throw error;
  }
}

export async function updateArticleViews(articleId: string) {
  try {
    const { error } = await supabase.rpc('increment_views', { row_id: articleId });

    if (error) {
      console.error('Error updating article views:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error updating article views:', error);
    throw error;
  }
}

export async function rateArticle(articleId: string, rating: number, comment?: string) {
  try {
    const { data: session } = await supabase.auth.getSession();
    const userId = session?.session?.user?.id;

    if (!userId) {
      toast.error('You must be logged in to rate articles');
      return;
    }

    const { error } = await supabase
      .from('article_feedback')
      .insert([{
        article_id: articleId,
        user_id: userId,
        rating,
        comment
      }]);

    if (error) {
      toast.error('Failed to submit rating');
      throw error;
    }

    toast.success('Thank you for your feedback!');
  } catch (error) {
    console.error('Error rating article:', error);
    throw error;
  }
}

export async function saveApiKey(provider: string, key: string) {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session?.session?.access_token) {
    toast.error('You must be logged in to save API keys');
    throw new Error('Not authenticated');
  }

  try {
    const { data, error } = await supabase
      .from('api_keys')
      .insert([{
        provider: provider.toUpperCase(),
        key
      }])
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