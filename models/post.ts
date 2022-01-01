import ProductImage from './product_image'
import Shop from './shop'

class Post {
  id: number
  shop: Shop
  productImages: ProductImage[]
  shortcode: string
  description: string

  constructor (id: number, shop: Shop, productImages: ProductImage[], shortcode: string, description: string) {
    this.id = id
    this.shop = shop
    this.productImages = productImages
    this.shortcode = shortcode
    this.description = description
  }

  toJSON () {
    return { ...this }
  }
}

export default Post
