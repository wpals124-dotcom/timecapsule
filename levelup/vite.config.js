import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// npm run build         → dist/ (GitHub Pages 등 웹 배포용)
// npm run build:single  → standalone/index.html (파일 하나로 더블클릭 실행)
// 파일 하나 버전에는 아이콘 · manifest 파일이 없으니 링크도 뺀다
const stripPwaLinks = {
  name: 'strip-pwa-links',
  transformIndexHtml: (html) => html.replace(/\s*<link rel="(manifest|icon|apple-touch-icon)"[^>]*>/g, ''),
}

export default defineConfig(({ mode }) => ({
  plugins: mode === 'single' ? [react(), viteSingleFile(), stripPwaLinks] : [react()],
  base: './',
  build: mode === 'single' ? { outDir: 'standalone', copyPublicDir: false, emptyOutDir: true } : {},
}))
