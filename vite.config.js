const { createVuePlugin } = require('vite-plugin-vue2');
const path = require('path');

module.exports = {
  plugins: [
    createVuePlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    open: env.VITE_OPEN === 'false',
  }
};
