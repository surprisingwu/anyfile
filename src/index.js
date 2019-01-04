const Server = require('./app')
const yargs = require('yargs')

const argv = yargs
  .usage('anyfile [options]')
  .option('p', {
    alias: 'port',
    describe: '端口号',
    default: '3000'
  })
  .option('h', {
    alias: 'host',
    describe: '域名',
    default: '127.0.0.1'
  })
  .option('d', {
    alias: 'root',
    describe: '根路径',
    default: process.cwd()
  })
  .version()
  .alias('v','version')
  .help()
  .argv

const server = new Server(argv)
server.start()