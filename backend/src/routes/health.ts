import type { FastifyInstance } from 'fastify';
import type { HealthCheck } from '../types/index.js';
import { DatabaseService } from '../services/database.js';
import { LLMService } from '../services/llm.js';

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get<{ Reply: HealthCheck }>('/health', async (request, reply) => {
    try {
      const dbConnected = await DatabaseService.testConnection();
      const llmConfigured = LLMService.isConfigured('openai') || 
                           LLMService.isConfigured('claude') || 
                           LLMService.isConfigured('grok');

      const health: HealthCheck = {
        status: dbConnected ? 'ok' : 'error',
        timestamp: new Date().toISOString(),
        services: {
          database: dbConnected ? 'connected' : 'error',
          llm: llmConfigured ? 'configured' : 'missing',
        },
      };

      reply.status(dbConnected ? 200 : 503).send(health);
    } catch (error) {
      reply.status(500).send({
        status: 'error',
        timestamp: new Date().toISOString(),
        services: {
          database: 'error',
          llm: 'missing',
        },
      } as HealthCheck);
    }
  });
}