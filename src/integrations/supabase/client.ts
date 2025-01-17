import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { toast } from 'sonner';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  toast.error('Database configuration error');
  throw new Error('Missing required environment variables for Supabase');
}

// Create Supabase client
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

// Initialize connection verification
verifyConnection().catch(console.error);