/**
 * Tool Types (AI SDK 5 compatible)
 *
 * Re-exported from @packages/zod-schema with local extensions.
 *
 * @see https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
 */
export { type JSONSchema, type ToolSchema, type OpenAIToolDefinition, } from '@packages/zod-schema';
import type { JSONSchema, ToolSchema, OpenAIToolDefinition } from '@packages/zod-schema';
/** Tool execution options (AI SDK 5 compatible) */
export interface ToolExecutionOptions {
    /** Unique identifier for this tool call */
    toolCallId?: string;
    /** Abort signal for cancellation */
    abortSignal?: AbortSignal;
}
/**
 * AI SDK 5 compatible tool definition with execute function
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
/** Registry of tools by name */
export type ToolRegistry<T extends Record<string, Tool>> = T;
/** Extract tool names from registry */
export type ToolName<T extends ToolRegistry<Record<string, Tool>>> = keyof T;
/** Extract input type from a tool */
export type ToolInput<T extends Tool> = T extends Tool<infer I, unknown> ? I : never;
/** Extract output type from a tool */
export type ToolOutput<T extends Tool> = T extends Tool<unknown, infer O> ? O : never;
/**
 * Convert AI SDK 5 Tool to OpenAI-compatible format
 */
export declare function toOpenAITool(name: string, tool: ToolSchema): OpenAIToolDefinition;
/**
 * Convert tool registry to OpenAI-compatible format
 */
export declare function toOpenAITools<T extends Record<string, ToolSchema>>(tools: T): OpenAIToolDefinition[];
//# sourceMappingURL=tools.d.ts.map