import { defineConfig } from 'vite';

const viteConfig = defineConfig({
  server: {
    host: 'localhost',
    port: 3000,
    cors: true,
  }
});

export default viteConfig;