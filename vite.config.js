import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

const manifestForPlugin = {
  name: 'Last Minute',
  short_name: 'Last Minute',
  description: 'A versatile app for impromptu studies',
  display: 'standalone',
  start_url: '/last-minute/',
  // scope: "/last-minute/",
  // icons: [
  //   {
  //     src: "/pwa-192x192.png",
  //     sizes: "192x192",
  //     type: "image/png",
  //   },
  //   {
  //     src: "/pwa-512x512.png",
  //     sizes: "512x512",
  //     type: "image/png",
  //   },
  // ],
}

// https://vite.dev/config/
export default defineConfig({
  base: '/last-minute/',
  plugins: [react(), tailwindcss(), svgr(), VitePWA(manifestForPlugin)],
  assetsInclude: ['**/*.lottie'],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
      },
    },
  },
})
