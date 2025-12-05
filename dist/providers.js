/**
 * Provider Types
 * AI provider definitions and model types
 */
/**
 * Get provider from model ID
 */
export function getProviderFromModel(model) {
    if (model.startsWith('gpt-') || model.startsWith('o1-')) {
        return 'openai';
    }
    if (model.startsWith('claude-') || model === 'sonnet' || model === 'opus' || model === 'haiku') {
        return 'anthropic';
    }
    if (model.startsWith('gemini-')) {
        return 'google';
    }
    return 'openrouter';
}
//# sourceMappingURL=providers.js.map