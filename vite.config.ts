import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: '公文管理系統 工具包',
        namespace: 'https://github.com/danny900714/nodml-toolkit',
        copyright: 'Copyright © 趙子賢',
        version: '0.1.0',
        description: {
          zh: '臺南市政府第3代公文管理系統工具包，提供許多自動輸入及實用功能。'
        },
        icon: 'https://nodml.tainan.gov.tw/SPEED30/Content/images/favicon/favicon-32x32.png',
        author: '趙子賢',
        homepage: 'https://github.com/danny900714/nodml-toolkit',
        match: ['https://nodml.tainan.gov.tw/*'],
        tag: ['utilities'],
        updateURL: "https://github.com/danny900714/nodml-toolkit/releases/latest/download/wm-toolkit.meta.js",
        downloadURL: "https://github.com/danny900714/nodml-toolkit/releases/latest/download/wm-toolkit.user.js",
        supportURL: 'https://github.com/danny900714/nodml-toolkit/issues'
      },
      build: {
        metaFileName: true,
      },
    }),
  ],
  build: {
    minify: true,
  },
});
