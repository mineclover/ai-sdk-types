/**
 * @packages/ai-sdk-types
 *
 * Shared type definitions for AI SDK communication.
 * Common types used across ai-sdk-server, openrouter-proxy-worker, and other AI packages.
 *
 * Used by:
 * - ai-sdk-server - WebSocket server for AI communication
 * - openrouter-proxy-worker - Cloudflare Worker proxy for AI providers
 * - ai-sdk-cli - CLI wrapper for Claude Code
 */
export type { CollectedToolInfo, MCPAuthConfig, MCPMetadata, MCPOAuth2AuthConfig, MCPPromptArgument, MCPPromptDefinition, MCPResourceDefinition, MCPToolAnnotations, MCPToolDefinition, } from './mcp.js';
export { collectMCPTools, mcpMetadataToOpenAITools, mcpToolToOpenAI, mcpToolToSchema, } from './mcp.js';
export type { Message, MessageContent, MessagePart, MessageRole, TextPart, ToolCall, ToolCallPart, ToolDefinition as MessageToolDefinition, ToolResultPart, } from './messages.js';
export { isTextPart, isToolCallPart, isToolResultPart } from './messages.js';
export type { ClaudeModel, GoogleModel, Model, OpenAIModel, Provider, ProviderCredentials, } from './providers.js';
export { getProviderFromModel } from './providers.js';
export type { ChatMessage, ChatRequest, ChatResponse, FinishReason, StreamChunk, StreamEnd, StreamError, StreamMessage, StreamRequest, ToolDefinition, UnifiedChatResponse, } from './stream.js';
export { mapFinishReason } from './stream.js';
export type { JSONSchema, OpenAIToolDefinition, Tool, ToolExecutionOptions, ToolInput, ToolName, ToolOutput, ToolRegistry, ToolSchema, } from './tools.js';
export { toOpenAITool, toOpenAITools } from './tools.js';
export type { TokenPricing, UsageInfo, UsageWithCost, } from './usage.js';
export { estimatePromptTokens, estimateTokens, } from './usage.js';
//# sourceMappingURL=index.d.ts.map