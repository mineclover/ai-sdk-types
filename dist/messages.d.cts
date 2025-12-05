export { Message, MessageContent, MessageContentType, MessagePart, MessageRole, TextPart, ToolCall, ToolCallPart, ToolResultPart, isTextPart, isToolCallPart, isToolResultPart } from '@packages/zod-schema';

/**
 * Message Types
 * Re-exported from @packages/zod-schema
 */

interface ToolDefinition {
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

export type { ToolDefinition };
