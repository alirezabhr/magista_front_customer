import CartItem from '@/models/cart_item'
import Shop from './shop'

class ShopCartOrder {
  shopId: number
  shop: Shop
  deliveryId: number
  orderItems: CartItem[]

  constructor (shopId: number, shop: Shop) {
    this.shopId = shopId
    this.shop = shop
    this.deliveryId = 0
    this.orderItems = []
  }

  addItem (orderItem: CartItem) {
    this.orderItems.push(orderItem)
  }
}

export default ShopCartOrder
