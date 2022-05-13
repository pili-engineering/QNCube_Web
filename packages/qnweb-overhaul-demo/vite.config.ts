import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';

const packageJson = require('./package.json')

console.log('当前环境: ', process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
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
    RTCSDKVersion: JSON.stringify(packageJson.dependencies['pili-rtc-web']),
    projectVersion: JSON.stringify(packageJson.version)
  }
});
