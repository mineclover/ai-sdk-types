/**
 * Token Usage Types
 * Common types for tracking token usage and costs
 */
/**
 * Estimate tokens from text (4 chars ≈ 1 token)
 */
export function estimateTokens(text) {
    return Math.ceil(text.length / 4);
}
/**
 * Estimate prompt tokens from messages
 */
export function estimatePromptTokens(messages) {
    let tokens = 0;
    for (const msg of messages) {
        const content = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content);
        tokens += Math.ceil((msg.role.length + content.length + 4) / 4);
    }
    tokens += messages.length * 4; // overhead per message
    return tokens;
}
//# sourceMappingURL=usage.js.map