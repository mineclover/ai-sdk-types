/**
 * MCP (Model Context Protocol) Types
 *
 * Re-exported from @packages/zod-schema with local utilities.
 *
 * @see https://modelcontextprotocol.io/
 */

import type { OpenAIToolDefinition, ToolSchema } from './tools.js'

// Re-export all MCP types from zod-schema
export {
  type MCPToolAnnotations,
  type MCPToolDefinition,
  type MCPResourceDefinition,
  type MCPPromptArgument,
  type MCPPromptDefinition,
  type MCPOAuth2AuthConfig,
  type MCPAuthConfig,
  type MCPMetadata,
  type CollectedToolInfo,
} from '@packages/zod-schema'

import type {
  MCPToolDefinition,
  MCPMetadata,
  CollectedToolInfo,
} from '@packages/zod-schema'

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
