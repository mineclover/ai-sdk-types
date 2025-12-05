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