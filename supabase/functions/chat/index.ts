import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.32.1';
import { corsHeaders } from '../_shared/cors.ts'

const anthropic = new Anthropic({
  apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, chatId, customerName } = await req.json()

    // System prompt to guide Claude's behavior
    const systemPrompt = `You are a helpful customer service agent for PlataPay, a multi-sided financial platform for seamless payment transactions.
    Your goal is to assist users with their queries about payments, transactions, and platform features.
    If you cannot help or the query requires human intervention, respond with "FALLBACK:" followed by the reason.
    Current customer name: ${customerName}`

    const messages = [{
      role: 'user',
      content: `${systemPrompt}\n\nUser message: ${message}`
    }]

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages,
    });

    const content = response.content[0].text;
    const isFallback = content.startsWith('FALLBACK:');

    return new Response(
      JSON.stringify({
        response: isFallback ? content.substring(9).trim() : content,
        isFallback
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})