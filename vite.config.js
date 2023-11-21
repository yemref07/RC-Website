import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import pluginPurgeCss from '@mojojoejo/vite-plugin-purgecss'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/s',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    pluginPurgeCss({
      css: ['/css/bootstrap.min.css'],
      content: ['index.html', '**/*.js', '**/*.html', '**/*.vue'],
      variables: false,
      safelist: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /data-v-.*/,
        'vue-tel-input',
        'vue-date-picker',
        'swiper-container',
        'swiper-slide',
        'el-select',
        'el-dropdown',
        'el-dropdown-menu',
        'el-input',
        'el-option-group',
        'el-dialog',
        'el-collapse',
        'el-icon',
        'el-image',
        /el.*/,
        /swiper.*/,
      ],
      rejected: true,
      dynamicAttributes: ['aria-selected']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
