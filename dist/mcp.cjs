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

// src/mcp.ts
var mcp_exports = {};
__export(mcp_exports, {
  collectMCPTools: () => collectMCPTools,
  mcpMetadataToOpenAITools: () => mcpMetadataToOpenAITools,
  mcpToolToOpenAI: () => mcpToolToOpenAI,
  mcpToolToSchema: () => mcpToolToSchema
});
module.exports = __toCommonJS(mcp_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  collectMCPTools,
  mcpMetadataToOpenAITools,
  mcpToolToOpenAI,
  mcpToolToSchema
});
//# sourceMappingURL=mcp.cjs.map