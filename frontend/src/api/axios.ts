import { storage } from '@/utils/storage';
import { ENV } from '@/config/env';

const MAX_RETRIES = 3;
const TIMEOUT_MS = 15000;

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly errors?: Record<string, string[]>,
    public readonly isUnverified: boolean = false // 👈 ADDED: isUnverified property
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<{ data: T }> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const token = await storage.getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`; // Fixed template literal

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const init: RequestInit = { method, headers, signal: controller.signal };
  if (body !== undefined) init.body = JSON.stringify(body);

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`${ENV.API_URL}${path}`, init); // Fixed template literal

      if (response.status === 401) await storage.clearAuth();

      if (!response.ok) {
        let errorData: Record<string, unknown> = {};
        try { 
          errorData = await response.json(); 
        } catch { 
          /* empty */ 
        }

        const errorMessage = (errorData.message as string) ?? response.statusText;

        // 👇 ADDED: Logic to determine if this is an unverified email error
        // Adjust the condition below if your backend uses a specific error code instead of a message
        const isUnverified = 
          (response.status === 401 || response.status === 403) && 
          typeof errorMessage === 'string' && 
          errorMessage.toLowerCase().includes('verify');

        throw new HttpError(
          response.status,
          errorMessage,
          errorData.errors as Record<string, string[]> | undefined,
          isUnverified // 👈 ADDED: Passed the isUnverified flag
        );
      }

      const data: T = await response.json();
      return { data };
    } catch (error) {
      if (error instanceof HttpError) {
        clearTimeout(timeoutId);
        throw error;
      }

      lastError = error instanceof Error ? error : new Error(String(error));
      const isRetryable = error instanceof TypeError || error instanceof DOMException;

      if (isRetryable && attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }

      clearTimeout(timeoutId);
      throw lastError;
    }
  }

  clearTimeout(timeoutId);
  throw lastError ?? new Error('Request failed');
}

const api = {
  get<T = any>(path: string) { return request<T>('GET', path); },
  post<T = any>(path: string, body?: unknown) { return request<T>('POST', path, body); },
};

export default api;