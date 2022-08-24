import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  console.log('课堂当前打包环境: ', process.env.VITE_NODE_ENV);
  return defineConfig({
    plugins: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
      mainVersion: JSON.stringify(packageJson.version)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  });
}
