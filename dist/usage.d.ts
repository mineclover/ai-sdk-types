/**
 * Token Usage Types
 * Common types for tracking token usage and costs
 */
export interface UsageInfo {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
}
export interface UsageWithCost extends UsageInfo {
    cost: number;
    isByok?: boolean;
}
export interface TokenPricing {
    model: string;
    promptCostPer1k: number;
    completionCostPer1k: number;
    byokDiscount?: number;
}
/**
 * Estimate tokens from text (4 chars ≈ 1 token)
 */
export declare function estimateTokens(text: string): number;
/**
 * Estimate prompt tokens from messages
 */
export declare function estimatePromptTokens(messages: {
    role: string;
    content: string | unknown;
}[]): number;
//# sourceMappingURL=usage.d.ts.map