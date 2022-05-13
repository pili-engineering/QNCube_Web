import { defineConfig } from 'vitest/config';
import * as path from 'path';

export default defineConfig({
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  test: {
    environment: 'happy-dom',
  }
});
