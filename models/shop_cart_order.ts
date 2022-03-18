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

  static jsonToInstance (jsonCart: any) : ShopCartOrder {
    const cart = new ShopCartOrder(jsonCart.shopId, Shop.jsonToInstance(jsonCart.shop))
    jsonCart.orderItems.forEach((el:any) => {
      cart.addItem(CartItem.jsonToInstance(el))
    })
    return cart
  }
}

export default ShopCartOrder
