import { GetterTree, MutationTree, ActionTree } from 'vuex'
import Product from '~/models/product'

export interface RootState {
  newestProductsList: Product[]
  homePageImagesUrlList: String[] 
}

export const state = (): RootState => ({
  newestProductsList: [],
  homePageImagesUrlList: [] 
})

export const mutations: MutationTree<RootState> = {
  setHomePageImagesUrlList (state, imgUrlList) {
    state.homePageImagesUrlList = imgUrlList
  },
  setNewestProductsList (state, products) {
    state.newestProductsList = products
  }
}

export const actions: ActionTree<RootState, RootState> = {
  homePageImagesUrl (vuexContext) {
    const url = process.env.baseURL + `homepage-images-url/`
  
    return this.$client.get(url).then((response) => {
      vuexContext.commit('setHomePageImagesUrlList', response.data)
    })
  },
  newestProducts (vuexContext) {
    const url = process.env.baseURL + `newest-products/`
  
    return this.$client.get(url).then((response) => {
      vuexContext.commit('setNewestProductsList', response.data)
    })
  }
}

export const getters: GetterTree<RootState, RootState> = {
  getHomePageImagesUrlList: (state): String[] => {
    return state.homePageImagesUrlList
  },
  getNewestProductsList: (state): Product[] => {
    return state.newestProductsList
  }
}
