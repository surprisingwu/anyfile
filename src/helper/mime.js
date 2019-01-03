const path = require('path')

const mime = {
  'js': 'text/javascript',
  'html': 'text/html',
  'css': 'text/css',
  'ico': 'image/x-icon',
  'gif': 'image/gif',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpg',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tiff': 'image/tiff',
  'txt': 'text/plain',
  'wav': 'audio/x-wav',
  'wma': 'audio/x-ms-wma',
  'wmv': 'video/x-ms-wmv',
  'xml': 'text/xml'
}

module.exports = (filePath) => {
  let extname = path.extname(filePath)
    .split('.')
    .pop()
    .toLowerCase()
  
  if (!extname) { 
    extname = filePath
  }

  return mime[extname] || mime['txt']
}