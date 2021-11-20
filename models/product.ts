import Shop from "./shop"

class Product {
  id: number
  shop: Shop
  originalPrice: number
  shortcode: string
  title: string
  description: string
  displayImageUrl: string
  rate: number | null

  constructor(id: number, shop: Shop, originalPrice: number, shortcode: string,
    title: string, description: string, displayImage: string, rate: number | null) {

    this.id = id
    this.shop = shop
    this.originalPrice = originalPrice
    this.shortcode = shortcode
    this.title = title
    this.description = description
    this.displayImageUrl = displayImage
    this.rate = rate
  }

  toJSON() {
    return { ...this }
  }
}

export default Product
