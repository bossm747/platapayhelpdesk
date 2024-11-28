import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import OpenAI from "https://esm.sh/openai@4.20.1";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ticket } = await req.json();
    console.log('Processing ticket:', ticket.id);

    const openai = new OpenAI({
      apiKey: openAIApiKey,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that helps categorize and prioritize support tickets for PlataPay, a multi-sided financial platform."
        },
        {
          role: "user",
          content: `Please analyze this support ticket and provide:
          1. Priority level (low, medium, high, urgent)
          2. Category (technical, billing, account, general)
          3. Suggested response time
          4. Initial response suggestion
          
          Ticket content: ${ticket.content}`
        }
      ]
    });

    const analysis = response.choices[0].message.content;
    console.log('Ticket analysis completed');

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing ticket:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});