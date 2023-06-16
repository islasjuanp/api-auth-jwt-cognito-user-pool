import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      all: true,
      include: ['packages/**/*.ts'],
      exclude: ['packages/**/node_modules/**/*.ts', 'packages/**/test/**/*.ts'],
      // Thresholds
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
})