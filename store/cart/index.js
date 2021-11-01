const state = () => ({
  orderList: [],
  lastOrderItem: null,
  showAddToCart: false
})

const mutations = {
  appendItemToOrderList (state, productPrice) {
    state.lastOrderItem = productPrice
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
