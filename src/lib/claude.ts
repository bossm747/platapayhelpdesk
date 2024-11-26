import Anthropic from '@anthropic-ai/sdk';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

let anthropic: Anthropic | null = null;

export const initializeAnthropic = async () => {
  try {
    const { data: apiKey } = await supabase
      .from('api_keys')
      .select('key')
      .eq('provider', 'anthropic')
      .single();

    if (apiKey?.key) {
      anthropic = new Anthropic({
        apiKey: apiKey.key,
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error initializing Anthropic:', error);
    toast.error('Failed to initialize Anthropic API');
    return false;
  }
};

export const generateBackendCode = async (prompt: string) => {
  if (!anthropic) {
    const initialized = await initializeAnthropic();
    if (!initialized) {
      toast.error('Anthropic API key not configured');
      throw new Error('Anthropic API key not configured');
    }
  }

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `Generate backend code for the following task: ${prompt}. 
                  Please provide complete, production-ready code with proper error handling and comments.`
      }]
    });

    const content = message.content[0];
    if ('text' in content) {
      return content.text;
    }
    
    throw new Error('Unexpected response format from Claude');
  } catch (error) {
    console.error('Error generating code:', error);
    toast.error('Failed to generate code');
    throw error;
  }
};