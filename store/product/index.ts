import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '../index'
import Product from '~/models/product'
import Issue from '~/models/issue_tracker/issue'
import Shop from '~/models/shop'

const namespace = 'product'

interface ProductState {
  product: Product | null
}

const state = (): ProductState => ({
  product: null
})

const mutations = <MutationTree<ProductState>>{
  setProduct (state, prod) {
    const shop = new Shop(prod.shop.id, prod.shop.instagramUsername, prod.shop.province, prod.shop.city, prod.shop.profilePic)
    state.product = new Product(prod.id, shop, prod.finalPrice, prod.originalPrice, prod.shortcode,
      prod.title, prod.description, prod.displayImage, prod.rate, prod.isExisting, prod.discountPercent,
      prod.discountAmount, prod.attributes)
  }
}

const actions = <ActionTree<ProductState, RootState>>{
  productDetail (vuexContext, shortcode) {
    const url = process.env.baseURL + `shop/product/${shortcode}/preview/`

    return this.$client.get(url).then((response) => {
      vuexContext.commit('setProduct', response.data)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('productDetail', JSON.stringify(e.response))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
      throw e.response
    })
  }
}

const getters = <GetterTree<ProductState, RootState>>{
  getProduct: (state) : Product | null => {
    return state.product
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
