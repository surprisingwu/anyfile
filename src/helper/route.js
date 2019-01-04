const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const Handlebars = require('handlebars')
const path = require('path')
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const isRefresh = require('./cache')

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())



module.exports = async function(req, res, filePath,config) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      const contentType = mime(filePath)
      res.setHeader('Content-Type', contentType)
      
      if (isRefresh(stats, req, res)) { 
        res.statusCode = 304
        res.end()
        return 
      }

      const { code, start, end } = range(stats.size, req, res)
      let rs
      if (code == 200) {
        res.statusCode = 200
        rs = fs.createReadStream(filePath)
      } else { 
        res.statusCode = 206
        rs = fs.createReadStream(filePath, {start, end})
      }
      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store'
      })
      const dir = path.relative(config.root, filePath)
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => {
          return {
            file,
            icon: mime(file)
          }
        })
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