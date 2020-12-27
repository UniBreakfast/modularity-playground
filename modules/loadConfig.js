try {
  require('../config.js')
} catch {
  if (!process.env.PORT) {
    console.log("config.js not found, env.PORT not set so server won't run")
    process.exit(2)
  }
}
