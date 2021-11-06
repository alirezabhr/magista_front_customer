import axios from 'axios'
import Product from '@/models/product'

const state = () => ({
  shop: {
    info: null,
    products: []
  }
})

const mutations = {
  setShopInfoData (state, shopInfoData) {
    state.shop.info = shopInfoData
  },
  setShopProducts (state, productsList) {
    state.shop.products = []
    productsList.forEach((el) => {
      const product = new Product(el.original_price, el.shortcode, el.title,
        el.description, el.display_image, el.rate)
      state.shop.products.push(product)
      console.log(product.price)
    })
  }
}

const actions = {
  shopInfoData (vuexContext, username) {
    const url = process.env.baseURL + `shop/${username}/preview/`

    return axios.get(url).then((response) => {
      vuexContext.commit('setShopInfoData', response.data)
    })
  },
  shopProducts (vuexContext, username) {
    const url = process.env.baseURL + `shop/${username}/products/`

    return axios.get(url).then((response) => {
      vuexContext.commit('setShopProducts', response.data)
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
  getShopProducts: (state) => {
    return state.shop.products
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
