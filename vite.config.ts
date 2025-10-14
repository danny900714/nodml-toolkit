import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: '公文管理系統 工具箱',
        namespace: 'npm/vite-plugin-monkey',
        version: '0.1.0',
        author: '趙子賢',
        description: {
          zh: '臺南市政府第3代公文管理系統工具箱，提供許多快速輸入及實用功能。'
        },
        icon: 'https://nodml.tainan.gov.tw/SPEED30/Content/images/favicon/favicon-32x32.png',
        match: ['https://nodml.tainan.gov.tw/*'],
      },
    }),
  ],
});
