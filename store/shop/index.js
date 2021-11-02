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
  setShopProducts (state, productsPriceList) {
    state.shop.products = []
    productsPriceList.forEach((el) => {
      const product = new Product(el.price, el.product.shortcode, el.product.title,
        el.product.description, el.product.display_image, el.product.rate)
      state.shop.products.push(product)
    })
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
