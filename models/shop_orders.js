class ShopOrders {
  constructor (seller) {
    this.shop = seller
    this.ordersList = []
  }

  addItem (orderItem) {
    this.ordersList.push(orderItem)
  }
}

export default ShopOrders
