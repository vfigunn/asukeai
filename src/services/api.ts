// Backend API service
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }

    return data.data as T;
  }

  // Health check
  async health() {
    return this.request('/health');
  }

  // Events (alternative to direct Supabase calls)
  async getEvents() {
    return this.request('/api/events');
  }

  async getEventsByTag(tag: string) {
    return this.request(`/api/events/by-tag?tag=${encodeURIComponent(tag)}`);
  }

  async searchEvents(params: { search?: string; tag?: string; date?: string }) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    return this.request(`/api/events/search?${queryParams}`);
  }

  // Chat
  async chat(message: string, provider: 'openai' | 'claude' | 'grok' = 'openai') {
    return this.request<{ message: string; provider: string }>('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, provider }),
    });
  }

  async getChatProviders() {
    return this.request<{ providers: string[] }>('/api/chat/providers');
  }
}

export const apiService = new ApiService();