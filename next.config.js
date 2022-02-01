const path = require('path');

module.exports = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'scss')],
    // quietDeps: true,
  },
  // experimental: {
  //   concurrentFeatures: true,
  // },
};
