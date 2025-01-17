import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { toast } from 'sonner';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  const missingVars = [];
  if (!supabaseUrl) missingVars.push('VITE_SUPABASE_URL');
  if (!supabaseKey) missingVars.push('VITE_SUPABASE_ANON_KEY');
  
  const errorMessage = `Missing required Supabase configuration: ${missingVars.join(', ')}`;
  console.error(errorMessage);
  toast.error('Database configuration error');
  throw new Error(errorMessage);
}

// Log the first and last 4 characters of the key for debugging
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', `${supabaseKey.slice(0, 4)}...${supabaseKey.slice(-4)}`);

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

export const verifyConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      toast.error('Failed to connect to database');
      throw error;
    }
    console.log('✓ Supabase connection verified');
    return true;
  } catch (error) {
    console.error('× Supabase connection failed:', error);
    toast.error('Database connection failed');
    throw error;
  }
};