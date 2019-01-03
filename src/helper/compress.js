const { createGzip, createDeflate} = require('zlib')

module.exports = (rs, req, res) => {
  const compressType = req.headers['accept-encoding']

  if (!compressType || !compressType.match(/\b(gzip|deflate)\b/)) {
    return rs
  } else if (compressType.match(/\bgzip\b/)) { 
    res.setHeader('Content-Encoding','gzip')
    return rs.pipe(createGzip())
  } else if (compressType.match(/\bdeflate\b/)) { 
    res.setHeader('Content-Encoding','deflate')
   return rs.pipe(createDeflate())
  } 
}