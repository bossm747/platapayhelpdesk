import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Using fallback values.');
}

export const supabase = createClient(
  supabaseUrl || 'https://your-project.supabase.co',
  supabaseKey || 'your-anon-key'
);

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

    if (error) throw error;
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

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting articles:', error);
    throw error;
  }
}

// Helper functions for API keys
export async function saveApiKey(provider: string, encryptedKey: string) {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .upsert([
        {
          provider,
          key: encryptedKey,
          updated_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving API key:', error);
    throw error;
  }
}

export async function getApiKey(provider: string) {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('key')
      .eq('provider', provider)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
    return data?.key;
  } catch (error) {
    console.error('Error getting API key:', error);
    throw error;
  }
}