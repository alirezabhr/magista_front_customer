class OrderItem {
  constructor (product, count = 0) {
    this.product = product
    this.count = count
  }

  increaseCount () {
    this.count += 1
  }

  decreaseCount () {
    this.count = this.count - 1
  }
}

export default OrderItem
