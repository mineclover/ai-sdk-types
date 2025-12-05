/**
 * Stream Communication Types
 * Common types for streaming AI responses over WebSocket or HTTP
 */

import type { ToolCall, ToolDefinition } from './messages.js'
import type { Model } from './providers.js'
import type { UsageInfo } from './usage.js'

// Re-export for convenience
export type { ToolDefinition } from './messages.js'

// ============================================
// Stream Request/Response Types
// ============================================

export interface StreamRequest {
  id: string
  prompt: string
  model?: Model
  systemPrompt?: string
  stream?: boolean
}

export interface StreamChunk {
  type: 'stream_chunk'
  id: string
  chunk: string
}

export interface StreamEnd {
  type: 'stream_end'
  id: string
  text: string
  usage?: UsageInfo
}

export interface StreamError {
  type: 'stream_error'
  id: string
  code: string
  message: string
}

export type StreamMessage = StreamChunk | StreamEnd | StreamError

// ============================================
// Chat Request/Response Types (OpenAI-compatible)
// ============================================

export interface ChatRequest {
  model: string
  messages: ChatMessage[]
  stream?: boolean
  tools?: ToolDefinition[]
  maxTokens?: number
  temperature?: number
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string | unknown[] | null
  /** Tool call ID (for tool role messages) */
  tool_call_id?: string
  /** Tool name (for tool role messages) */
  name?: string
  /** Tool calls made by assistant */
  tool_calls?: {
    id: string
    type: 'function'
    function: {
      name: string
      arguments: string
    }
  }[]
}

// ToolDefinition is imported from messages.ts

export interface ChatResponse {
  id: string
  object: 'chat.completion' | 'chat.completion.chunk'
  created: number
  model: string
  choices: {
    index: number
    message?: {
      role: 'assistant'
      content: string | null
      tool_calls?: {
        id: string
        type: 'function'
        function: {
          name: string
          arguments: string
        }
      }[]
    }
    delta?: {
      role?: 'assistant'
      content?: string
      tool_calls?: {
        index: number
        id?: string
        type?: 'function'
        function?: {
          name?: string
          arguments?: string
        }
      }[]
    }
    finish_reason: 'stop' | 'tool_calls' | 'length' | 'content_filter' | null
  }[]
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

// ============================================
// Finish Reason Mapping
// ============================================

export type FinishReason = 'stop' | 'tool-calls' | 'length' | 'content-filter' | 'error' | 'other'

export function mapFinishReason(reason: FinishReason): string {
  switch (reason) {
    case 'stop':
      return 'stop'
    case 'tool-calls':
      return 'tool_calls'
    case 'length':
      return 'length'
    case 'content-filter':
      return 'content_filter'
    default:
      return 'stop'
  }
}

// ============================================
// Unified Response Format (Internal Use)
// ============================================

/**
 * Simplified chat response format used internally by provider adapters.
 * Unlike ChatResponse (OpenAI-compatible), this format is normalized
 * and easier to work with.
 */
export interface UnifiedChatResponse {
  content: string
  toolCalls?: ToolCall[]
  finishReason: FinishReason
  usage?: UsageInfo
}
