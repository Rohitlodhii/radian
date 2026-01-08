// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface TTSRequest {
  text: string;
  language?: 'en' | 'hi' | 'es' | 'fr' | 'it' | 'pt';
  voice?: string;
}

export interface TTSResponse {
  file: string;
}

export interface ErrorResponse {
  detail: string;
}

/**
 * Generate speech from text
 */
export async function generateSpeech(request: TTSRequest): Promise<TTSResponse> {
  const response = await fetch(`${API_BASE_URL}/tts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: request.text,
      language: request.language || 'en',
      voice: request.voice || 'hf_alpha',
    }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Get audio file URL
 */
export function getAudioUrl(filename: string): string {
  return `${API_BASE_URL}/audio/${filename}`;
}

/**
 * Fetch audio blob
 */
export async function fetchAudio(filename: string): Promise<Blob> {
  const response = await fetch(getAudioUrl(filename));

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  return response.blob();
}

