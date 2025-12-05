/**
 * Provider Types
 * AI provider definitions and model types
 */

export type Provider = 'openai' | 'anthropic' | 'google' | 'openrouter'

export type ClaudeModel = 'sonnet' | 'opus' | 'haiku' | 'claude-sonnet-4-5' | 'claude-opus-4-5' | 'claude-haiku-3-5'

export type OpenAIModel = 'gpt-4' | 'gpt-4-turbo' | 'gpt-4o' | 'gpt-4o-mini' | 'gpt-3.5-turbo'

export type GoogleModel = 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'gemini-2.0-flash-exp'

export type Model = ClaudeModel | OpenAIModel | GoogleModel | string

export interface ProviderCredentials {
  provider: Provider
  apiKey: string
  baseUrl?: string
  siteUrl?: string
  siteName?: string
}

/**
 * Get provider from model ID
 */
export function getProviderFromModel(model: string): Provider {
  if (model.startsWith('gpt-') || model.startsWith('o1-')) {
    return 'openai'
  }
  if (model.startsWith('claude-') || model === 'sonnet' || model === 'opus' || model === 'haiku') {
    return 'anthropic'
  }
  if (model.startsWith('gemini-')) {
    return 'google'
  }
  return 'openrouter'
}
