import { GetterTree, MutationTree, ActionTree } from "vuex"
import { RootState } from '../index'
import Product from '@/models/product'
import Shop from '~/models/shop'


const namespace = 'shop'

interface ShopState {
  shop: Shop | null
  shopProducts: Product[]
}

const state = (): ShopState => ({
  shop: null,
  shopProducts: []
})

const mutations = <MutationTree<ShopState>>{
  setShopInfoData(state, shopInfoData) {
    state.shop = new Shop(shopInfoData.id, shopInfoData.instagramUsername, shopInfoData.province,
      shopInfoData.city, shopInfoData.profilePic)
  },
  setShopProducts(state, productsList) {
    state.shopProducts = []
    productsList.forEach((el: any) => {
      const product = new Product(el.id, el.shop, el.finalPrice, el.originalPrice, el.shortcode, el.title,
        el.description, el.displayImage, el.rate, el.isExisting, el.discountPercent, el.discountDescription,
        el.attributes)
      state.shopProducts.push(product)
    })
  }
}

const actions = <ActionTree<ShopState, RootState>>{
  shopInfoData(vuexContext, username: string) {
    const url = process.env.baseURL + `shop/${username}/preview/`

    return this.$client.get(url).then((response) => {
      vuexContext.commit('setShopInfoData', response.data)
    })
  },
  shopProducts(vuexContext, username: string) {
    const url = process.env.baseURL + `shop/${username}/products/`

    return this.$client.get(url).then((response) => {
      vuexContext.commit('setShopProducts', response.data)
    })
  }
}

const getters = <GetterTree<ShopState, RootState>>{
  getShopInfoData: (state): Shop | null => {
    return state.shop
  },
  getShopProfileImage: (state): string => {
    if (state.shop?.profileImageUrl) {
      return state.shop.profileImageUrl
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
