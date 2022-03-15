// app.js
import { checkPermission } from './utils/index';

App({
  onLaunch() {
    checkPermission();
  },

  globalData: {
  }
})
