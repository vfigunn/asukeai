import type { FastifyInstance } from 'fastify';
import { DatabaseService } from '../services/database.js';
import { CreateEventSchema, type ApiResponse, type Event, type CreateEvent } from '../types/index.js';

export async function eventRoutes(fastify: FastifyInstance) {
  // Get all events
  fastify.get<{ Reply: ApiResponse<Event[]> }>('/events', async (request, reply) => {
    try {
      const events = await DatabaseService.getEvents();
      
      reply.send({
        success: true,
        data: events,
      });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({
        success: false,
        error: 'Error fetching events',
      });
    }
  });

  // Get events by tag
  fastify.get<{ 
    Querystring: { tag?: string };
    Reply: ApiResponse<Event[]>;
  }>('/events/by-tag', async (request, reply) => {
    try {
      const { tag } = request.query;
      
      if (!tag) {
        return reply.status(400).send({
          success: false,
          error: 'Tag parameter is required',
        });
      }

      const events = await DatabaseService.getEventsByTag(tag);
      
      reply.send({
        success: true,
        data: events,
      });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({
        success: false,
        error: 'Error fetching events by tag',
      });
    }
  });

  // Create new event
  fastify.post<{
    Body: CreateEvent;
    Reply: ApiResponse<Event>;
  }>('/events', async (request, reply) => {
    try {
      const event = await DatabaseService.createEvent(request.body);
      
      reply.status(201).send({
        success: true,
        data: event,
      });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({
        success: false,
        error: 'Error creating event',
      });
    }
  });

  // Get filtered events (for search)
  fastify.get<{
    Querystring: { 
      search?: string;
      tag?: string;
      date?: string;
    };
    Reply: ApiResponse<Event[]>;
  }>('/events/search', async (request, reply) => {
    try {
      let events = await DatabaseService.getEvents();
      
      const { search, tag, date } = request.query;
      
      // Apply filters
      if (tag) {
        events = events.filter(event => event.tag === tag);
      }
      
      if (search) {
        const searchLower = search.toLowerCase();
        events = events.filter(event => 
          event.name.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower)
        );
      }
      
      if (date) {
        events = events.filter(event => event.date === date);
      }
      
      reply.send({
        success: true,
        data: events,
      });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({
        success: false,
        error: 'Error searching events',
      });
    }
  });

  // Debug endpoint to check chat events
  fastify.get<{ Reply: ApiResponse<{ events: Event[], count: number, todayDate: string }> }>('/events/chat-debug', async (request, reply) => {
    try {
      const events = await DatabaseService.getEventsForChat();
      const today = new Date().toISOString().split('T')[0];
      
      reply.send({
        success: true,
        data: {
          events,
          count: events.length,
          todayDate: today
        },
      });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({
        success: false,
        error: 'Error fetching chat events',
      });
    }
  });
}