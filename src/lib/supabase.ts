import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper functions for knowledge base
export async function saveArticle(article: {
  title: string;
  content: string;
  category: string;
  tags?: string[];
}) {
  const { data, error } = await supabase
    .from('articles')
    .insert([article])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Helper functions for API keys
export async function saveApiKey(provider: string, encryptedKey: string) {
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
}

export async function getApiKey(provider: string) {
  const { data, error } = await supabase
    .from('api_keys')
    .select('key')
    .eq('provider', provider)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
  return data?.key;
}