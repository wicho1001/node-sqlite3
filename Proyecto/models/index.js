
class Tour {
  constructor (title, type, price, routeImage) {
    this.title = title
    this.type = type
    this.price = price
    this.routeImage = routeImage
    this.createAt = new Date()
  }
}

module.exports = {
  Tour
}

