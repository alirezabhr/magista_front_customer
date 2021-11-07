import { GetterTree, MutationTree, ActionTree } from "vuex"
import { RootState } from '../index'
import ShopOrder from "~/models/shop_order"
import Product from "~/models/product"
import OrderItem from "~/models/order_item"

const namespace = 'cart'

interface CartState {
  orderList: ShopOrder[]
  lastAppendedProduct: Product | null
  showAddToCart: boolean
}

const state = () : CartState => ({
  orderList: [],
  lastAppendedProduct: null,
  showAddToCart: false
})

const mutations = <MutationTree<CartState>>{
  initialStore (state) {
    if (!process.client) { // localStorage is only available on client side
      return
    }
    // initial cart
    const strCart = localStorage.getItem('cart')
    if (strCart) {
      state.orderList = JSON.parse(strCart)
    }
  },
  setLocalStorageOrderList (state) {
    localStorage.setItem('cart', JSON.stringify(state.orderList))
  },
  appendItemToOrderList (state, product: Product) {
    state.lastAppendedProduct = product
    const shopOrderIndex = state.orderList.findIndex((el: ShopOrder) => el.shop === product.shop)
    if (shopOrderIndex === -1) { // there is not any items from this shop
      const shopOrder = new ShopOrder(product.shop)
      shopOrder.addItem(new OrderItem(product, 1))
      state.orderList.push(shopOrder)
    } else {
      const orderItemIndex = state.orderList[shopOrderIndex].ordersList.findIndex((el: OrderItem) => el.product === product)
      if (orderItemIndex === -1) { // this product doesn't exist in this orderList
        state.orderList[shopOrderIndex].ordersList.push(new OrderItem(product, 1))
      } else {
        state.orderList[shopOrderIndex].ordersList[orderItemIndex].count += 1
      }
    }
  },
  removeItemFromOrderList (state, productShortcode) {
    // state.orderList.forEach((element) => {
    //   if (element.product.shortcode === productShortcode) {
    //     // remove element from array
    //     this.setLocalStorageOrderList()
    //   }
    // })
  },
  setShowAddToCart (state, boolValue) {
    state.showAddToCart = boolValue
  }
}

const actions = <ActionTree<CartState, RootState>>{
  addItemToCart (vuexContext, product) {
    vuexContext.commit('appendItemToOrderList', product)
    vuexContext.commit('setLocalStorageOrderList')
    vuexContext.commit('setShowAddToCart', true)
  }
}

const getters = <GetterTree<CartState, RootState>>{
  getLocalStorageOrderList: (state) => {
    return state.orderList
  },
  getShowAddToCartStatus: (state) => {
    return state.showAddToCart
  },
  getLastAppendedProduct: (state) => {
    return state.lastAppendedProduct
  },
  getCartItemCounts: (state) => {
    let count = 0
    state.orderList.forEach((shopOrder: ShopOrder) => {
      count += shopOrder.ordersList.length
    })
    return count
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
