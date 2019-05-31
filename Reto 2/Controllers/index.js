const fs = require('fs')
const Model = require('../models/index')

let Tours = []
// Especificar por que se utilizan:
//   * fs
//   * module.exports
//   * statusCode
//   * setHeader
//   * readFile
//   * writeHead

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

const renderModel = (req, res) => {
  res.writeHead(200)
  res.write(JSON.stringify(Tours.map(e => e)))
  res.end()
}

const postModel = (req, res) => {
  let newTour = new Model.Tour(req.headers.type, req.headers.pais, req.headers.ruta)
  Tours.push(newTour)
  // console.log(data)
  res.writeHead(201, {'Content-type': 'application/json'})
  res.write(JSON.stringify(Tours))
  res.end()
}
module.exports = {
  renderIndex,
  renderModel,
  postModel
}
