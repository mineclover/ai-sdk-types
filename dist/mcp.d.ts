/**
 * MCP (Model Context Protocol) Types
 *
 * Types for headless MCP tool definitions and metadata.
 * Enables JSON-based MCP metadata without server process.
 *
 * @see https://modelcontextprotocol.io/
 */
import type { JSONSchema, OpenAIToolDefinition, ToolSchema } from './tools.js';
/**
 * MCP tool annotation hints
 */
export interface MCPToolAnnotations {
    /** Hint: tool only reads data, no side effects */
    readOnlyHint?: boolean;
    /** Hint: tool may perform destructive operations */
    destructiveHint?: boolean;
    /** Hint: tool execution should require user confirmation */
    requiresConfirmation?: boolean;
}
/**
 * MCP tool definition (JSON metadata format)
 */
export interface MCPToolDefinition {
    /** Tool name (unique within namespace) */
    name: string;
    /** Human-readable description for LLM */
    description: string;
    /** JSON Schema for input validation */
    inputSchema: JSONSchema;
    /** Optional JSON Schema for output */
    outputSchema?: JSONSchema;
    /** Optional annotation hints */
    annotations?: MCPToolAnnotations;
}
/**
 * MCP resource definition
 */
export interface MCPResourceDefinition {
    /** Resource URI pattern (may contain placeholders like {id}) */
    uri: string;
    /** Human-readable name */
    name: string;
    /** Description of the resource */
    description?: string;
    /** MIME type of the resource content */
    mimeType?: string;
}
/**
 * MCP prompt argument
 */
export interface MCPPromptArgument {
    /** Argument name */
    name: string;
    /** Argument description */
    description?: string;
    /** Whether the argument is required */
    required?: boolean;
}
/**
 * MCP prompt definition
 */
export interface MCPPromptDefinition {
    /** Prompt name */
    name: string;
    /** Prompt description */
    description?: string;
    /** Arguments the prompt accepts */
    arguments?: MCPPromptArgument[];
}
/**
 * MCP OAuth2 auth configuration
 */
export interface MCPOAuth2AuthConfig {
    type: 'oauth2';
    /** Authorization server URL */
    authorizationServer: string;
    /** Required OAuth scopes */
    scopes?: string[];
    /** Target audiences for token */
    audiences?: string[];
}
/**
 * MCP auth configuration (currently only OAuth2)
 */
export type MCPAuthConfig = MCPOAuth2AuthConfig;
/**
 * MCP metadata (JSON file format)
 *
 * Defines tools, resources, and prompts for a headless MCP server.
 */
export interface MCPMetadata {
    /** Unique name/identifier for this MCP */
    name: string;
    /** Version string */
    version: string;
    /** Human-readable description */
    description?: string;
    /** Authentication configuration */
    auth?: MCPAuthConfig;
    /** Tool definitions */
    tools: MCPToolDefinition[];
    /** Resource definitions */
    resources?: MCPResourceDefinition[];
    /** Prompt definitions */
    prompts?: MCPPromptDefinition[];
}
/**
 * Collected tool information from multiple MCP namespaces
 */
export interface CollectedToolInfo {
    /** All tools in OpenAI format (ready for API) */
    openaiTools: OpenAIToolDefinition[];
    /** All tools as AI SDK schemas (keyed by namespace:tool) */
    aiTools: Record<string, ToolSchema>;
    /** Tool count by namespace */
    summary: Record<string, number>;
    /** Total tool count */
    totalTools: number;
}
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