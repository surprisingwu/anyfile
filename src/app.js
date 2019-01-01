const http = require('http')
const path = require('path')
const config = require('./config/defaultConfig')
const route = require('./helper/route')
const {host,port,root} = config

const server = http.createServer((req,res)=>{
  const filePath = path.join(root, req.url)
  route(req,res,filePath)

})

server.listen(port, host, ()=>{
  console.log(`server starts at http://${host}:${port}`);
})