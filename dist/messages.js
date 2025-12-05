/**
 * Message Types
 * Common message format for AI communication
 */
// ============================================
// Type Guards
// ============================================
export function isTextPart(part) {
    return part.type === 'text';
}
export function isToolCallPart(part) {
    return part.type === 'tool-call';
}
export function isToolResultPart(part) {
    return part.type === 'tool-result';
}
//# sourceMappingURL=messages.js.map