import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'index',
      // the proper extensions will be added
      fileName: 'index'
    },
    outDir: resolve(__dirname, './dist'),
    // rollupOptions: {
    //   output: {
    // 	dir: './dist',
    //   }
    // }
  },
  plugins: [dts()]
  // resolve: {
  //     alias: [
  //         // put your alias here
  //     ]
  // },
})
