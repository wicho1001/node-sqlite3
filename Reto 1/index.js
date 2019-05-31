const http = require('http')
const url = require('url')
const Controllers = require('./Controllers/index')
const port = 4000
const path = require('path')
const fs = require('fs')

const mimeTypes = {
  'html': 'text/html',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'js': 'text/javascript',
  'css': 'text/css'
}

// Explicar como funciona un router, darle enfasis al de que es el req y el res
// Explicar que es el req.url y el req.method.
// Tambien como funciona el http.createServer y por que le pasamos el Router y concatenamos el listen
const routerUser = (req, res) => {
  if (req.method === 'GET') {
    return Controllers.renderIndex(req, res)
  }
}

const routerModel = (req, res) => {
  if (req.method === 'GET') {
    return Controllers.renderModel(req, res)
  } else if (req.method === 'POST') {
    return Controllers.postModel(req, res)
  }
}

const staticServer = (req, res) => {
  const uri = url.parse(req.url).pathname
  console.log(process.cwd())
  const filename = path.join(process.cwd(), uri)

  fs.readFile(filename, (err, data) => {
    console.log(filename)
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.write('404 Not found')
      return res.end()
    }

    const mimeType = mimeTypes[path.extname(filename).split('.')[1]]
    res.writeHead(200, { 'Content-Type': mimeType })
    res.write(data)
    return res.end()
  })
}

const Router = (req, res) => {
  if (req.url === '/') {
    return routerUser(req, res)
  } else if (req.url === '/tours') {
    return routerModel(req, res)
  }
  staticServer(req, res)
}

http.createServer((Router)).listen(port, () => console.log(`Estoy en http://localhost:${port}`))
