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
export { collectMCPTools, mcpMetadataToOpenAITools, mcpToolToOpenAI, mcpToolToSchema, } from './mcp.js';
export { isTextPart, isToolCallPart, isToolResultPart } from './messages.js';
export { getProviderFromModel } from './providers.js';
export { mapFinishReason } from './stream.js';
export { toOpenAITool, toOpenAITools } from './tools.js';
export { estimatePromptTokens, estimateTokens, } from './usage.js';
export { hasFlowExtensions, hasUIExtensions, hasUIToolExtensions, isEffectNode, isQueryNode, } from './ui-schema.js';
//# sourceMappingURL=index.js.map