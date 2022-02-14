import CartItem from "./cart_item"

class ShopCartOrder {
  shopId: number
  shopName: string
  orderItems: CartItem[]

  constructor (sellerId: number, shopName:string) {
    this.shopId = sellerId
    this.shopName = shopName
    this.orderItems = []
  }

  addItem (orderItem: CartItem) {
    this.orderItems.push(orderItem)
  }
}

export default ShopCartOrder
