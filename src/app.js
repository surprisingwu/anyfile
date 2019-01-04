const http = require('http')
const path = require('path')
const conf = require('./config/defaultConfig')
const route = require('./helper/route')
const openUrl = require('./helper/openUrl')


class Server{
  constructor(config = {}) { 
    this.conf = Object.assign({},conf, config)
  }

  start() { 
    const {host,port,root} = this.conf
    const server = http.createServer((req,res)=>{
      const filePath = path.join(root, req.url)
      route(req,res,filePath, this.conf)
    })
    server.listen(port, host, () => {
      const url = `http://${host}:${port}`
      openUrl(url)
      console.log(`server starts at ${url}`);
    })
  }
}

module.exports = Server
