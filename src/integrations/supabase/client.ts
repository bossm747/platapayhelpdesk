import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseKey
  });
  throw new Error('Missing required Supabase environment variables');
}

// Create Supabase client with explicit typing
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

// Verify connection
const verifyConnection = async () => {
  try {
    const { error } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true });
    
    if (error) throw error;
    console.log('✓ Supabase connection verified');
    console.log('URL:', supabaseUrl);
    console.log('Key length:', supabaseKey.length);
  } catch (error) {
    console.error('× Supabase connection failed:', error instanceof Error ? error.message : String(error));
    console.error('URL:', supabaseUrl);
    console.error('Key length:', supabaseKey.length);
  }
};

verifyConnection();