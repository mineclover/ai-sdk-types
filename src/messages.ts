/**
 * Message Types
 * Re-exported from @packages/zod-schema
 */

// Re-export all message types from zod-schema
export {
  // Types
  type MessageRole,
  type Message,
  type MessageContent,
  type MessageContentType,
  type TextPart,
  type ToolCallPart,
  type ToolResultPart,
  type MessagePart,
  // Type guards
  isTextPart,
  isToolCallPart,
  isToolResultPart,
} from '@packages/zod-schema'

// Re-export ToolCall from zod-schema (note: different structure)
export { type ToolCall } from '@packages/zod-schema'

// Local type that differs from zod-schema
// This is OpenAI-compatible format, kept for backwards compatibility
export interface ToolDefinition {
  type: 'function'
  function: {
    name: string
    description?: string
    parameters?: {
      type: 'object'
      properties: Record<string, unknown>
      required?: string[]
    }
  }
}
