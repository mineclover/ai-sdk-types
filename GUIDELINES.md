# ai-sdk-types 관리 가이드라인

## 개요

`ai-sdk-types`는 모노레포 내 AI SDK 관련 패키지들이 공유하는 타입 정의 패키지입니다.

### 패키지 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                      ai-sdk-types                           │
│              (공유 타입 - 의존성 없음)                        │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌────────────────────┐
│  ai-sdk-cli   │    │ ai-sdk-server │    │ openrouter-proxy   │
│ (Agent 래퍼)   │◄───│ (WebSocket)   │    │ (CF Worker)        │
└───────────────┘    └───────────────┘    └────────────────────┘
        │
        ▼
┌───────────────────────────┐
│ @anthropic-ai/claude-     │
│ agent-sdk                 │
└───────────────────────────┘
```

### 사용 패키지

| 패키지 | 유형 | 설명 |
|-------|------|-----|
| `ai-sdk-cli` | 라이브러리 | Claude Agent SDK 래퍼 (구조화 출력, 스트리밍) |
| `ai-sdk-server` | 애플리케이션 | WebSocket 서버 (프로젝트/세션 관리) |
| `openrouter-proxy-worker` | Worker | Cloudflare 멀티 프로바이더 프록시 |
| `ai-sdk-ui-vanilla` | 라이브러리 | 바닐라 JS UI 컴포넌트 |

---

## 모듈 구조

```
ai-sdk-types/src/
├── index.ts        # 메인 진입점 (모든 모듈 re-export)
├── messages.ts     # 메시지 타입 (Message, ToolCall, ToolDefinition)
├── providers.ts    # 프로바이더 타입 (Provider, ClaudeModel, ProviderCredentials)
├── usage.ts        # 토큰 사용량 타입 (UsageInfo, TokenPricing)
└── stream.ts       # 스트리밍 타입 (ChatRequest, ChatResponse, StreamChunk)
```

### Import 경로
```typescript
// 전체 import
import { Provider, UsageInfo, ChatRequest } from 'ai-sdk-types'

// 모듈별 import (권장)
import type { Provider, ClaudeModel } from 'ai-sdk-types/providers'
import type { UsageInfo } from 'ai-sdk-types/usage'
import { estimateTokens } from 'ai-sdk-types/usage'
```

---

## 타입 분류 체계

### 1. Core Types (messages.ts)
기본 메시지 구조와 도구 정의

| 타입 | 용도 | 비고 |
|-----|------|-----|
| `MessageRole` | 메시지 역할 | 'user' \| 'assistant' \| 'system' \| 'tool' |
| `Message` | 기본 메시지 | role, content |
| `MessageContent` | 메시지 내용 부품 | text, image, tool_use, tool_result |
| `ToolCall` | 도구 호출 | id, name, arguments |
| `ToolDefinition` | 도구 정의 | function schema |
| `MessagePart` | 메시지 파트 유니온 | TextPart \| ToolCallPart \| ToolResultPart |
| `TextPart` | 텍스트 파트 | type: 'text', text |
| `ToolCallPart` | 도구 호출 파트 | type: 'tool-call', toolCallId, toolName, args |
| `ToolResultPart` | 도구 결과 파트 | type: 'tool-result', toolCallId, toolName, result |

**타입 가드 함수:**
- `isTextPart(part)` - TextPart 여부 확인
- `isToolCallPart(part)` - ToolCallPart 여부 확인
- `isToolResultPart(part)` - ToolResultPart 여부 확인

### 2. Provider Types (providers.ts)
AI 프로바이더 및 모델 타입

| 타입 | 용도 | 비고 |
|-----|------|-----|
| `Provider` | 프로바이더 식별 | 'openai' \| 'anthropic' \| 'google' \| 'openrouter' |
| `ClaudeModel` | Claude 모델 | 'sonnet' \| 'opus' \| 'haiku' + full names |
| `OpenAIModel` | OpenAI 모델 | gpt-4, gpt-4o 등 |
| `GoogleModel` | Google 모델 | gemini-1.5-pro 등 |
| `ProviderCredentials` | API 자격증명 | apiKey, baseUrl 등 |

### 3. Usage Types (usage.ts)
토큰 사용량 및 비용 계산

| 타입 | 용도 | 비고 |
|-----|------|-----|
| `UsageInfo` | 토큰 사용량 | promptTokens, completionTokens, totalTokens |
| `UsageWithCost` | 비용 포함 사용량 | UsageInfo + cost, isByok |
| `TokenPricing` | 모델 가격 | promptPer1k, completionPer1k |

### 4. Stream Types (stream.ts)
스트리밍 통신용 타입

| 타입 | 용도 | 비고 |
|-----|------|-----|
| `ChatRequest` | 채팅 요청 | model, messages, tools 등 |
| `ChatResponse` | 채팅 응답 | OpenAI 호환 형식 |
| `UnifiedChatResponse` | 내부 응답 | 간소화된 프로바이더 응답 형식 |
| `ChatMessage` | OpenAI 메시지 | role, content, tool_calls |
| `StreamChunk` | 스트림 청크 | type: 'stream_chunk' |
| `StreamEnd` | 스트림 종료 | type: 'stream_end', usage |
| `FinishReason` | 종료 사유 | 'stop' \| 'tool-calls' \| 'length' 등 |

**유틸리티 함수:**
- `mapFinishReason(reason)` - FinishReason을 OpenAI 형식으로 변환

---

## 고도화 로드맵

### Phase 1: 내부 중복 제거 ✅ 완료

- [x] `stream.ts`의 `ToolDefinition`을 `messages.ts`에서 import
- [x] `openrouter-proxy-worker/types/env.ts` - `TokenPricing` 제거
- [x] `openrouter-proxy-worker/providers/types.ts` - `ToolCall`, `MessagePart` 제거

### Phase 2: 타입 추가 ✅ 완료

- [x] `MessagePart` 통합 타입 (`TextPart`, `ToolCallPart`, `ToolResultPart`)
- [x] 타입 가드 함수 (`isTextPart`, `isToolCallPart`, `isToolResultPart`)
- [x] `UnifiedChatResponse` - 내부 프로바이더용 간소화 응답 형식

### Phase 3: 유틸리티 강화 (중기)

#### 3.1 타입 가드 추가
```typescript
// guards.ts 신규 파일
export function isToolCall(part: MessagePart): part is ToolCallPart
export function isToolResult(part: MessagePart): part is ToolResultPart
export function isChatMessage(msg: unknown): msg is ChatMessage
```

#### 3.2 변환 함수 추가
```typescript
// transformers.ts 신규 파일
export function toOpenAIMessage(msg: Message): ChatMessage
export function fromOpenAIMessage(msg: ChatMessage): Message
export function normalizeFinishReason(reason: string): FinishReason
```

### Phase 4: 문서화 (지속)

- JSDoc 주석 완비
- 사용 예제 추가
- 마이그레이션 가이드 작성

---

## 신규 타입 추가 가이드

### 체크리스트

1. **중복 확인**
   - [ ] ai-sdk-types 내 유사 타입 존재 여부
   - [ ] 다른 패키지에 동일 타입 존재 여부

2. **분류 결정**
   - [ ] 어느 모듈에 속하는가? (messages/providers/usage/stream)
   - [ ] 새 모듈이 필요한가?

3. **호환성 검토**
   - [ ] 기존 타입과 충돌하는가?
   - [ ] Breaking change인가?

4. **문서화**
   - [ ] JSDoc 주석 작성
   - [ ] GUIDELINES.md 업데이트

### 타입 추가 절차

```bash
# 1. 타입 정의 추가
# packages/ai-sdk-types/src/{module}.ts

