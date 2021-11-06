import OrderItem from "./order_item"

class ShopOrders {
  shop: number
  ordersList: OrderItem[]

  constructor (seller: number) {
    this.shop = seller
    this.ordersList = []
  }

  addItem (orderItem: OrderItem) {
    this.ordersList.push(orderItem)
  }
}

export default ShopOrders
