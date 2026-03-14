// Buradaki eklentiler, Vite'in React ve Tailwind dosyalarini nasil isleyecegini belirler.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Yeni plugin eklersen derleme sirasinda yeni yetenekler kazanirsin.
  plugins: [
    react(),
    tailwindcss(),
  ],
})
