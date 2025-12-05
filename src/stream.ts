/**
 * Stream Communication Types
 * Re-exported from @packages/zod-schema
 */

// Re-export ToolDefinition from messages for convenience
export type { ToolDefinition } from './messages.js'

// Re-export all stream types from zod-schema
export {
  // Types
  type StreamRequest,
  type StreamChunk,
  type StreamEnd,
  type StreamError,
  type StreamMessage,
  type ChatMessage,
  type ChatToolCall,
  type ChatToolDefinition,
  type ChatRequest,
  type ChatResponse,
  type FinishReason,
  type UnifiedChatResponse,
  // Utilities
  mapFinishReason,
} from '@packages/zod-schema'
