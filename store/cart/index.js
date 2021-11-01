const state = () => ({
  orderList: [],
  lastAppendedProduct: null,
  showAddToCart: false
})

const mutations = {
  appendItemToOrderList (state, productPrice) {
    state.lastAppendedProduct = productPrice
    state.orderList.push(productPrice)
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
