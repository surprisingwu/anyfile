module.exports = (totalSize, req, res) => {
  const range = req.headers['range']
  // 200: 正常请求    206: 范围请求
  if (!range) { 
    return {
      code: 200
    }
  } 
  // Range: bytes = start - end
  // Range: bytes = start
  const rangeArr = range.match(/bytes=(\d*)-*(\d*)/)
  const end = rangeArr[2] || totalSize - 1
  const start = rangeArr[1] || totalSize - end
  if (start > end || start < 0 || end > totalSize) { 
    return {
      code: 200
    }
  }
  res.setHeader('Accept-Ranges', 'bytes')
  res.setHeader('Content-Range',`bytes ${start}-${end}/${totalSize}`)
  res.setHeader('Content-Length',`${end-start}`)
  return {
    code: 206, 
    start: parseInt(start),
    end: parseInt(end)
  }

}
