module.exports = {
  apps: [{
    name: "portfolio",
    script: "./dist/server/entry.mjs",
    instances: 1,
    exec_mode: "fork",
    env: {
      PORT: 3000,
      HOST: "0.0.0.0",
      NODE_ENV: "production"
    }
  }]
}
