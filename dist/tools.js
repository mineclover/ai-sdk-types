/**
 * Tool Types (AI SDK 5 compatible)
 *
 * Re-exported from @packages/zod-schema with local extensions.
 *
 * @see https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
 */
// ============================================
// Conversion Utilities
// ============================================
/**
 * Convert AI SDK 5 Tool to OpenAI-compatible format
 */
export function toOpenAITool(name, tool) {
    return {
        type: 'function',
        function: {
            name,
            description: tool.description,
            parameters: {
                type: 'object',
                properties: tool.inputSchema.properties ?? {},
                required: tool.inputSchema.required,
            },
        },
    };
}
/**
 * Convert tool registry to OpenAI-compatible format
 */
export function toOpenAITools(tools) {
    return Object.entries(tools).map(([name, tool]) => toOpenAITool(name, tool));
}
//# sourceMappingURL=tools.js.map