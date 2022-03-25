import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import * as path from 'path';

const packageJson = require('./package.json');

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      react(),
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style(name) {
              return `antd/es/${name}/style/css.js`;
            }
          }
        ]
      })
    ],
    define: {
      projectVersion: JSON.stringify(packageJson.version)
    },
    build: {
      sourcemap: false
    },
    server: {
      hmr: {
        overlay: false
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  })
}
