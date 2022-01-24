import CartItem from "./cart_item"

class ShopCartOrder {
  shop_id: number
  shop_name: string
  orderItems: CartItem[]

  constructor (seller_id: number, shopName:string) {
    this.shop_id = seller_id
    this.shop_name = shopName
    this.orderItems = []
  }

  addItem (orderItem: CartItem) {
    this.orderItems.push(orderItem)
  }
}

export default ShopCartOrder
