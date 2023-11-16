import { fileURLToPath, URL } from 'node:url'
import { libInjectCss, scanEntries } from 'vite-plugin-lib-inject-css';
import { defineConfig } from 'vite'
import vitePlugins from './vitePlugins/viteAliases.js'
import vue from '@vitejs/plugin-vue'
import viteHtmlPlugin from './vitePlugins/vite-html-plugin.js';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // es2020 支持 import.meta 语法
    target: 'es2020',
    cssCodeSplit: true,
    // lib: {
    //   name: 'libraryName'
    // }
  },
  rollupOptions: {
    output: {
      preserveModules: false, // Required. This is rollup's default behavior, you'll get a warn message if you set `true`.
    }
  },
  plugins: [
    // libInjectCss(), // For a simple usage
    vue(),
    // Parameters are optional, which is only an alias, aim to make configs concise.
    // libInjectCss({
    //   format: ['es'],
    //   entry: {
    //     index: 'src/main.js', // Don't forget the main entry!
    //     // button: 'src/components/button/index.ts',
    //     // select: 'src/components/select/index.ts',
    //     // Uses with a similar directory structure.
    //     // ...scanEntries([
    //     //   'src/components',
    //     //   // 'src/hooks',
    //     // ])
    //   },
    //   rollupOptions: {
    //     output: {
    //       // Put chunk files at <output>/chunks
    //       chunkFileNames: 'chunks/[name].[hash].js',
    //       // Put chunk styles at <output>/assets
    //       assetFileNames: 'assets/[name][extname]',
    //       entryFileNames: '[name].js',
    //       preserveModules: false, 
    //     },
    //   },
    //   build: {
    //     emptyOutDir: false,
    //   }
    // }),
    vitePlugins(),
    viteHtmlPlugin({
      inject: {
        data: {
          title: '主页',
          menu: [
            'a',
            'b'
          ],
          child: {
            title: '子页面'
          }
        }
      }
    })
  ],
})
