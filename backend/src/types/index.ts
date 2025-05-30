import { z } from 'zod';

// Event schema
export const EventSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),
  time: z.string(),
  address: z.string(),
  description: z.string(),
  price: z.string(),
  image: z.string().optional(),
  tag: z.string(),
  source_name: z.string().optional(),
  source_url: z.string().optional(),
  event_hash: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const CreateEventSchema = EventSchema.omit({
  created_at: true,
  updated_at: true,
});

// Chat schema
export const ChatRequestSchema = z.object({
  message: z.string().min(1).max(1000),
  provider: z.enum(['openai', 'claude', 'grok']).default('openai'),
});

// API Response types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
});

// Type exports
export type Event = z.infer<typeof EventSchema>;
export type CreateEvent = z.infer<typeof CreateEventSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Health check
export interface HealthCheck {
  status: 'ok' | 'error';
  timestamp: string;
  services: {
    database: 'connected' | 'error';
    llm: 'configured' | 'missing';
  };
}