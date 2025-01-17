import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { toast } from 'sonner';

// Get environment variables
const supabaseUrl = 'https://dqnzvtcguhpkrsgxogax.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbnp2dGNndWhwa3JzZ3hvZ2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjQxNzAsImV4cCI6MjAyNTQwMDE3MH0.qDTKLaXB-LnDEE8TH54zn-oWdp9u1hi_C8PHJ_dgBYs';

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