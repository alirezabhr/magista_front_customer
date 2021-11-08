import { GetterTree, MutationTree, ActionTree } from "vuex"
import { RootState } from '../index'
import Product from "~/models/product"
import OrderItem from "~/models/order_item"
import Shop from "~/models/shop"
import shop from "../shop"

const namespace = 'cart'

interface CartState {
  ordersList: OrderItem[]
  lastAppendedProduct: Product | null
}

const state = () : CartState => ({
  ordersList: [],
  lastAppendedProduct: null
})

const mutations = <MutationTree<CartState>>{
  initialCartStore (state) {
    if (!process.client) { // localStorage is only available on client side
      return
    }
    // initial cart
    const strCart = localStorage.getItem('cart')
    if (strCart) {
      state.ordersList = JSON.parse(strCart)
    }
  },
  setLocalStorageOrderList (state) {
    localStorage.setItem('cart', JSON.stringify(state.ordersList))
  },
  appendItemToOrderList (state, product: Product) {
    state.lastAppendedProduct = product
    const orderIndex = state.ordersList.findIndex((el: OrderItem) => el.product === product)
    if (orderIndex === -1) {  // this product doesn't exist in ordersList
      state.ordersList.push(new OrderItem(product))
    } else {
      state.ordersList[orderIndex].count += 1
    }
  },
  removeItemFromOrderList (state, product: Product) {
    const orderIndex = state.ordersList.findIndex((el: OrderItem) => el.product === product)
    if (orderIndex === -1) {  // this product doesn't exist in ordersList
      // should throw error
      console.log('ERROR in removing item from orders list')
    } else {
      if (state.ordersList[orderIndex].count > 1) {
        state.ordersList[orderIndex].count -= 1
      } else {
        state.ordersList.splice(orderIndex, 1)
      }
    }
  },
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
}

const getters = <GetterTree<CartState, RootState>>{
  getLastAppendedProduct: (state) => {
    return state.lastAppendedProduct
  },
  getCartItemCounts: (state) => {
    let count = 0
    state.ordersList.forEach((order: OrderItem) => {
      count += order.count
    })
    return count
  },
  getOrdersShopList: (state) : Shop[] => {
    let shopsList: Shop[] = []
    state.ordersList.forEach((order: OrderItem) => {
      if (shopsList.findIndex(shop => shop.id === order.product.shop.id) === -1) {
        shopsList.push(order.product.shop)
      }
    })
    return shopsList
  },
  getOrdersList: (state) : OrderItem[] => {
    return state.ordersList
  },
  getCartTotalPrice: (state) : number => {
    let total = 0
    state.ordersList.forEach((order: OrderItem) => {
      total = total + order.count * order.product.price
    })
    return total
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
