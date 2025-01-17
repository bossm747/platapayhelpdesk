import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { toast } from 'sonner';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration');
  toast.error('Database configuration error');
  throw new Error('Missing required configuration for Supabase');
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

const responseCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function queryWithRetry<T>(
  queryKey: string,
  queryFn: () => Promise<{ data: T | null; error: any }>,
  options = { useCache: true }
): Promise<{ data: T | null; error: any }> {
  try {
    if (options.useCache) {
      const cached = responseCache.get(queryKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return { data: cached.data, error: null };
      }
    }

    const result = await queryFn();

    if (result.error) {
      console.error(`Query error for ${queryKey}:`, result.error);
      throw result.error;
    }

    if (options.useCache && result.data) {
      responseCache.set(queryKey, {
        data: result.data,
        timestamp: Date.now()
      });
    }

    return result;
  } catch (error: any) {
    console.error(`Failed to execute query ${queryKey}:`, error);
    toast.error(error.message || 'An error occurred while fetching data');
    return { data: null, error };
  }
}

export const verifyConnection = async () => {
  try {
    const { error } = await supabase
      .from('articles')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase connection error:', error);
      toast.error('Failed to connect to database');
      throw error;
    }
    console.log('✓ Supabase connection verified');
  } catch (error) {
    console.error('× Supabase connection failed:', error);
    toast.error('Database connection failed');
    throw error;
  }
};

verifyConnection().catch(console.error);