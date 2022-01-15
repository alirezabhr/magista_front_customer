import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '../index'
import Issue from '~/models/issue_tracker/issue'
import Shop from '~/models/shop'
import Post from '~/models/post'
import ProductImage from '~/models/product_image'

const namespace = 'product'

interface ProductState {
  post: Post | null
  postProductImages: ProductImage[]
}

const state = (): ProductState => ({
  post: null,
  postProductImages: []
})

const mutations = <MutationTree<ProductState>>{
  setPost (state, p) {
    const shop = new Shop(p.shop.id, p.shop.instagramUsername, p.shop.province, p.shop.city, p.shop.profilePic)
    state.post = new Post(p.id, shop, p.previewImage, p.shortcode, p.description)
  },
  clearPostProductImages (state) {
    state.postProductImages = []
  },
  setPostProductImages (state, p) {
    state.postProductImages = p
  }
}

const actions = <ActionTree<ProductState, RootState>>{
  postDetail (vuexContext, shortcode) {
    const url = process.env.baseURL + `shop/post/${shortcode}/preview/`
    
    return this.$client.get(url).then((response) => {
      vuexContext.commit('setPost', response.data)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('postDetail', JSON.stringify(e.response.data))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
      throw e.response
    })
  },
  postProductImages (vuexContext, shortcode) {
    const url = process.env.baseURL + `shop/post/${shortcode}/product-images/`
    
    return this.$client.get(url).then((response) => {
      vuexContext.commit('setPostProductImages', response.data)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('postProductImages', JSON.stringify(e.response.data))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
    })
  }
}

const getters = <GetterTree<ProductState, RootState>>{
  getPost: (state) : Post | null => {
    return state.post
  },
  getPostProductImages: (state) : ProductImage[] => {
    return state.postProductImages
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
