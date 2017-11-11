class Log {
  static debug(msg) {
    console.log(`DEBUG: ${msg}`)
  }

  static info(msg) {
    console.log(`INFO: ${msg}`)
  }
}

module.exports = Log
