import Shop from "./shop"

class Product {
  id: number
  shop: Shop
  finalPrice: number
  originalPrice: number
  shortcode: string
  title: string
  description: string
  displayImageUrl: string
  rate: number | null
  isExisting: boolean
  discountPercent: number | null
  discountDescription: string

  constructor(id: number, shop: Shop, finalPrice: number, originalPrice: number, shortcode: string,
    title: string, description: string, displayImage: string, rate: number | null, isExisting: boolean,
    discountPercent: number | null, discountDescription: string) {

    this.id = id
    this.shop = shop
    this.finalPrice = finalPrice
    this.originalPrice = originalPrice
    this.shortcode = shortcode
    this.title = title
    this.description = description
    this.displayImageUrl = displayImage
    this.rate = rate
    this.isExisting = isExisting
    this.discountPercent = discountPercent
    this.discountDescription = discountDescription
  }

  toJSON() {
    return { ...this }
  }
}

export default Product
