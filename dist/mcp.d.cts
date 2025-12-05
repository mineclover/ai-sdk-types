import { MCPMetadata, CollectedToolInfo, OpenAIToolDefinition, MCPToolDefinition, ToolSchema } from '@packages/zod-schema';
export { CollectedToolInfo, MCPAuthConfig, MCPMetadata, MCPOAuth2AuthConfig, MCPPromptArgument, MCPPromptDefinition, MCPResourceDefinition, MCPToolAnnotations, MCPToolDefinition } from '@packages/zod-schema';

/**
 * MCP (Model Context Protocol) Types
 *
 * Re-exported from @packages/zod-schema with local utilities.
 *
 * @see https://modelcontextprotocol.io/
 */

/**
 * Convert MCP tool definition to AI SDK ToolSchema
 */
declare function mcpToolToSchema(tool: MCPToolDefinition): ToolSchema;
/**
 * Convert MCP tool definition to OpenAI format
 */
declare function mcpToolToOpenAI(name: string, tool: MCPToolDefinition): OpenAIToolDefinition;
/**
 * Convert MCP metadata tools to OpenAI format
 */
declare function mcpMetadataToOpenAITools(metadata: MCPMetadata): OpenAIToolDefinition[];
/**
 * Collect tools from multiple MCP metadata sources
 *
 * @param sources - Map of namespace to MCP metadata
 * @returns Collected tool info with OpenAI and AI SDK formats
 */
declare function collectMCPTools(sources: Record<string, MCPMetadata>): CollectedToolInfo;

export { collectMCPTools, mcpMetadataToOpenAITools, mcpToolToOpenAI, mcpToolToSchema };
