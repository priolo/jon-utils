// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'jon-utils',
      // the proper extensions will be added
      fileName: 'jon-utils'
    },
    rollupOptions: {
      output: {
		dir: './dist',
      }
    }
  }
})
