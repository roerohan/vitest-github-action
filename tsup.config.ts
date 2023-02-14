import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'node14.16',
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true
})
