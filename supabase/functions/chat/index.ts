import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.32.1'
import OpenAI from 'https://esm.sh/openai@4.20.1'
import { corsHeaders } from '../_shared/cors.ts'

const anthropic = new Anthropic({
  apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
})

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
})

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, chatId, customerName } = await req.json()
    
    if (!message || !chatId || !customerName) {
      console.error('Missing required fields:', { message, chatId, customerName });
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // System prompt to guide the AI's behavior
    const systemPrompt = `You are a helpful customer service agent for PlataPay, a multi-sided financial platform for seamless payment transactions.
    Your goal is to assist users with their queries about payments, transactions, and platform features.
    If you cannot help or the query requires human intervention, respond with "FALLBACK:" followed by the reason.
    Current customer name: ${customerName}`

    try {
      console.log('Attempting Anthropic response...');
      // Try Anthropic first
      const response = await anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `${systemPrompt}\n\nUser message: ${message}`
        }],
      })

      const content = response.content[0].text
      const isFallback = content.startsWith('FALLBACK:')

      console.log('Anthropic response successful:', { isFallback });

      return new Response(
        JSON.stringify({
          response: isFallback ? content.substring(9).trim() : content,
          isFallback,
          provider: 'anthropic'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    } catch (anthropicError) {
      console.error('Anthropic error, falling back to OpenAI:', anthropicError)

      // Fallback to OpenAI
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: message,
          },
        ],
      })

      const content = completion.choices[0].message.content || ''
      const isFallback = content.startsWith('FALLBACK:')

      console.log('OpenAI fallback successful:', { isFallback });

      return new Response(
        JSON.stringify({
          response: isFallback ? content.substring(9).trim() : content,
          isFallback,
          provider: 'openai'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }
  } catch (error) {
    console.error('Error in chat function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process message',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})