# 2. index.ts에서 export
# packages/ai-sdk-types/src/index.ts

# 3. 빌드
pnpm --filter ai-sdk-types build

# 4. 타입 체크
pnpm --filter ai-sdk-types type-check
pnpm --filter ai-sdk-cli tsc --noEmit -p tsconfig.build.json
pnpm --filter @packages/ai-proxy-worker type-check
pnpm --filter ai-sdk-server build
```

---

## 패키지별 사용 가이드

### ai-sdk-cli
```typescript
// 최소한의 import만 사용
import type { ClaudeModel } from 'ai-sdk-types'

// 패키지 고유 타입은 로컬 정의 유지
// JSONSchema, QueryOptions 등은 @anthropic-ai/claude-agent-sdk 의존
```

### ai-sdk-server
```typescript
// Re-export 패턴 사용
export type { ClaudeModel, UsageInfo } from 'ai-sdk-types'
export { estimateTokens, estimatePromptTokens } from 'ai-sdk-types'

// 프로토콜 타입은 로컬 정의
// ClientMessage, ServerMessage 등 WebSocket 전용 타입
```

### openrouter-proxy-worker
```typescript
// Provider 관련 타입 사용
import type { Provider, ProviderCredentials } from 'ai-sdk-types'
import type { ToolDefinition, UsageInfo } from 'ai-sdk-types'
import { estimateTokens, mapFinishReason } from 'ai-sdk-types'

// Cloudflare 특화 타입은 로컬 정의 (Env, D1Database 등)
```

### ai-sdk-ui-vanilla
```typescript
// 스트림 타입 위주 사용
import type {
  ChatMessage,
  ChatRequest,
  ChatResponse,
  FinishReason,
  ToolDefinition,
  UsageInfo
} from 'ai-sdk-types'

// UI 전용 타입은 로컬 정의 (MessagePart with ReasoningPart, ChatState 등)
```

---

## 버전 관리

### Semantic Versioning
- **MAJOR**: Breaking changes (타입 제거, 필수 필드 추가)
- **MINOR**: 신규 타입/필드 추가 (하위 호환)
- **PATCH**: 문서, 주석 수정

### Breaking Change 처리
```typescript
// Deprecated 표시 후 다음 major에서 제거
/** @deprecated Use `UnifiedChatResponse` instead */
export interface ChatResponse { ... }
```

---

## 모델 목록 동기화

`getProviderFromModel()` 함수와 각 패키지의 모델 맵 동기화 필요:

### 동기화 대상
1. `ai-sdk-types/src/providers.ts` - `getProviderFromModel()`
2. `openrouter-proxy-worker/src/providers/unified.ts` - `MODEL_PROVIDER_MAP`

### 신규 모델 추가 시
1. `providers.ts`의 Model 타입에 추가
2. `getProviderFromModel()` 함수 업데이트
3. 관련 패키지의 모델 맵 업데이트
4. 가격 정보 업데이트 (필요시)

---

## 참고 자료

- [Vercel AI SDK Types](https://sdk.vercel.ai/docs/foundations/overview)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Anthropic API Reference](https://docs.anthropic.com/en/api)
