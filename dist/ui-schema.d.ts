/**
 * UI Schema Extensions for AI SDK Tools
 *
 * Extends JSON Schema with UI-specific properties using x- prefix
 * to avoid conflicts with JSON Schema standard.
 *
 * Based on OpenAPI extension pattern (x-* properties).
 */
import type { JSONSchema, ToolSchema } from './tools.js';
export { type UIWidgetType, type FieldDirection, type FlowNodeType, type ShortcutConfig, type BranchMetadata, type NodePosition, type StateConnection, } from '@packages/zod-schema';
import type { UIWidgetType, FieldDirection, FlowNodeType, ShortcutConfig, BranchMetadata, NodePosition, StateConnection } from '@packages/zod-schema';
/**
 * JSON Schema property with UI extensions
 *
 * Uses x- prefix for UI-specific properties to avoid JSON Schema conflicts.
 * All standard JSON Schema properties are supported via index signature.
 */
export interface UIPropertySchema extends JSONSchema {
    type: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null';
    description?: string;
    default?: unknown;
    enum?: unknown[];
    const?: unknown;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    format?: string;
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;
    items?: UIPropertySchema;
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
    properties?: Record<string, UIPropertySchema>;
    required?: string[];
    additionalProperties?: boolean | UIPropertySchema;
    /** UI widget override - changes visual representation */
    'x-widget'?: UIWidgetType;
    /** Color presets for color widget */
    'x-presets'?: string[];
    /** Step increment for number inputs */
    'x-step'?: number;
    /** Placeholder text for inputs */
    'x-placeholder'?: string;
    /** Help text displayed below input */
    'x-help'?: string;
    /** Display label (if different from property name) */
    'x-label'?: string;
    /** Display order (lower = first) */
    'x-order'?: number;
    /** Whether field is hidden in UI */
    'x-hidden'?: boolean;
    /** Whether field is read-only in UI */
    'x-readonly'?: boolean;
    /** Field group for organizing UI */
    'x-group'?: string;
    /** Field direction for flow nodes */
    'x-flow-direction'?: FieldDirection;
    /** State source - if this input comes from another node's output */
    'x-flow-state-from'?: {
        nodeId: string;
        field: string;
    };
}
/**
 * Tool definition with UI extensions
 *
 * Extends ToolSchema with UI and flow-specific metadata.
 */
export interface UIToolDefinition extends ToolSchema {
    /** Input schema with UI extensions */
    inputSchema: UIPropertySchema & {
        type: 'object';
    };
    /** Output schema with UI extensions (optional) */
    outputSchema?: UIPropertySchema;
    /** Keyboard shortcuts for this tool */
    'x-shortcuts'?: ShortcutConfig[];
    /** Example usage strings */
    'x-examples'?: string[];
    /** Display category for grouping */
    'x-category'?: string;
    /** Tags for filtering and search */
    'x-tags'?: string[];
    /** Display icon (icon name or URL) */
    'x-icon'?: string;
    /** Whether tool is deprecated */
    'x-deprecated'?: boolean;
    /** Deprecation message */
    'x-deprecated-message'?: string;
    /** Node type in flow graph */
    'x-flow-node-type'?: FlowNodeType;
    /** Possible branch outcomes (query nodes only) */
    'x-flow-branches'?: BranchMetadata[];
    /** Flow context/group identifier */
    'x-flow-context'?: string;
    /** Visual position in canvas */
    'x-flow-position'?: NodePosition;
    /** State connections for this node */
    'x-flow-connections'?: StateConnection[];
}
/**
 * UI Tool with execute function
 */
export interface UITool<TInput = unknown, TOutput = unknown> extends UIToolDefinition {
    /** Execute function */
    execute: (input: TInput, options?: {
        toolCallId?: string;
        abortSignal?: AbortSignal;
    }) => Promise<TOutput>;
}
/** Check if schema has UI extensions */
export declare function hasUIExtensions(schema: JSONSchema): schema is UIPropertySchema;
/** Check if tool has UI extensions */
export declare function hasUIToolExtensions(tool: ToolSchema): tool is UIToolDefinition;
/** Check if tool has flow extensions */
export declare function hasFlowExtensions(tool: ToolSchema): boolean;
/** Check if tool is a query node (has branches) */
export declare function isQueryNode(tool: UIToolDefinition): boolean;
/** Check if tool is an effect node */
export declare function isEffectNode(tool: UIToolDefinition): boolean;
//# sourceMappingURL=ui-schema.d.ts.map