import { GetterTree, MutationTree, ActionTree } from "vuex"
import { RootState } from '../index'
import Post from '@/models/post'
import Shop from '~/models/shop'


const namespace = 'shop'

interface ShopState {
  isGettingShopPosts: Boolean
  shop: Shop | null
  shopPosts: Post[]
}

const state = (): ShopState => ({
  isGettingShopPosts: false,
  shop: null,
  shopPosts: []
})

const mutations = <MutationTree<ShopState>>{
  setShopInfoData (state, shopInfoData) {
    state.shop = new Shop(shopInfoData.id, shopInfoData.instagramUsername, shopInfoData.province,
      shopInfoData.city, shopInfoData.profilePic)
  },
  setShopPosts (state, postsList) {
    state.shopPosts = []
    postsList.forEach((el: Post) => {
      state.shopPosts.push(el)
    })
  },
  setIsGettingShopPosts (state, value: boolean) {
    state.isGettingShopPosts = value
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

    vuexContext.commit('setIsGettingShopPosts', true)
    return this.$client.get(url).then((response) => {
      vuexContext.commit('setIsGettingShopPosts', false)
      vuexContext.commit('setShopPosts', response.data)
    }).catch((e) => {
      vuexContext.commit('setIsGettingShopPosts', false)
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
  getShopPosts: (state): Post[] => {
    return state.shopPosts
  },
  isGettingShopPosts: (state): Boolean => {
    return state.isGettingShopPosts
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
