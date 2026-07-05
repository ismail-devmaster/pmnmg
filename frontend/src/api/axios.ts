import { storage } from '@/utils/storage';
import { ENV } from '@/config/env';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;
const TIMEOUT_MS = 15000;

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError && error.message === 'Network request failed') return true;
  if (error instanceof DOMException && error.name === 'AbortError') return true;
  return false;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<{ data: T }> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const token = await storage.getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const init: RequestInit = { method, headers, signal: controller.signal };
  if (body !== undefined) init.body = JSON.stringify(body);

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`${ENV.API_URL}${path}`, init);

      if (response.status === 401) await storage.clearAuth();

      if (!response.ok) {
        let errorData: Record<string, unknown> = {};
        try { errorData = await response.json(); } catch { /* ignore */ }
        throw new HttpError(
          response.status,
          (errorData.message as string) ?? response.statusText,
          errorData.errors as Record<string, string[]> | undefined
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

      if (isNetworkError(lastError) && attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * (attempt + 1)));
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
