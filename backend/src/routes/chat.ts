import type { FastifyInstance } from 'fastify';
import { DatabaseService } from '../services/database.js';
import { LLMService } from '../services/llm.js';
import { ChatRequestSchema, type ApiResponse } from '../types/index.js';

export async function chatRoutes(fastify: FastifyInstance) {
  fastify.post<{
    Body: { message: string; provider?: 'openai' | 'claude' | 'grok' };
    Reply: ApiResponse<{ message: string; provider: string }>;
  }>('/chat', async (request, reply) => {
    try {
      const { message, provider = 'openai' } = request.body;
      
      // Check if provider is configured
      if (!LLMService.isConfigured(provider)) {
        return reply.status(400).send({
          success: false,
          error: `${provider} is not configured. Please check API keys.`,
        });
      }

      // Get recent events for context
      const events = await DatabaseService.getEventsForChat();
      
      // Log event details for debugging
      fastify.log.info(`Chat request - Total events fetched: ${events.length}`);
      fastify.log.info(`Events dates: ${events.map(e => e.date).join(', ')}`);
      
      // Generate response
      const response = await LLMService.chat(message, events, provider);
      
      reply.send({
        success: true,
        data: {
          message: response,
          provider,
        },
      });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({
        success: false,
        error: 'Error processing chat request',
      });
    }
  });

  // Get available providers
  fastify.get<{ Reply: ApiResponse<{ providers: string[] }> }>('/chat/providers', async (request, reply) => {
    const providers = [];
    
    if (LLMService.isConfigured('openai')) providers.push('openai');
    if (LLMService.isConfigured('claude')) providers.push('claude');
    if (LLMService.isConfigured('grok')) providers.push('grok');
    
    reply.send({
      success: true,
      data: { providers },
    });
  });
}