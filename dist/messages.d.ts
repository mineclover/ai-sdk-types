/**
 * Message Types
 * Re-exported from @packages/zod-schema
 */
export { type MessageRole, type Message, type MessageContent, type MessageContentType, type TextPart, type ToolCallPart, type ToolResultPart, type MessagePart, isTextPart, isToolCallPart, isToolResultPart, } from '@packages/zod-schema';
export { type ToolCall } from '@packages/zod-schema';
export interface ToolDefinition {
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
//# sourceMappingURL=messages.d.ts.map