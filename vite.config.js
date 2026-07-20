import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    setupFiles: ['./src/test/setup.js'],
    css: true,
    clearMocks: true,
    restoreMocks: true
  }
})
