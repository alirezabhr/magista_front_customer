class Product {
  constructor (shop, price, shortcode, title, description, displayImage, rate) {
    this.shop = shop
    this.price = price
    this.shortcode = shortcode
    this.title = title
    this.description = description
    this.displayImage = displayImage
    this.rate = rate
  }

  toJSON () {
    return { ...this }
  }
}

export default Product
