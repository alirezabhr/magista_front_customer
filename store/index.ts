import { GetterTree, MutationTree, ActionTree } from 'vuex'
import Product from '~/models/product'

export interface RootState {
  homePageImages: Object[] 
  newestProductsList: Product[]
  discountedProductsList: Product[]
}

export const state = (): RootState => ({
  homePageImages: [], 
  newestProductsList: [],
  discountedProductsList: [],
})

export const mutations: MutationTree<RootState> = {
  setHomePageImages (state, imgUrlList) {
    state.homePageImages = imgUrlList
  },
  setNewestProductsList (state, products) {
    state.newestProductsList = products
  },
  setDiscountedProductsList (state, products) {
    state.discountedProductsList = products
  }
}

export const actions: ActionTree<RootState, RootState> = {
  homePageImagesUrl (vuexContext) {
    const url = process.env.baseURL + `static-files/homepage/`
  
    return this.$client.get(url).then((response) => {
      vuexContext.commit('setHomePageImages', response.data)
    })
  },
  newestProducts (vuexContext) {
    const url = process.env.baseURL + `newest-products/`
  
    return this.$client.get(url).then((response) => {
      vuexContext.commit('setNewestProductsList', response.data)
    })
  },
  discountedProducts (vuexContext) {
    const url = process.env.baseURL + `discounted-products/`
  
    return this.$client.get(url).then((response) => {
      vuexContext.commit('setDiscountedProductsList', response.data)
    })
  }
}

export const getters: GetterTree<RootState, RootState> = {
  getHomePageImages: (state): Object[] => {
    return state.homePageImages
  },
  getNewestProductsList: (state): Product[] => {
    return state.newestProductsList
  },
  getDiscountedProductsList: (state): Product[] => {
    return state.discountedProductsList
  },
}
