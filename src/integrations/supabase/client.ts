// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dqnzvtcguhpkrsgxogax.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbnp2dGNndWhwa3JzZ3hvZ2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2Mjk3MTMsImV4cCI6MjA0ODIwNTcxM30.7hP3x1nRJiIRjTLDZnhPM2n7G1fOv4NBhPo2UU8uyaA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);