module.exports = function determineType(fileName) {
  const extMatch = fileName.match(/\.([^\/.]*)$/)
  const ext = extMatch && extMatch[1] || ''
  const type = types[ext]
  if (!type) console.log('No header for type .'+ext)
  return type
}


const utf = '; charset=utf-8'
const types = {
  '': 'text/html'+utf,
  html: 'text/html'+utf,
  htm: 'text/html'+utf,
  svg: 'image/svg+xml'+utf,
  css: 'text/css'+utf,
  js: 'text/javascript'+utf,
  cjs: 'text/javascript'+utf,
  mjs: 'text/javascript'+utf,
  json: 'application/json'+utf,
  xml: 'application/xml'+utf,
  ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  png: 'image/png',
  txt: 'text/plain'+utf,
  wav: 'audio/wav',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  ttf: 'application/font-ttf',
  eot: 'application/vnd.ms-fontobject',
  otf: 'application/font-otf',
  woff: 'application/font-woff',
  wasm: 'application/wasm',
  zip: 'application/zip',
  rar: 'application/vnd.rar',
}
