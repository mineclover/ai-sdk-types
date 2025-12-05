export { collectMCPTools, mcpMetadataToOpenAITools, mcpToolToOpenAI, mcpToolToSchema } from './mcp.cjs';
export { ToolDefinition as MessageToolDefinition, ToolDefinition } from './messages.cjs';
import { JSONSchema, ToolSchema, OpenAIToolDefinition, UIWidgetType, FieldDirection, ShortcutConfig, FlowNodeType, BranchMetadata, NodePosition, StateConnection } from '@packages/zod-schema';
export { BranchMetadata, ChatMessage, ChatRequest, ChatResponse, ClaudeModel, CollectedToolInfo, FieldDirection, FinishReason, FlowNodeType, GoogleModel, JSONSchema, MCPAuthConfig, MCPMetadata, MCPOAuth2AuthConfig, MCPPromptArgument, MCPPromptDefinition, MCPResourceDefinition, MCPToolAnnotations, MCPToolDefinition, Message, MessageContent, MessagePart, MessageRole, Model, NodePosition, OpenAIModel, OpenAIToolDefinition, Provider, ProviderCredentials, ShortcutConfig, StateConnection, StreamChunk, StreamEnd, StreamError, StreamMessage, StreamRequest, TextPart, TokenPricing, ToolCall, ToolCallPart, ToolResultPart, ToolSchema, UIWidgetType, UnifiedChatResponse, UsageInfo, UsageWithCost, estimatePromptTokens, estimateTokens, getProviderFromModel, isTextPart, isToolCallPart, isToolResultPart, mapFinishReason } from '@packages/zod-schema';

/**
 * Tool Types (AI SDK 5 compatible)
 *
 * Re-exported from @packages/zod-schema with local extensions.
 *
 * @see https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
 */

/** Tool execution options (AI SDK 5 compatible) */
interface ToolExecutionOptions {
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
interface Tool<TInput = unknown, TOutput = unknown> {
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
type ToolRegistry<T extends Record<string, Tool>> = T;
/** Extract tool names from registry */
type ToolName<T extends ToolRegistry<Record<string, Tool>>> = keyof T;
/** Extract input type from a tool */
type ToolInput<T extends Tool> = T extends Tool<infer I, unknown> ? I : never;
/** Extract output type from a tool */
type ToolOutput<T extends Tool> = T extends Tool<unknown, infer O> ? O : never;
/**
 * Convert AI SDK 5 Tool to OpenAI-compatible format
 */
declare function toOpenAITool(name: string, tool: ToolSchema): OpenAIToolDefinition;
/**
 * Convert tool registry to OpenAI-compatible format
 */
declare function toOpenAITools<T extends Record<string, ToolSchema>>(tools: T): OpenAIToolDefinition[];

/**
 * UI Schema Extensions for AI SDK Tools
 *
 * Extends JSON Schema with UI-specific properties using x- prefix
 * to avoid conflicts with JSON Schema standard.
 *
 * Based on OpenAPI extension pattern (x-* properties).
 */

/**
 * JSON Schema property with UI extensions
 *
 * Uses x- prefix for UI-specific properties to avoid JSON Schema conflicts.
 * All standard JSON Schema properties are supported via index signature.
 */
interface UIPropertySchema extends JSONSchema {
    type: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null';
    description?: string;
    default?: unknown;
    enum?: unknown[];
    const?: unknown;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    format?: string;
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;
    items?: UIPropertySchema;
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
    properties?: Record<string, UIPropertySchema>;
    required?: string[];
    additionalProperties?: boolean | UIPropertySchema;
    /** UI widget override - changes visual representation */
    'x-widget'?: UIWidgetType;
    /** Color presets for color widget */
    'x-presets'?: string[];
    /** Step increment for number inputs */
    'x-step'?: number;
    /** Placeholder text for inputs */
    'x-placeholder'?: string;
    /** Help text displayed below input */
    'x-help'?: string;
    /** Display label (if different from property name) */
    'x-label'?: string;
    /** Display order (lower = first) */
    'x-order'?: number;
    /** Whether field is hidden in UI */
    'x-hidden'?: boolean;
    /** Whether field is read-only in UI */
    'x-readonly'?: boolean;
    /** Field group for organizing UI */
    'x-group'?: string;
    /** Field direction for flow nodes */
    'x-flow-direction'?: FieldDirection;
    /** State source - if this input comes from another node's output */
    'x-flow-state-from'?: {
        nodeId: string;
        field: string;
    };
}
/**
 * Tool definition with UI extensions
 *
 * Extends ToolSchema with UI and flow-specific metadata.
 */
interface UIToolDefinition extends ToolSchema {
    /** Input schema with UI extensions */
    inputSchema: UIPropertySchema & {
        type: 'object';
    };
    /** Output schema with UI extensions (optional) */
    outputSchema?: UIPropertySchema;
    /** Keyboard shortcuts for this tool */
    'x-shortcuts'?: ShortcutConfig[];
    /** Example usage strings */
    'x-examples'?: string[];
    /** Display category for grouping */
    'x-category'?: string;
    /** Tags for filtering and search */
    'x-tags'?: string[];
    /** Display icon (icon name or URL) */
    'x-icon'?: string;
    /** Whether tool is deprecated */
    'x-deprecated'?: boolean;
    /** Deprecation message */
    'x-deprecated-message'?: string;
    /** Node type in flow graph */
    'x-flow-node-type'?: FlowNodeType;
    /** Possible branch outcomes (query nodes only) */
    'x-flow-branches'?: BranchMetadata[];
    /** Flow context/group identifier */
    'x-flow-context'?: string;
    /** Visual position in canvas */
    'x-flow-position'?: NodePosition;
    /** State connections for this node */
    'x-flow-connections'?: StateConnection[];
}
/**
 * UI Tool with execute function
 */
interface UITool<TInput = unknown, TOutput = unknown> extends UIToolDefinition {
    /** Execute function */
    execute: (input: TInput, options?: {
        toolCallId?: string;
        abortSignal?: AbortSignal;
    }) => Promise<TOutput>;
}
/** Check if schema has UI extensions */
declare function hasUIExtensions(schema: JSONSchema): schema is UIPropertySchema;
/** Check if tool has UI extensions */
declare function hasUIToolExtensions(tool: ToolSchema): tool is UIToolDefinition;
/** Check if tool has flow extensions */
declare function hasFlowExtensions(tool: ToolSchema): boolean;
/** Check if tool is a query node (has branches) */
declare function isQueryNode(tool: UIToolDefinition): boolean;
/** Check if tool is an effect node */
declare function isEffectNode(tool: UIToolDefinition): boolean;

export { type Tool, type ToolExecutionOptions, type ToolInput, type ToolName, type ToolOutput, type ToolRegistry, type UIPropertySchema, type UITool, type UIToolDefinition, hasFlowExtensions, hasUIExtensions, hasUIToolExtensions, isEffectNode, isQueryNode, toOpenAITool, toOpenAITools };
