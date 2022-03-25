import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import path from 'path';

const packageJson = require('./package.json');

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  console.log('一起看视频当前打包环境: ', process.env.VITE_NODE_ENV);
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
  });
}
