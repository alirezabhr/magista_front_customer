import ProductImage from './product_image'
import Shop from './shop'

class Post {
  id: number
  shop: Shop
  previewImage: string
  shortcode: string
  description: string

  constructor (id: number, shop: Shop, previewImage: string, shortcode: string, description: string) {
    this.id = id
    this.shop = shop
    this.previewImage = previewImage
    this.shortcode = shortcode
    this.description = description
  }

  toJSON () {
    return { ...this }
  }
}

export default Post
