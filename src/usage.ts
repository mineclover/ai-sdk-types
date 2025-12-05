/**
 * Token Usage Types
 * Common types for tracking token usage and costs
 */

export interface UsageInfo {
  promptTokens: number
  completionTokens: number
  totalTokens: number
}

export interface UsageWithCost extends UsageInfo {
  cost: number
  isByok?: boolean
}

export interface TokenPricing {
  model: string
  promptCostPer1k: number
  completionCostPer1k: number
  byokDiscount?: number // 0.0 ~ 1.0
}

/**
 * Estimate tokens from text (4 chars ≈ 1 token)
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

/**
 * Estimate prompt tokens from messages
 */
export function estimatePromptTokens(messages: { role: string; content: string | unknown }[]): number {
  let tokens = 0
  for (const msg of messages) {
    const content = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
    tokens += Math.ceil((msg.role.length + content.length + 4) / 4)
  }
  tokens += messages.length * 4 // overhead per message
  return tokens
}
