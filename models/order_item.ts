import Product from "./product"

class OrderItem {
  product: Product
  count: number

  constructor (product: Product, count = 0) {
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
