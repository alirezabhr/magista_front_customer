import Product from "./product"

class CartItem {
  product: Product
  count: number

  constructor (product: Product, count = 1) {
    this.product = product
    this.count = count
  }

  increaseCount () {
    this.count += 1
  }

  decreaseCount () {
    this.count = this.count - 1
  }

  static jsonToInstance (jsonCartItem: any) : CartItem {
    return new CartItem(Product.jsonToInstance(jsonCartItem.product), jsonCartItem.count)
  }
}

export default CartItem
