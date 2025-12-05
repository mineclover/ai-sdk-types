/**
 * Stream Communication Types
 * Common types for streaming AI responses over WebSocket or HTTP
 */
export function mapFinishReason(reason) {
    switch (reason) {
        case 'stop':
            return 'stop';
        case 'tool-calls':
            return 'tool_calls';
        case 'length':
            return 'length';
        case 'content-filter':
            return 'content_filter';
        default:
            return 'stop';
    }
}
//# sourceMappingURL=stream.js.map