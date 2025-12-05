/**
 * Message Types
 * Common message format for AI communication
 */
export type MessageRole = 'user' | 'assistant' | 'system' | 'tool';
export interface Message {
    role: MessageRole;
    content: string | MessageContent[];
}
export interface MessageContent {
    type: 'text' | 'image' | 'tool_use' | 'tool_result';
    text?: string;
    image_url?: {
        url: string;
    };
    tool_use_id?: string;
    name?: string;
    input?: unknown;
    content?: string;
}
export interface ToolCall {
    id: string;
    name: string;
    arguments: Record<string, unknown>;
}
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
export interface TextPart {
    type: 'text';
    text: string;
}
export interface ToolCallPart {
    type: 'tool-call';
    toolCallId: string;
    toolName: string;
    args: Record<string, unknown>;
}
export interface ToolResultPart {
    type: 'tool-result';
    toolCallId: string;
    toolName: string;
    result: unknown;
}
export type MessagePart = TextPart | ToolCallPart | ToolResultPart;
export declare function isTextPart(part: MessagePart): part is TextPart;
export declare function isToolCallPart(part: MessagePart): part is ToolCallPart;
export declare function isToolResultPart(part: MessagePart): part is ToolResultPart;
//# sourceMappingURL=messages.d.ts.map