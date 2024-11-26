import Anthropic from '@anthropic-ai/sdk';
import { supabase } from './supabase';

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
    return false;
  }
};

export const generateBackendCode = async (prompt: string) => {
  if (!anthropic) {
    const initialized = await initializeAnthropic();
    if (!initialized) {
      throw new Error('Anthropic API key not configured');
    }
  }

  const message = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `Generate backend code for the following task: ${prompt}. 
                Please provide complete, production-ready code with proper error handling and comments.`
    }]
  });

  return message.content[0].text;
};