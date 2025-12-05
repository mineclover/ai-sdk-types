# ai-sdk-types

AI SDK 패키지들이 공유하는 타입 정의 패키지입니다.

## 설치

```bash
pnpm add ai-sdk-types
```

## 사용법

```typescript
// 전체 import
import { Provider, UsageInfo, ChatRequest, ToolDefinition } from 'ai-sdk-types'

// 모듈별 import
import type { Provider, ClaudeModel } from 'ai-sdk-types/providers'
import type { UsageInfo } from 'ai-sdk-types/usage'
import { estimateTokens, estimatePromptTokens } from 'ai-sdk-types/usage'
import { mapFinishReason } from 'ai-sdk-types/stream'
import { isToolCallPart, isToolResultPart } from 'ai-sdk-types/messages'
```

## 모듈 구조

```
ai-sdk-types/
├── messages   # 메시지 타입 (Message, ToolCall, MessagePart)
├── providers  # 프로바이더 타입 (Provider, ClaudeModel)
├── usage      # 토큰 사용량 타입 (UsageInfo, TokenPricing)
├── stream     # 스트리밍 타입 (ChatRequest, ChatResponse)
└── tools      # AI SDK 5 호환 도구 타입 (Tool, toOpenAITools)
```

## 주요 타입

### Messages
- `Message`, `MessageRole`, `MessageContent`
- `ToolCall`, `ToolDefinition` (OpenAI 와이어 포맷)
- `MessagePart`, `TextPart`, `ToolCallPart`, `ToolResultPart`
- 타입 가드: `isTextPart()`, `isToolCallPart()`, `isToolResultPart()`

### Tools (AI SDK 5 호환)
- `Tool<TInput, TOutput>` - 내부 도구 정의 (execute 함수 포함)
- `ToolSchema` - execute 없는 스키마 전용
- `ToolExecutionOptions` - 실행 옵션 (toolCallId, abortSignal)
- `JSONSchema` - JSON Schema 타입
- `OpenAIToolDefinition` - OpenAI API 와이어 포맷
- `toOpenAITool(name, tool)` - Tool → OpenAI 포맷 변환
- `toOpenAITools(tools)` - Tool 레지스트리 일괄 변환

```typescript
import { Tool, toOpenAITools } from 'ai-sdk-types'

// 내부 도구 정의 (AI SDK 5 포맷)
const myTool: Tool<{ query: string }, { result: string }> = {
  description: 'Search for information',
  inputSchema: {
    type: 'object',
    properties: { query: { type: 'string' } },
    required: ['query'],
  },
  execute: async (input) => ({ result: `Found: ${input.query}` }),
}

// API 호출 시 OpenAI 포맷으로 변환
const openaiTools = toOpenAITools({ search: myTool })
```

### Providers
- `Provider`: `'openai' | 'anthropic' | 'google' | 'openrouter'`
- `ClaudeModel`, `OpenAIModel`, `GoogleModel`, `Model`
- `ProviderCredentials`
- `getProviderFromModel(model: string): Provider`

### Usage
- `UsageInfo`: `{ promptTokens, completionTokens, totalTokens }`
- `UsageWithCost`, `TokenPricing`
- `estimateTokens(text)`, `estimatePromptTokens(messages)`

### Stream
- `ChatRequest`, `ChatMessage`, `ChatResponse`
- `UnifiedChatResponse` (내부 프로바이더용)
- `StreamChunk`, `StreamEnd`, `StreamError`
- `FinishReason`, `mapFinishReason()`

## 사용 패키지

- `ai-sdk-cli` - Claude Agent SDK 래퍼
- `ai-sdk-server` - WebSocket 서버
- `openrouter-proxy-worker` - Cloudflare Worker 프록시
- `ai-sdk-ui-vanilla` - UI 라이브러리
- `pptx-extractor` - PPTX 파서 (Tool 타입 사용)

## 문서

상세한 관리 가이드라인은 [GUIDELINES.md](./GUIDELINES.md)를 참조하세요.
