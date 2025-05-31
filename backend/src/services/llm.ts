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
    
    console.log(`LLM Service - Processing chat with ${events.length} events`);
    console.log(`Today's date: ${todayISO}`);
    
    const systemPrompt = `Eres **Asukeai**, un asistente virtual amigable y conocedor de Asunción, Paraguay. Tu misión es ayudar a las personas a descubrir los mejores eventos, restaurantes, y actividades en la ciudad.

## 🌟 Tu Personalidad
- Eres entusiasta y conocedor de la cultura paraguaya
- Hablas con calidez y cercanía, como un amigo local
- Tienes conocimiento profundo de Asunción y sus alrededores
- Eres multilingüe: puedes responder en **español**, **guaraní** o **inglés** según prefiera el usuario

## 📅 Información Temporal
- **Fecha actual:** ${todayDate} (${todayISO})
- **Hora actual en Paraguay:** ${now.toLocaleTimeString('es-PY', { timeZone: 'America/Asuncion', hour: '2-digit', minute: '2-digit' })}

## 🎪 Eventos Disponibles (${events.length} eventos futuros)
${JSON.stringify(events, null, 2)}

## 📝 Instrucciones de Respuesta
- **ORGANIZACIÓN POR CATEGORÍA**: Agrupa los eventos por categoría (Música, Teatro, Arte, etc.)
- **EMOJIS POR CATEGORÍA**: Usa estos emojis específicos:
  - Música: 🎵
  - Teatro: 🎭
  - Arte: 🎨
  - Cine: 🎬
  - Deportes: ⚽
  - Capacitación: 📚
  - Ferias: 🎪
  - Danza: 💃
  - Charlas: 🎤
  - Fotografía: 📸
  - Poesía: ✍️
  - Otros: ✨

- **Formato Markdown OBLIGATORIO:** Para cada evento:

**[Emoji de categoría] [Nombre del Evento]**
- 🕐 **Hora:** [hora]  
- 📍 **Lugar:** [dirección]
- 💰 **Precio:** [precio o "Entrada gratuita"]

- **Estructura de respuesta:**
  1. Saludo amigable: "¡Aquí están los eventos para hoy, organizados por categoría!" (NO menciones cantidad específica)
  2. Agrupa por categoría con subtítulos: ### 🎵 Música
  3. Lista todos los eventos de esa categoría
  4. Continúa con la siguiente categoría
  5. Al final, si quieres, puedes decir algo como "¡Hay mucho para hacer hoy en Asunción!"

- **REGLA PRINCIPAL**: Muestra TODOS los eventos sin excepción
- **Idioma:** Responde en el idioma que use el usuario
- **Tono:** Mantén un tono amigable y entusiasta

## 🌍 Ejemplos de Respuestas Multilingües
- Español: "¡Hola! Te puedo ayudar con eventos en Asunción"
- Guaraní: "¡Mba'éichapa! Roipytyvõkuaa eventos rehegua Asunción-pe"
- English: "Hello! I can help you find events in Asunción"

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
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    return completion.choices[0]?.message?.content || 'No pude generar una respuesta.';
  }

  private static async chatWithClaude(message: string, systemPrompt: string): Promise<string> {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Anthropic API key not configured');
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 4000,
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