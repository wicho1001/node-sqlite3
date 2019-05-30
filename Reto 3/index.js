const http = require('http')
const url = require('url')
const Controllers = require('./Controllers/index')
const port = 3000
const path = require('path')
const fs = require('fs')
const Database = require('./db/database');

const db = new Database('./db/database.db')
const connection = db.getConnection()

connection.serialize(async () => {
  connection.run('CREATE TABLE IF NOT EXISTS users(name VARCHAR(255), description VARCHAR(255), age INT)') // Creating table
})

const mimeTypes = {
  'html': 'text/html',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'js': 'text/javascript',
  'css': 'text/css'
}

// Explicar conexion entre Router y el controller
const routerUser = (req, res) => {
  req.database = connection
  if (req.method === 'GET') {
    return Controllers.renderIndex(req, res)
  } else if (req.method === 'POST') {
    console.log('Aqui vas a mandar un usuario')
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
  }
  staticServer(req, res)
}

http.createServer((Router)).listen(port, () => console.log(`Estoy en http://localhost:${port}`))
module.exports = db
