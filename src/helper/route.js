const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const Handlebars = require('handlebars')
const config = require('../config/defaultConfig')
const path = require('path')


const tplPath = path.join(__dirname,'../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())



module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    if(stats.isFile()) {
      res.writeHead(200, {
        'Content-Type': 'text/javascript'
      })
      fs.createReadStream(filePath).pipe(res)
    } else if(stats.isDirectory()){
      console.log(filePath);
      const files = await readdir(filePath)
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store'
      })
      const dir = path.relative(config.root, filePath)
      const data = {
        title: path.basename(filePath),
        dir: dir?`/${dir}`: '',
        files
      }
      res.end(template(data))
    }
  } catch (ex) {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    })
    res.end(`${filePath} is not a directory or a file \n ${JSON.stringify(ex)}`)
  }
}