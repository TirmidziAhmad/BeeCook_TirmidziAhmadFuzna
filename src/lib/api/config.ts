export const API_BASE_URL = process.env.API_BASE_URL;

/**
 * Construct a Google Drive direct image URL from a file_id.
 */
export function getImageUrl(fileId?: string): string | null {
  if (!fileId) return null;
  return `https://drive.google.com/uc?id=${fileId}`;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}

export async function fetcher<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = new Headers(options.headers || {});
  
  // If the body is a plain object and not FormData, stringify it and set content type
  if (
    options.body &&
    typeof options.body === 'object' &&
    !(options.body instanceof FormData)
  ) {
    options.body = JSON.stringify(options.body);
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text();
    }
    throw new Error(
      errorData?.message || errorData || `HTTP error! status: ${response.status}`
    );
  }

  // Handle empty responses (like 204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  const data = await response.json();
  return data as T;
}
