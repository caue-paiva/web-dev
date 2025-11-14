import type { Potion } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          error: 'Erro desconhecido',
        }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // GET /api/potions - Lista todas as poções
  async getPotions(): Promise<Potion[]> {
    return this.request<Potion[]>('/potions');
  }

  // GET /api/potions/:id - Busca uma poção específica
  async getPotion(id: number): Promise<Potion> {
    return this.request<Potion>(`/potions/${id}`);
  }

  // POST /api/potions - Cadastra uma nova poção
  async createPotion(potion: Omit<Potion, 'id'>): Promise<Potion> {
    return this.request<Potion>('/potions', {
      method: 'POST',
      body: JSON.stringify(potion),
    });
  }

  // DELETE /api/potions/:id - Remove uma poção
  async deletePotion(id: number): Promise<{ message: string; id: number }> {
    return this.request<{ message: string; id: number }>(`/potions/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
