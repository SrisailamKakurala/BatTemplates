const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // Point @ to src directory
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']  // Make sure TypeScript extensions are supported
  }
};
