"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  collectMCPTools: () => collectMCPTools,
  estimatePromptTokens: () => import_zod_schema4.estimatePromptTokens,
  estimateTokens: () => import_zod_schema4.estimateTokens,
  getProviderFromModel: () => import_zod_schema2.getProviderFromModel,
  hasFlowExtensions: () => hasFlowExtensions,
  hasUIExtensions: () => hasUIExtensions,
  hasUIToolExtensions: () => hasUIToolExtensions,
  isEffectNode: () => isEffectNode,
  isQueryNode: () => isQueryNode,
  isTextPart: () => import_zod_schema.isTextPart,
  isToolCallPart: () => import_zod_schema.isToolCallPart,
  isToolResultPart: () => import_zod_schema.isToolResultPart,
  mapFinishReason: () => import_zod_schema3.mapFinishReason,
  mcpMetadataToOpenAITools: () => mcpMetadataToOpenAITools,
  mcpToolToOpenAI: () => mcpToolToOpenAI,
  mcpToolToSchema: () => mcpToolToSchema,
  toOpenAITool: () => toOpenAITool,
  toOpenAITools: () => toOpenAITools
});
module.exports = __toCommonJS(index_exports);

// src/mcp.ts
function mcpToolToSchema(tool) {
  return {
    description: tool.description,
    inputSchema: tool.inputSchema,
    outputSchema: tool.outputSchema
  };
}
function mcpToolToOpenAI(name, tool) {
  return {
    type: "function",
    function: {
      name,
      description: tool.description,
      parameters: {
        type: "object",
        properties: tool.inputSchema.properties ?? {},
        required: tool.inputSchema.required
      }
    }
  };
}
function mcpMetadataToOpenAITools(metadata) {
  return metadata.tools.map((tool) => mcpToolToOpenAI(tool.name, tool));
}
function collectMCPTools(sources) {
  const openaiTools = [];
  const aiTools = {};
  const summary = {};
  for (const [namespace, metadata] of Object.entries(sources)) {
    summary[namespace] = metadata.tools.length;
    for (const tool of metadata.tools) {
      const fullName = `${namespace}:${tool.name}`;
      openaiTools.push(mcpToolToOpenAI(fullName, tool));
      aiTools[fullName] = mcpToolToSchema(tool);
    }
  }
  return {
    openaiTools,
    aiTools,
    summary,
    totalTools: openaiTools.length
  };
}

// src/messages.ts
var import_zod_schema = require("@packages/zod-schema");

// src/providers.ts
var import_zod_schema2 = require("@packages/zod-schema");

// src/stream.ts
var import_zod_schema3 = require("@packages/zod-schema");

// src/tools.ts
function toOpenAITool(name, tool) {
  return {
    type: "function",
    function: {
      name,
      description: tool.description,
      parameters: {
        type: "object",
        properties: tool.inputSchema.properties ?? {},
        required: tool.inputSchema.required
      }
    }
  };
}
function toOpenAITools(tools) {
  return Object.entries(tools).map(([name, tool]) => toOpenAITool(name, tool));
}

// src/usage.ts
var import_zod_schema4 = require("@packages/zod-schema");

// src/ui-schema.ts
function hasUIExtensions(schema) {
  return Object.keys(schema).some((key) => key.startsWith("x-"));
}
function hasUIToolExtensions(tool) {
  return Object.keys(tool).some((key) => key.startsWith("x-")) || hasUIExtensions(tool.inputSchema);
}
function hasFlowExtensions(tool) {
  return Object.keys(tool).some((key) => key.startsWith("x-flow-"));
}
function isQueryNode(tool) {
  return tool["x-flow-node-type"] === "query" || (tool["x-flow-branches"]?.length ?? 0) > 0;
}
function isEffectNode(tool) {
  return tool["x-flow-node-type"] === "effect";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  collectMCPTools,
  estimatePromptTokens,
  estimateTokens,
  getProviderFromModel,
  hasFlowExtensions,
  hasUIExtensions,
  hasUIToolExtensions,
  isEffectNode,
  isQueryNode,
  isTextPart,
  isToolCallPart,
  isToolResultPart,
  mapFinishReason,
  mcpMetadataToOpenAITools,
  mcpToolToOpenAI,
  mcpToolToSchema,
  toOpenAITool,
  toOpenAITools
});
//# sourceMappingURL=index.cjs.map