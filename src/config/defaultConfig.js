module.exports = {
  host: '127.0.0.1',
  port: '3000',
  root: process.cwd(),
  compress: /\.(html|js|md|css)/,
  cache: {
    maxAge: 600,
    expires: true,
    lastModified: true,
    cacheControl: true,
    eTag: true
  }
}