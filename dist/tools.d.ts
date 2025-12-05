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
/** JSON Schema type for tool schemas */
export interface JSONSchema {
    type: string;
    properties?: Record<string, unknown>;
    required?: string[];
    description?: string;
    [key: string]: unknown;
}
/** Tool execution options (AI SDK 5 compatible) */
export interface ToolExecutionOptions {
    /** Unique identifier for this tool call */
    toolCallId?: string;
    /** Abort signal for cancellation */
    abortSignal?: AbortSignal;
}
/**
 * AI SDK 5 compatible tool definition
 *
 * Unlike OpenAI format (type: 'function' wrapper), this is a flat structure
 * aligned with MCP and AI SDK 5.
 */
export interface Tool<TInput = unknown, TOutput = unknown> {
    /** Tool description for LLM to understand when to use it */
    description: string;
    /** JSON Schema for input validation */
    inputSchema: JSONSchema;
    /** Optional JSON Schema for output (MCP compatible) */
    outputSchema?: JSONSchema;
    /** Execute function */
    execute: (input: TInput, options?: ToolExecutionOptions) => Promise<TOutput>;
}
/**
 * Tool definition without execute function (for schema-only use)
 */
export interface ToolSchema {
    /** Tool description for LLM to understand when to use it */
    description: string;
    /** JSON Schema for input validation */
    inputSchema: JSONSchema;
    /** Optional JSON Schema for output (MCP compatible) */
    outputSchema?: JSONSchema;
}
/** Registry of tools by name */
export type ToolRegistry<T extends Record<string, Tool>> = T;
/** Extract tool names from registry */
export type ToolName<T extends ToolRegistry<Record<string, Tool>>> = keyof T;
/** Extract input type from a tool */
export type ToolInput<T extends Tool> = T extends Tool<infer I, unknown> ? I : never;
/** Extract output type from a tool */
export type ToolOutput<T extends Tool> = T extends Tool<unknown, infer O> ? O : never;
/**
 * OpenAI-compatible tool definition format
 * Used for API calls to providers that expect OpenAI format
 */
export interface OpenAIToolDefinition {
    type: 'function';
    function: {
        name: string;
        description?: string;
        parameters?: {
            type: 'object';
            properties: Record<string, unknown>;
            required?: string[];
        };
    };
}
/**
 * Convert AI SDK 5 Tool to OpenAI-compatible format
 */
export declare function toOpenAITool(name: string, tool: ToolSchema): OpenAIToolDefinition;
/**
 * Convert tool registry to OpenAI-compatible format
 */
export declare function toOpenAITools<T extends Record<string, ToolSchema>>(tools: T): OpenAIToolDefinition[];
//# sourceMappingURL=tools.d.ts.map