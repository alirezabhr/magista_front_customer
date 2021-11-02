const state = () => ({
  orderList: [],
  lastAppendedProduct: null,
  showAddToCart: false,
  cartItemsCount: 0
})

const mutations = {
  initialStore (state) {
    if (!process.client) { // localStorage is only available on client side
      return
    }

    // initial cartItemsCount
    const strCount = localStorage.getItem('cartItemsCount')
    if (strCount) {
      state.cartItemsCount = Number.parseInt(strCount)
    }

    // initial cart
    const strCart = localStorage.getItem('cart')
    if (strCart) {
      state.orderList = JSON.parse(strCart)
    }
  },
  increaseItemCounts (state) {
    state.cartItemsCount += 1
    localStorage.setItem('cartItemsCount', state.cartItemsCount)
  },
  decreaseItemCounts (state) {
    state.cartItemsCount -= 1
    localStorage.setItem('cartItemsCount', state.cartItemsCount)
  },
  setLocalStorageOrderList (state) {
    localStorage.setItem('cart', JSON.stringify(state.orderList))
  },
  appendItemToOrderList (state, product) {
    state.lastAppendedProduct = product
    state.orderList.push(product)
  },
  removeItemFromOrderList (state, productShortcode) {
    state.orderList.forEach((element) => {
      if (element.product.shortcode === productShortcode) {
        // remove element from array
        this.setLocalStorageOrderList()
      }
    })
  },
  setShowAddToCart (state, boolValue) {
    state.showAddToCart = boolValue
  }
}

const actions = {
  addItemToCart (vuexContext, product) {
    vuexContext.commit('appendItemToOrderList', product)
    vuexContext.commit('setLocalStorageOrderList')
    vuexContext.commit('increaseItemCounts')
    vuexContext.commit('setShowAddToCart', true)
  }
}

const getters = {
  getLocalStorageOrderList: (state) => {
    return state.orderList
  },
  getShowAddToCartStatus: (state) => {
    return state.showAddToCart
  },
  getLastAppendedProduct: (state) => {
    return state.lastAppendedProduct
  },
  cartItemCounts: (state) => {
    return state.cartItemsCount
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
