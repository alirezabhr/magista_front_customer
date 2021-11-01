import axios from 'axios'

const state = () => ({
  shop: {
    info: null,
    productsPrice: []
  }
})

const mutations = {
  setShopInfoData (state, shopInfoData) {
    state.shop.info = shopInfoData
  },
  setShopProductsPrice (state, productsPriceList) {
    state.shop.productsPrice = productsPriceList
  }
}

const actions = {
  shopInfoData (vuexContext, username) {
    const url = process.env.baseURL + `shops/preview/${username}/`

    return axios.get(url).then((response) => {
      vuexContext.commit('setShopInfoData', response.data)
    })
  },
  shopProducts (vuexContext, username) {
    const url = process.env.baseURL + `p/shop/${username}/products/`

    return axios.get(url).then((response) => {
      vuexContext.commit('setShopProductsPrice', response.data)
    })
  }
}

const getters = {
  getShopInfoData: (state) => {
    return state.shop.info
  },
  getShopProfileImage: (state) => {
    return state.shop.info.profile_pic
  },
  getShopProductsPrice: (state) => {
    return state.shop.productsPrice
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
