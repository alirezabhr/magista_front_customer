const state = () => ({
  orderList: [],
  lastAppendedProduct: null,
  showAddToCart: false
})

const mutations = {
  setLocalStorageOrderList (state) {
    localStorage.setItem('cart', JSON.stringify(state.orderList))
  },
  appendItemToOrderList (state, productPrice) {
    state.lastAppendedProduct = productPrice
    state.orderList.push(productPrice)
    this.setLocalStorageOrderList()
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
  addItemToCart (vuexContext, productPrice) {
    vuexContext.commit('appendItemToOrderList', productPrice)
    vuexContext.commit('setShowAddToCart', true)
  }
}

const getters = {
  getLocalStorageOrderList: (state) => {
    state.orderList = JSON.parse(localStorage.getItem('cart'))
    return state.orderList
  },
  getShowAddToCartStatus: (state) => {
    return state.showAddToCart
  },
  getLastAppendedProduct: (state) => {
    return state.lastAppendedProduct
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
