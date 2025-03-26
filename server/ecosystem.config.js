module.exports = {
  apps: [
    {
      name: "SPACE SYSTEM",
      script: "dist/src/server.js", // Directly point to the built file
      exec_mode: "cluster", // Use "cluster" instead of "fork" for multi-core usage
      instances: "max", // Runs as many instances as CPU cores
      autorestart: true, // Automatically restart on crash
      watch: true, // Set to true if you want PM2 to restart on file changes
      env_production: {
        NODE_ENV: "production",
        PORT: 5000,
      },
      env: {
        NODE_ENV: "development",
        PORT: 5000,
      },
    },
  ],
};
