import OrderItem from "./order_item"

class ShopOrder {
  shop_id: number
  shop_name: string
  orderItems: OrderItem[]

  constructor (seller_id: number, shopName:string) {
    this.shop_id = seller_id
    this.shop_name = shopName
    this.orderItems = []
  }

  addItem (orderItem: OrderItem) {
    this.orderItems.push(orderItem)
  }
}

export default ShopOrder
