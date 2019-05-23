const fs = require('fs')
const Model = require('../models/index')
const db = require('../index')

// Especificar por que se utilizan:
//   * fs
//   * module.exports
//   * statusCode
//   * setHeader
//   * readFile
//   * writeHead

const crearUsuario = (req, res) => {
  // Creating a user using Prepared Statement
  console.log(req)
  const user = new Model.User(req.headers.name, req.headers.description, req.headers.age)
  db.serialize(async () => {
    const stmt = db.prepare(`INSERT INTO users(name, description, age) VALUES (?, ?)`)
    stmt.run(user.name, user.description, user.age)
    stmt.finalize()
  })
}

// Getting all rows
// db.each('SELECT * FROM users', (err, row) => {
//   if (err) return err
//   console.log(row.name, row.description)
// })
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

// const renderModel = (req, res) => {
//   res.write(JSON.stringify(newData.map(e => e)))
//   res.end()
// }

// const postModel = (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' })
//   console.log(req.body)
//   let newTour = new Model.Tour()
//   console.log(newTour)
//   fs.writeFile('server.json', newTour, (err) => {
//     if (err) { return err }
//     // res.write(newData)
//     // res.send('El tour ha sido registrado')
//     res.end()
//   })
// }

module.exports = {
  renderIndex,
  crearUsuario
}
