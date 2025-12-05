/**
 * UI Schema Extensions for AI SDK Tools
 *
 * Extends JSON Schema with UI-specific properties using x- prefix
 * to avoid conflicts with JSON Schema standard.
 *
 * Based on OpenAPI extension pattern (x-* properties).
 */
// ============================================
// Type Guards
// ============================================
/** Check if schema has UI extensions */
export function hasUIExtensions(schema) {
    return Object.keys(schema).some((key) => key.startsWith('x-'));
}
/** Check if tool has UI extensions */
export function hasUIToolExtensions(tool) {
    return Object.keys(tool).some((key) => key.startsWith('x-')) || hasUIExtensions(tool.inputSchema);
}
/** Check if tool has flow extensions */
export function hasFlowExtensions(tool) {
    return Object.keys(tool).some((key) => key.startsWith('x-flow-'));
}
/** Check if tool is a query node (has branches) */
export function isQueryNode(tool) {
    return tool['x-flow-node-type'] === 'query' || (tool['x-flow-branches']?.length ?? 0) > 0;
}
/** Check if tool is an effect node */
export function isEffectNode(tool) {
    return tool['x-flow-node-type'] === 'effect';
}
//# sourceMappingURL=ui-schema.js.map