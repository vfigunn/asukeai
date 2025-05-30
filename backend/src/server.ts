import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import { healthRoutes } from './routes/health.js';
import { eventRoutes } from './routes/events.js';
import { chatRoutes } from './routes/chat.js';

const PORT = parseInt(process.env.PORT || '3001');
const HOST = process.env.HOST || '0.0.0.0';

// Create Fastify instance
const fastify = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  },
});

async function start() {
  try {
    // Register CORS
    await fastify.register(cors, {
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      credentials: true,
    });

    // Register rate limiting
    await fastify.register(rateLimit, {
      max: 100, // 100 requests
      timeWindow: '1 minute',
    });

    // Global error handler
    fastify.setErrorHandler((error, request, reply) => {
      fastify.log.error(error);
      
      if (error.validation) {
        reply.status(400).send({
          success: false,
          error: 'Validation error',
          details: error.validation,
        });
        return;
      }
      
      reply.status(500).send({
        success: false,
        error: 'Internal server error',
      });
    });

    // Register routes with /api prefix
    await fastify.register(async function (fastify) {
      await fastify.register(healthRoutes);
      await fastify.register(eventRoutes, { prefix: '/api' });
      await fastify.register(chatRoutes, { prefix: '/api' });
    });

    // Root endpoint
    fastify.get('/', async (request, reply) => {
      return {
        message: 'Asukeai Backend API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
          health: '/health',
          events: '/api/events',
          chat: '/api/chat',
        },
      };
    });

    // Start server
    await fastify.listen({ port: PORT, host: HOST });
    
    console.log(`🚀 Asukeai Backend running on http://${HOST}:${PORT}`);
    console.log(`📋 Health check: http://${HOST}:${PORT}/health`);
    console.log(`💬 Chat API: http://${HOST}:${PORT}/api/chat`);
    console.log(`📅 Events API: http://${HOST}:${PORT}/api/events`);
    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await fastify.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...');
  await fastify.close();
  process.exit(0);
});

start();