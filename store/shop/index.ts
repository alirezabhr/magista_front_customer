import axios from 'axios'
import { GetterTree, MutationTree, ActionTree } from "vuex"
import { RootState } from '../index'
import Product from '@/models/product'
import ShopInfo from '~/models/shop_info'


const namespace = 'shop'

interface ShopState {
  shopInfo: ShopInfo | null
  shopProducts: Product[]
}

const state = (): ShopState => ({
  shopInfo: null,
  shopProducts: []
})

const mutations = <MutationTree<ShopState>>{
  setShopInfoData(state, shopInfoData) {
    state.shopInfo = new ShopInfo(shopInfoData.instagram_username, shopInfoData.province,
      shopInfoData.city, shopInfoData.profile_pic)
  },
  setShopProducts(state, productsList) {
    state.shopProducts = []
    productsList.forEach((el: any) => {
      const product = new Product(5, el.original_price, el.shortcode, el.title,
        el.description, el.display_image, el.rate)
      state.shopProducts.push(product)
    })
  }
}

const actions = <ActionTree<ShopState, RootState>>{
  shopInfoData(vuexContext, username: string) {
    const url = process.env.baseURL + `shop/${username}/preview/`

    return axios.get(url).then((response) => {
      vuexContext.commit('setShopInfoData', response.data)
    })
  },
  shopProducts(vuexContext, username: string) {
    const url = process.env.baseURL + `shop/${username}/products/`

    return axios.get(url).then((response) => {
      vuexContext.commit('setShopProducts', response.data)
    })
  }
}

const getters = <GetterTree<ShopState, RootState>>{
  getShopInfoData: (state): ShopInfo | null => {
    return state.shopInfo
  },
  getShopProfileImage: (state): string => {
    if (state.shopInfo?.profileImageUrl) {
      return state.shopInfo.profileImageUrl
    }
    return ''
  },
  getShopProducts: (state): Product[] => {
    return state.shopProducts
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
