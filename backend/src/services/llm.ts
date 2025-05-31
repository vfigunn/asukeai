import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import type { Event } from '../types/index.js';

// Initialize LLM clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export class LLMService {
  static isConfigured(provider: 'openai' | 'claude' | 'grok'): boolean {
    switch (provider) {
      case 'openai':
        return !!process.env.OPENAI_API_KEY;
      case 'claude':
        return !!process.env.ANTHROPIC_API_KEY;
      case 'grok':
        return !!process.env.GROK_API_KEY;
      default:
        return false;
    }
  }

  static async chat(
    message: string,
    events: Event[],
    provider: 'openai' | 'claude' | 'grok' = 'openai'
  ): Promise<string> {
    // Get today's date in Paraguay timezone
    const now = new Date();
    const todayDate = now.toLocaleDateString('es-PY', {
      timeZone: 'America/Asuncion',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
    
    // Also get date in YYYY-MM-DD format for comparison
    const todayISO = now.toLocaleDateString('en-CA', { timeZone: 'America/Asuncion' });
    
    const systemPrompt = `Eres Asukeai, un asistente amigable para ayudar a las personas a descubrir eventos, restaurantes, y actividades en Asunción, Paraguay.

Fecha actual: ${todayDate} (${todayISO})
Hora actual en Paraguay: ${now.toLocaleTimeString('es-PY', { timeZone: 'America/Asuncion', hour: '2-digit', minute: '2-digit' })}

Tienes acceso a los siguientes eventos actualizados:
${JSON.stringify(events.slice(0, 20), null, 2)}

Instrucciones:
- Responde en español de manera amigable y útil
- Si te preguntan por eventos, proporciona información específica con fechas, horarios y precios
- Si no tienes información sobre algo específico, sé honesto al respecto
- Sugiere eventos relevantes basados en las preferencias del usuario
- Mantén las respuestas concisas pero informativas
- IMPORTANTE: Cuando el usuario pregunte por eventos "hoy", "mañana", etc., usa la fecha actual proporcionada para determinar qué eventos mostrar

Usuario: ${message}`;

    try {
      switch (provider) {
        case 'openai':
          return await this.chatWithOpenAI(message, systemPrompt);
        case 'claude':
          return await this.chatWithClaude(message, systemPrompt);
        case 'grok':
          return await this.chatWithGrok(message, systemPrompt);
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }
    } catch (error) {
      console.error(`LLM ${provider} error:`, error);
      throw new Error(`Error al procesar la consulta con ${provider}`);
    }
  }

  private static async chatWithOpenAI(message: string, systemPrompt: string): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || 'No pude generar una respuesta.';
  }

  private static async chatWithClaude(message: string, systemPrompt: string): Promise<string> {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Anthropic API key not configured');
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        { role: 'user', content: message }
      ]
    });

    const content = response.content[0];
    if (content && content.type === 'text') {
      return content.text;
    }
    
    return 'No pude generar una respuesta.';
  }

  private static async chatWithGrok(message: string, systemPrompt: string): Promise<string> {
    if (!process.env.GROK_API_KEY) {
      throw new Error('Grok API key not configured');
    }

    // Implement Grok API call here when available
    // For now, fallback to OpenAI
    console.warn('Grok not implemented yet, falling back to OpenAI');
    return await this.chatWithOpenAI(message, systemPrompt);
  }
}