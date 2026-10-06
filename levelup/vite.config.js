import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// npm run build         → dist/ (GitHub Pages 등 웹 배포용)
// npm run build:single  → standalone/index.html (파일 하나로 더블클릭 실행, 아이콘은 옆 파일)
export default defineConfig(({ mode }) => ({
  plugins: mode === 'single' ? [react(), viteSingleFile()] : [react()],
  base: './',
  build: mode === 'single' ? { outDir: 'standalone', emptyOutDir: true } : {},
}))
