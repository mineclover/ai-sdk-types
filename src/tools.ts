/**
 * Tool Types (AI SDK 5 compatible)
 *
 * Aligned with Vercel AI SDK 5 tool format:
 * - inputSchema: JSON Schema for input validation
 * - outputSchema: Optional JSON Schema for output (MCP compatible)
 * - execute: Async function with optional execution options
 *
 * @see https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
 */

// ============================================
// JSON Schema Types
// ============================================

/** JSON Schema type for tool schemas */
export interface JSONSchema {
  type: string
  properties?: Record<string, unknown>
  required?: string[]
  description?: string
  [key: string]: unknown
}

// ============================================
// Tool Execution Options
// ============================================

/** Tool execution options (AI SDK 5 compatible) */
export interface ToolExecutionOptions {
  /** Unique identifier for this tool call */
  toolCallId?: string
  /** Abort signal for cancellation */
  abortSignal?: AbortSignal
}

// ============================================
// Tool Definition (AI SDK 5)
// ============================================

/**
 * AI SDK 5 compatible tool definition
 *
 * Unlike OpenAI format (type: 'function' wrapper), this is a flat structure
 * aligned with MCP and AI SDK 5.
 */
export interface Tool<TInput = unknown, TOutput = unknown> {
  /** Tool description for LLM to understand when to use it */
  description: string
  /** JSON Schema for input validation */
  inputSchema: JSONSchema
  /** Optional JSON Schema for output (MCP compatible) */
  outputSchema?: JSONSchema
  /** Execute function */
  execute: (input: TInput, options?: ToolExecutionOptions) => Promise<TOutput>
}

/**
 * Tool definition without execute function (for schema-only use)
 */
export interface ToolSchema {
  /** Tool description for LLM to understand when to use it */
  description: string
  /** JSON Schema for input validation */
  inputSchema: JSONSchema
  /** Optional JSON Schema for output (MCP compatible) */
  outputSchema?: JSONSchema
}

// ============================================
// Tool Registry Types
// ============================================

/** Registry of tools by name */
export type ToolRegistry<T extends Record<string, Tool>> = T

/** Extract tool names from registry */
export type ToolName<T extends ToolRegistry<Record<string, Tool>>> = keyof T

/** Extract input type from a tool */
export type ToolInput<T extends Tool> = T extends Tool<infer I, unknown> ? I : never

/** Extract output type from a tool */
export type ToolOutput<T extends Tool> = T extends Tool<unknown, infer O> ? O : never

// ============================================
// OpenAI-compatible Tool Definition (for API)
// ============================================

/**
 * OpenAI-compatible tool definition format
 * Used for API calls to providers that expect OpenAI format
 */
export interface OpenAIToolDefinition {
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

// ============================================
// Conversion Utilities
// ============================================

/**
 * Convert AI SDK 5 Tool to OpenAI-compatible format
 */
export function toOpenAITool(name: string, tool: ToolSchema): OpenAIToolDefinition {
  return {
    type: 'function',
    function: {
      name,
      description: tool.description,
      parameters: {
        type: 'object',
        properties: (tool.inputSchema.properties as Record<string, unknown>) ?? {},
        required: tool.inputSchema.required,
      },
    },
  }
}

/**
 * Convert tool registry to OpenAI-compatible format
 */
export function toOpenAITools<T extends Record<string, ToolSchema>>(tools: T): OpenAIToolDefinition[] {
  return Object.entries(tools).map(([name, tool]) => toOpenAITool(name, tool))
}
