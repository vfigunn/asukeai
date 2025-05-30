import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // Get relevant events from Supabase
    const { data: events } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
      .limit(50);

    const systemPrompt = `Eres Asukeai, un asistente amigable para ayudar a las personas a descubrir eventos, restaurantes, y actividades en Asunción, Paraguay.

Tienes acceso a los siguientes eventos actualizados:
${JSON.stringify(events, null, 2)}

Responde en español de manera amigable y útil. Si te preguntan por eventos, proporciona información específica con fechas, horarios y precios. Si no tienes información sobre algo específico, sé honesto al respecto.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return res.status(200).json({ 
      message: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ 
      error: 'Error processing chat request' 
    });
  }
}