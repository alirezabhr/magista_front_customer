import { GetterTree, MutationTree, ActionTree } from "vuex"
import { RootState } from '../index'
import Post from '@/models/post'
import Shop from '~/models/shop'


const namespace = 'shop'

interface ShopState {
  shop: Shop | null
  shopPosts: Post[]
}

const state = (): ShopState => ({
  shop: null,
  shopPosts: []
})

const mutations = <MutationTree<ShopState>>{
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
  shopInfoData(vuexContext, username: string) {
    const url = process.env.baseURL + `shop/${username}/preview/`

    return this.$client.get(url).then((response) => {
      vuexContext.commit('setShopInfoData', response.data)
    }).catch((e) => {
      throw e.response
    })
  },
  shopPosts(vuexContext, username: string) {
    const url = process.env.baseURL + `shop/${username}/post/`

    return this.$client.get(url).then((response) => {
      vuexContext.commit('setShopPosts', response.data)
    }).catch((e) => {
    })
  }
}

const getters = <GetterTree<ShopState, RootState>>{
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
