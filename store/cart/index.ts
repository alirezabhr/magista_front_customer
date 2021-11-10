import { GetterTree, MutationTree, ActionTree } from "vuex"
import { RootState } from '../index'
import Product from "~/models/product"
import OrderItem from "~/models/order_item"
import ShopOrder from "~/models/shop_order"
import Invoice from "~/models/invoice"

const namespace = 'cart'

interface CartState {
  cart: ShopOrder[]
  lastAppendedProduct: Product | null
  paymentPendingInvoices: Invoice[]
}

const state = () : CartState => ({
  cart: [],
  lastAppendedProduct: null,
  paymentPendingInvoices: []
})

const mutations = <MutationTree<CartState>>{
  initialCartStore (state) {
    if (!process.client) { // localStorage is only available on client side
      return
    }
    // initial cart
    const strCart = localStorage.getItem('cart')
    if (strCart) {
      state.cart = JSON.parse(strCart)
    }
  },
  setLocalStorageOrderList (state) {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  appendItemToOrderList (state, product: Product) {
    state.lastAppendedProduct = product

    const shopOrderIndex = state.cart.findIndex((el: ShopOrder) => el.shop_id === product.shop.id)
    if (shopOrderIndex === -1) {  // don't have any products from this shop
      const shopOrder = new ShopOrder(product.shop.id, product.shop.instagramUsername)
      shopOrder.addItem(new OrderItem(product))
      state.cart.push(shopOrder)
    } else {  // have some products from this shop
      const orderItemIndex = state.cart[shopOrderIndex].orders.findIndex(
        (order: OrderItem) => order.product === product)

      if (orderItemIndex === -1) {  // this product does not exist in the cart
        const orderItem = new OrderItem(product)
        state.cart[shopOrderIndex].orders.push(orderItem)
      } else {  // you had ordered this product before
        state.cart[shopOrderIndex].orders[orderItemIndex].count += 1
      }
    }
  },
  removeItemFromOrderList (state, product: Product) {
    const shopOrderIndex = state.cart.findIndex((el: ShopOrder) => el.shop_id === product.shop.id)
    if (shopOrderIndex === -1) {  // don't have any products from this shop
      console.log('ERROR Occured in removing item from cart') // TODO throw an erro
    } else {  // have some products from this shop
      const orderItemIndex = state.cart[shopOrderIndex].orders.findIndex(
        (order: OrderItem) => order.product === product)

      if (orderItemIndex === -1) {  // this product does not exist in the cart
        console.log('ERROR Occured in removing item from cart') // TODO throw an erro
      } else {  // you had ordered this product before
        if (state.cart[shopOrderIndex].orders[orderItemIndex].count > 1) {
          state.cart[shopOrderIndex].orders[orderItemIndex].count -= 1
        } else {
          state.cart[shopOrderIndex].orders.splice(orderItemIndex, 1)
        }
      }
    }
  },
  clearCart (state) {
    state.cart = []
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  setPaymentPendingInvoices (state, invoices: Invoice[]) {
    state.paymentPendingInvoices = invoices
  }
}

const actions = <ActionTree<CartState, RootState>>{
  addItemToCart (vuexContext, product) {
    vuexContext.commit('appendItemToOrderList', product)
    vuexContext.commit('setLocalStorageOrderList')
  },
  removeItemFromCart (vuexContext, product) {
    vuexContext.commit('removeItemFromOrderList', product)
    vuexContext.commit('setLocalStorageOrderList')
  },
  createCartInvoices (vuexContext) {
    const url = process.env.baseURL + 'shop/cart/'

    let payload: {
      customer_id: number
      cart: ShopOrder[]
    }
    payload = {
      customer_id: vuexContext.rootGetters['auth/getCustomerId'],
      cart: vuexContext.getters.getCart
    }

    return this.$client.post(url, payload).then((response) => {
      vuexContext.commit('setPaymentPendingInvoices', response.data)
      vuexContext.commit('clearCart')
    }).catch((e) => {
      throw e.response
    })
  },
  payPendingInvoices (vuexContext) {
    const url = process.env.baseURL + 'shop/cart/'
    const payload = vuexContext.getters.getPaymentPendingInvoices
    console.log('in payPendingInvoices')
    console.log(payload)

    return this.$client.put(url, payload).then((response) => {
      console.log('paid succussfully')
    }).catch((e) => {
      throw e.response
    })
  }
}

const getters = <GetterTree<CartState, RootState>>{
  getLastAppendedProduct: (state) => {
    return state.lastAppendedProduct
  },
  getCartItemCounts: (state) => {
    let count = 0
    state.cart.forEach((shopOrder: ShopOrder) => {
      shopOrder.orders.forEach((orderItem: OrderItem) => {
        count += orderItem.count
      })
    })
    return count
  },
  getCartTotalPrice: (state) => {
    let total = 0
    state.cart.forEach((shopOrder: ShopOrder) => {
      shopOrder.orders.forEach((orderItem: OrderItem) => {
        total = total + orderItem.count * orderItem.product.price
      })
    })
    return total
  },
  getCart: (state) : ShopOrder[] => {
    return state.cart
  },
  getPaymentPendingInvoices: (state) : Invoice[] => {
    return state.paymentPendingInvoices
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
