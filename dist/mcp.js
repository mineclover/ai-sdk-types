/**
 * MCP (Model Context Protocol) Types
 *
 * Types for headless MCP tool definitions and metadata.
 * Enables JSON-based MCP metadata without server process.
 *
 * @see https://modelcontextprotocol.io/
 */
// ============================================
// Conversion Utilities
// ============================================
/**
 * Convert MCP tool definition to AI SDK ToolSchema
 */
export function mcpToolToSchema(tool) {
    return {
        description: tool.description,
        inputSchema: tool.inputSchema,
        outputSchema: tool.outputSchema,
    };
}
/**
 * Convert MCP tool definition to OpenAI format
 */
export function mcpToolToOpenAI(name, tool) {
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
 * Convert MCP metadata tools to OpenAI format
 */
export function mcpMetadataToOpenAITools(metadata) {
    return metadata.tools.map((tool) => mcpToolToOpenAI(tool.name, tool));
}
/**
 * Collect tools from multiple MCP metadata sources
 *
 * @param sources - Map of namespace to MCP metadata
 * @returns Collected tool info with OpenAI and AI SDK formats
 */
export function collectMCPTools(sources) {
    const openaiTools = [];
    const aiTools = {};
    const summary = {};
    for (const [namespace, metadata] of Object.entries(sources)) {
        summary[namespace] = metadata.tools.length;
        for (const tool of metadata.tools) {
            const fullName = `${namespace}:${tool.name}`;
            // Add to OpenAI format with namespaced name
            openaiTools.push(mcpToolToOpenAI(fullName, tool));
            // Add to AI SDK format
            aiTools[fullName] = mcpToolToSchema(tool);
        }
    }
    return {
        openaiTools,
        aiTools,
        summary,
        totalTools: openaiTools.length,
    };
}
//# sourceMappingURL=mcp.js.map