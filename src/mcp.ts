/**
 * MCP (Model Context Protocol) Types
 *
 * Types for headless MCP tool definitions and metadata.
 * Enables JSON-based MCP metadata without server process.
 *
 * @see https://modelcontextprotocol.io/
 */

import type { JSONSchema, OpenAIToolDefinition, ToolSchema } from './tools.js'

// ============================================
// MCP Tool Definition
// ============================================

/**
 * MCP tool annotation hints
 */
export interface MCPToolAnnotations {
  /** Hint: tool only reads data, no side effects */
  readOnlyHint?: boolean
  /** Hint: tool may perform destructive operations */
  destructiveHint?: boolean
  /** Hint: tool execution should require user confirmation */
  requiresConfirmation?: boolean
}

/**
 * MCP tool definition (JSON metadata format)
 */
export interface MCPToolDefinition {
  /** Tool name (unique within namespace) */
  name: string
  /** Human-readable description for LLM */
  description: string
  /** JSON Schema for input validation */
  inputSchema: JSONSchema
  /** Optional JSON Schema for output */
  outputSchema?: JSONSchema
  /** Optional annotation hints */
  annotations?: MCPToolAnnotations
}

// ============================================
// MCP Resource Definition
// ============================================

/**
 * MCP resource definition
 */
export interface MCPResourceDefinition {
  /** Resource URI pattern (may contain placeholders like {id}) */
  uri: string
  /** Human-readable name */
  name: string
  /** Description of the resource */
  description?: string
  /** MIME type of the resource content */
  mimeType?: string
}

// ============================================
// MCP Prompt Definition
// ============================================

/**
 * MCP prompt argument
 */
export interface MCPPromptArgument {
  /** Argument name */
  name: string
  /** Argument description */
  description?: string
  /** Whether the argument is required */
  required?: boolean
}

/**
 * MCP prompt definition
 */
export interface MCPPromptDefinition {
  /** Prompt name */
  name: string
  /** Prompt description */
  description?: string
  /** Arguments the prompt accepts */
  arguments?: MCPPromptArgument[]
}

// ============================================
// MCP Auth Configuration
// ============================================

/**
 * MCP OAuth2 auth configuration
 */
export interface MCPOAuth2AuthConfig {
  type: 'oauth2'
  /** Authorization server URL */
  authorizationServer: string
  /** Required OAuth scopes */
  scopes?: string[]
  /** Target audiences for token */
  audiences?: string[]
}

/**
 * MCP auth configuration (currently only OAuth2)
 */
export type MCPAuthConfig = MCPOAuth2AuthConfig

// ============================================
// MCP Metadata
// ============================================

/**
 * MCP metadata (JSON file format)
 *
 * Defines tools, resources, and prompts for a headless MCP server.
 */
export interface MCPMetadata {
  /** Unique name/identifier for this MCP */
  name: string
  /** Version string */
  version: string
  /** Human-readable description */
  description?: string
  /** Authentication configuration */
  auth?: MCPAuthConfig
  /** Tool definitions */
  tools: MCPToolDefinition[]
  /** Resource definitions */
  resources?: MCPResourceDefinition[]
  /** Prompt definitions */
  prompts?: MCPPromptDefinition[]
}

// ============================================
// Collected Tool Info (Multi-MCP)
// ============================================

/**
 * Collected tool information from multiple MCP namespaces
 */
export interface CollectedToolInfo {
  /** All tools in OpenAI format (ready for API) */
  openaiTools: OpenAIToolDefinition[]
  /** All tools as AI SDK schemas (keyed by namespace:tool) */
  aiTools: Record<string, ToolSchema>
  /** Tool count by namespace */
  summary: Record<string, number>
  /** Total tool count */
  totalTools: number
}

// ============================================
// Conversion Utilities
// ============================================

/**
 * Convert MCP tool definition to AI SDK ToolSchema
 */
export function mcpToolToSchema(tool: MCPToolDefinition): ToolSchema {
  return {
    description: tool.description,
    inputSchema: tool.inputSchema,
    outputSchema: tool.outputSchema,
  }
}

/**
 * Convert MCP tool definition to OpenAI format
 */
export function mcpToolToOpenAI(name: string, tool: MCPToolDefinition): OpenAIToolDefinition {
  return {
    type: 'function',
    function: {
      name,
      description: tool.description,
      parameters: {
        type: 'object',
        properties: (tool.inputSchema.properties as Record<string, unknown>) ?? {},
        required: tool.inputSchema.required,
      },
    },
  }
}

/**
 * Convert MCP metadata tools to OpenAI format
 */
export function mcpMetadataToOpenAITools(metadata: MCPMetadata): OpenAIToolDefinition[] {
  return metadata.tools.map((tool) => mcpToolToOpenAI(tool.name, tool))
}

/**
 * Collect tools from multiple MCP metadata sources
 *
 * @param sources - Map of namespace to MCP metadata
 * @returns Collected tool info with OpenAI and AI SDK formats
 */
export function collectMCPTools(sources: Record<string, MCPMetadata>): CollectedToolInfo {
  const openaiTools: OpenAIToolDefinition[] = []
  const aiTools: Record<string, ToolSchema> = {}
  const summary: Record<string, number> = {}

  for (const [namespace, metadata] of Object.entries(sources)) {
    summary[namespace] = metadata.tools.length

    for (const tool of metadata.tools) {
      const fullName = `${namespace}:${tool.name}`

      // Add to OpenAI format with namespaced name
      openaiTools.push(mcpToolToOpenAI(fullName, tool))

      // Add to AI SDK format
      aiTools[fullName] = mcpToolToSchema(tool)
    }
  }

  return {
    openaiTools,
    aiTools,
    summary,
    totalTools: openaiTools.length,
  }
}
