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
export {
  collectMCPTools,
  mcpMetadataToOpenAITools,
  mcpToolToOpenAI,
  mcpToolToSchema
};
//# sourceMappingURL=mcp.js.map