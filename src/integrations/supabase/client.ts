import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseKey
  });
  throw new Error('Missing required Supabase environment variables');
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

// Verify connection with proper Promise typing
const verifyConnection = async () => {
  try {
    const { error } = await supabase
      .from('chats')
      .select('*', { count: 'exact', head: true });
    
    if (error) throw error;
    console.log('✓ Supabase connection verified');
  } catch (error) {
    console.error('× Supabase connection failed:', error instanceof Error ? error.message : String(error));
  }
};

verifyConnection();