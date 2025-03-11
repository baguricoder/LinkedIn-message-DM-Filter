import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,  // Ensure this matches the port you're running
    host: true,  // Allow access from network devices
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});