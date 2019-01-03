const { cache } = require('../config/defaultConfig')

const refreshRes = (stats, res) => {
  const {maxAge, lastModified, expires, eTag, cacheControl} = cache

  if (lastModified) { 
    res.setHeader('Last-Modified', stats.mtime.toUTCString())
  }
  if (expires) { 
    res.setHeader('Expires', (new Date(Date.now()+maxAge*1000)).toUTCString())
  }
  if (cacheControl) { 
    res.setHeader('Cache-Control', `public,max-age=${maxAge}`)
  }

  if (eTag) { 
    res.setHeader('ETag',`${stats.size}-${stats.mtime.toUTCString()}`)
  }
}

module.exports = (stats, req, res) => {
  // 先进行初始化
  refreshRes(stats, res)

  const lastModified = req.headers['if-modified-since']
  const eTag = req.headers['if-none-match']

  if (!lastModified && !eTag) return false

  if (lastModified && lastModified != res.getHeader('Last-Modified')) return false
  if (eTag && eTag != res.getHeader('ETag')) return false
   

  return true
}