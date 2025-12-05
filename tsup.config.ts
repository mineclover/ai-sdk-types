import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/messages.ts',
    'src/usage.ts',
    'src/providers.ts',
    'src/stream.ts',
    'src/mcp.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
})
