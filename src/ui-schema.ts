/**
 * UI Schema Extensions for AI SDK Tools
 *
 * Extends JSON Schema with UI-specific properties using x- prefix
 * to avoid conflicts with JSON Schema standard.
 *
 * Based on OpenAPI extension pattern (x-* properties).
 */

import type { JSONSchema, ToolSchema } from './tools.js'

// ============================================
// UI Widget Types
// ============================================

/** UI widget type for visual representation */
export type UIWidgetType = 'color' | 'date' | 'time' | 'datetime' | 'range' | 'textarea' | 'select' | 'radio' | 'checkbox'

/** Field direction for flow nodes */
export type FieldDirection = 'input' | 'output'

/** Flow node type */
export type FlowNodeType = 'query' | 'effect'

// ============================================
// UI Property Schema (per-property extensions)
// ============================================

/**
 * JSON Schema property with UI extensions
 *
 * Uses x- prefix for UI-specific properties to avoid JSON Schema conflicts.
 * All standard JSON Schema properties are supported via index signature.
 */
export interface UIPropertySchema extends JSONSchema {
  // JSON Schema standard properties (commonly used)
  type: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null'
  description?: string
  default?: unknown
  enum?: unknown[]
  const?: unknown

  // String validations
  pattern?: string
  minLength?: number
  maxLength?: number
  format?: string // 'date', 'time', 'date-time', 'email', 'uri', etc.

  // Number validations
  minimum?: number
  maximum?: number
  exclusiveMinimum?: number
  exclusiveMaximum?: number
  multipleOf?: number

  // Array validations
  items?: UIPropertySchema
  minItems?: number
  maxItems?: number
  uniqueItems?: boolean

  // Object validations
  properties?: Record<string, UIPropertySchema>
  required?: string[]
  additionalProperties?: boolean | UIPropertySchema

  // ============================================
  // UI Extensions (x- prefix)
  // ============================================

  /** UI widget override - changes visual representation */
  'x-widget'?: UIWidgetType

  /** Color presets for color widget */
  'x-presets'?: string[]

  /** Step increment for number inputs */
  'x-step'?: number

  /** Placeholder text for inputs */
  'x-placeholder'?: string

  /** Help text displayed below input */
  'x-help'?: string

  /** Display label (if different from property name) */
  'x-label'?: string

  /** Display order (lower = first) */
  'x-order'?: number

  /** Whether field is hidden in UI */
  'x-hidden'?: boolean

  /** Whether field is read-only in UI */
  'x-readonly'?: boolean

  /** Field group for organizing UI */
  'x-group'?: string

  // ============================================
  // Flow Extensions (x-flow-* prefix)
  // ============================================

  /** Field direction for flow nodes */
  'x-flow-direction'?: FieldDirection

  /** State source - if this input comes from another node's output */
  'x-flow-state-from'?: {
    nodeId: string
    field: string
  }
}

// ============================================
// Shortcut Configuration
// ============================================

/** Keyboard shortcut configuration */
export interface ShortcutConfig {
  /** Trigger key */
  key: string
  /** Ctrl/Cmd modifier */
  ctrl?: boolean
  /** Alt/Option modifier */
  alt?: boolean
  /** Shift modifier */
  shift?: boolean
  /** Meta (Windows/Command) modifier */
  meta?: boolean
  /** Shortcut description */
  description?: string
  /** Arguments to pass when triggered */
  args?: unknown[]
}

// ============================================
// Branch Metadata (for flow nodes)
// ============================================

/** Branch metadata for query nodes */
export interface BranchMetadata {
  /** Branch identifier - matches return value case */
  case: string
  /** Human-readable label for UI */
  label?: string
  /** Description of this branch outcome */
  description?: string
  /** Next function/node to call (for auto-wiring) */
  next?: string | string[]
  /** Visual color for this branch (hex) */
  color?: string
  /** Additional metadata */
  meta?: Record<string, unknown>
}

/** Visual position for nodes */
export interface NodePosition {
  x: number
  y: number
}

/** State connection - links node outputs to inputs */
export interface StateConnection {
  /** Source node ID */
  from: string
  /** Source output field key */
  fromField: string
  /** Target node ID */
  to: string
  /** Target input field key */
  toField: string
}

// ============================================
// UI Tool Definition
// ============================================

/**
 * Tool definition with UI extensions
 *
 * Extends ToolSchema with UI and flow-specific metadata.
 */
export interface UIToolDefinition extends ToolSchema {
  /** Input schema with UI extensions */
  inputSchema: UIPropertySchema & { type: 'object' }

  /** Output schema with UI extensions (optional) */
  outputSchema?: UIPropertySchema

  // ============================================
  // UI Extensions (x- prefix)
  // ============================================

  /** Keyboard shortcuts for this tool */
  'x-shortcuts'?: ShortcutConfig[]

  /** Example usage strings */
  'x-examples'?: string[]

  /** Display category for grouping */
  'x-category'?: string

  /** Tags for filtering and search */
  'x-tags'?: string[]

  /** Display icon (icon name or URL) */
  'x-icon'?: string

  /** Whether tool is deprecated */
  'x-deprecated'?: boolean

  /** Deprecation message */
  'x-deprecated-message'?: string

  // ============================================
  // Flow Extensions (x-flow-* prefix)
  // ============================================

  /** Node type in flow graph */
  'x-flow-node-type'?: FlowNodeType

  /** Possible branch outcomes (query nodes only) */
  'x-flow-branches'?: BranchMetadata[]

  /** Flow context/group identifier */
  'x-flow-context'?: string

  /** Visual position in canvas */
  'x-flow-position'?: NodePosition

  /** State connections for this node */
  'x-flow-connections'?: StateConnection[]
}

// ============================================
// UI Tool with Execute Function
// ============================================

/**
 * UI Tool with execute function
 */
export interface UITool<TInput = unknown, TOutput = unknown> extends UIToolDefinition {
  /** Execute function */
  execute: (input: TInput, options?: { toolCallId?: string; abortSignal?: AbortSignal }) => Promise<TOutput>
}

// ============================================
// Type Guards
// ============================================

/** Check if schema has UI extensions */
export function hasUIExtensions(schema: JSONSchema): schema is UIPropertySchema {
  return Object.keys(schema).some((key) => key.startsWith('x-'))
}

/** Check if tool has UI extensions */
export function hasUIToolExtensions(tool: ToolSchema): tool is UIToolDefinition {
  return Object.keys(tool).some((key) => key.startsWith('x-')) || hasUIExtensions(tool.inputSchema)
}

/** Check if tool has flow extensions */
export function hasFlowExtensions(tool: ToolSchema): boolean {
  return Object.keys(tool).some((key) => key.startsWith('x-flow-'))
}

/** Check if tool is a query node (has branches) */
export function isQueryNode(tool: UIToolDefinition): boolean {
  return tool['x-flow-node-type'] === 'query' || (tool['x-flow-branches']?.length ?? 0) > 0
}

/** Check if tool is an effect node */
export function isEffectNode(tool: UIToolDefinition): boolean {
  return tool['x-flow-node-type'] === 'effect'
}
