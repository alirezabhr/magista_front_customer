import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '../index'
import Issue from '~/models/issue_tracker/issue'
import Shop from '~/models/shop'
import Post from '~/models/post'

const namespace = 'product'

interface ProductState {
  post: Post | null
}

const state = (): ProductState => ({
  post: null
})

const mutations = <MutationTree<ProductState>>{
  setPost (state, p) {
    const shop = new Shop(p.shop.id, p.shop.instagramUsername, p.shop.province, p.shop.city, p.shop.profilePic)
    state.post = new Post(p.id, shop, p.productImages, p.shortcode, p.description)
  }
}

const actions = <ActionTree<ProductState, RootState>>{
  postDetail (vuexContext, shortcode) {
    const url = process.env.baseURL + `shop/post/${shortcode}/preview/`
    
    return this.$client.get(url).then((response) => {
      vuexContext.commit('setPost', response.data)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('postDetail', JSON.stringify(e.response))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
      throw e.response
    })
  }
}

const getters = <GetterTree<ProductState, RootState>>{
  getPost: (state) : Post | null => {
    return state.post
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
