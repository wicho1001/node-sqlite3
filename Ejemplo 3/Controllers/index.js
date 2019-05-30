const fs = require('fs')
const Model = require('../models/index')

function findUsers(req, res){  
  const { database: db } = req  
    db.all('SELECT * FROM users', (err, rows) => {
    if (err) return err
    // Haz un console.log de row para saber que te esta llegando
    console.log(rows)
    // Inidica que el tipo de contenido que enviaras es un json
    res.writeHead(201, { 'Content-type': 'application/json' })
    res.write(JSON.stringify(rows))
    // res.end(arr.map(e => e))
  })  
}

const renderIndex = (req, res) => {
  fs.readFile('./views/index.html', null, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.write('archivo no encontrado')
      res.end()
      return
    }

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.write(data)
    res.end()
  })
}

module.exports = {
  renderIndex,
  findUsers
}
