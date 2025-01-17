import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { toast } from 'sonner';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration');
  toast.error('Database configuration error');
  throw new Error('Missing required configuration for Supabase');
}

// Create Supabase client with retries
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      fetch: (url: RequestInfo | URL, options?: RequestInit) => {
        return fetch(url, options).catch(async (error) => {
          console.error('Supabase fetch error:', error);
          toast.error('Connection error, retrying...');
          // Retry the request once
          return fetch(url, options);
        });
      }
    }
  }
);

// Cache for responses
const responseCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Wrapper for Supabase queries with caching and error handling
export async function queryWithRetry<T>(
  queryKey: string,
  queryFn: () => Promise<{ data: T | null; error: any }>,
  options = { useCache: true }
): Promise<{ data: T | null; error: any }> {
  try {
    // Check cache first
    if (options.useCache) {
      const cached = responseCache.get(queryKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return { data: cached.data, error: null };
      }
    }

    // Execute query
    const result = await queryFn();

    // Handle errors
    if (result.error) {
      console.error(`Query error for ${queryKey}:`, result.error);
      throw result.error;
    }

    // Cache successful response
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

// Verify connection with better error handling
export const verifyConnection = async () => {
  try {
    const { error } = await queryWithRetry(
      'verify-connection',
      () => supabase.from('articles').select('count', { count: 'exact', head: true }),
      { useCache: false }
    );
    
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

// Initialize connection verification
verifyConnection().catch(console.error);