import OrderItem from "./order_item"

class ShopOrder {
  shop_id: number
  shop_name: string
  orders: OrderItem[]

  constructor (seller_id: number, shopName:string) {
    this.shop_id = seller_id
    this.shop_name = shopName
    this.orders = []
  }

  addItem (orderItem: OrderItem) {
    this.orders.push(orderItem)
  }
}

export default ShopOrder
