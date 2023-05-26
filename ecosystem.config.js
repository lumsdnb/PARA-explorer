module.exports = {
  apps: [
    {
      name: 'canvas-explorer',
      script: 'build/index.js',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
