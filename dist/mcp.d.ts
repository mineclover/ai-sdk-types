/**
 * MCP (Model Context Protocol) Types
 *
 * Re-exported from @packages/zod-schema with local utilities.
 *
 * @see https://modelcontextprotocol.io/
 */
import type { OpenAIToolDefinition, ToolSchema } from './tools.js';
export { type MCPToolAnnotations, type MCPToolDefinition, type MCPResourceDefinition, type MCPPromptArgument, type MCPPromptDefinition, type MCPOAuth2AuthConfig, type MCPAuthConfig, type MCPMetadata, type CollectedToolInfo, } from '@packages/zod-schema';
import type { MCPToolDefinition, MCPMetadata, CollectedToolInfo } from '@packages/zod-schema';
/**
 * Convert MCP tool definition to AI SDK ToolSchema
 */
export declare function mcpToolToSchema(tool: MCPToolDefinition): ToolSchema;
/**
 * Convert MCP tool definition to OpenAI format
 */
export declare function mcpToolToOpenAI(name: string, tool: MCPToolDefinition): OpenAIToolDefinition;
/**
 * Convert MCP metadata tools to OpenAI format
 */
export declare function mcpMetadataToOpenAITools(metadata: MCPMetadata): OpenAIToolDefinition[];
/**
 * Collect tools from multiple MCP metadata sources
 *
 * @param sources - Map of namespace to MCP metadata
 * @returns Collected tool info with OpenAI and AI SDK formats
 */
export declare function collectMCPTools(sources: Record<string, MCPMetadata>): CollectedToolInfo;
//# sourceMappingURL=mcp.d.ts.map