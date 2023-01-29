import { GetterTree, MutationTree, ActionTree } from "vuex"
import { RootState } from '../index'
import Post from '@/models/post'
import Shop from '@/models/shop'
import Category from '@/models/category'


const namespace = 'shop'

interface ShopState {
  categories: Category[]
  shop: Shop | null
  shopPosts: Post[]
}

const state = (): ShopState => ({
  categories: [],
  shop: null,
  shopPosts: []
})

const mutations = <MutationTree<ShopState>>{
  setCategories (state, categoriesData) {
    state.categories = categoriesData
  },
  setShopInfoData (state, shopInfoData) {
    state.shop = new Shop(shopInfoData.id, shopInfoData.instagramUsername, shopInfoData.province,
      shopInfoData.city, shopInfoData.profilePic, shopInfoData.bio, shopInfoData.delivery, shopInfoData.preparation)
  },
  setShopPosts (state, postsList) {
    state.shopPosts = []
    postsList.forEach((el: Post) => {
      state.shopPosts.push(el)
    })
  }
}

const actions = <ActionTree<ShopState, RootState>>{
  categories (vuexContext) {
    const url = process.env.baseURL + `shop/category/`

    return this.$client.get(url).then((response) => {
      vuexContext.commit('setCategories', response.data)
    })
  },
  shopInfoData (vuexContext, username: string) {
    const url = process.env.baseURL + `shop/${username}/preview/`

    return this.$client.get(url).then((response) => {
      vuexContext.commit('setShopInfoData', response.data)
    }).catch((e) => {
      throw e.response
    })
  },
  shopPosts (vuexContext, username: string) {
    const url = process.env.baseURL + `shop/${username}/post/`

    return this.$client.get(url).then((response) => {
      vuexContext.commit('setShopPosts', response.data)
    }).catch((e) => {
    })
  }
}

const getters = <GetterTree<ShopState, RootState>>{
  getCategories: (state): Category[] => {
    return state.categories
  },
  getShopInfoData: (state): Shop | null => {
    return state.shop
  },
  getShopProfileImage: (state): string => {
    if (state.shop?.profilePic) {
      return state.shop.profilePic
    }
    return ''
  },
  getShopPosts: (state): Post[] => {
    return state.shopPosts
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
