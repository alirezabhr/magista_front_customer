import { GetterTree, MutationTree, ActionTree } from "vuex"

export interface RootState {
}

export const state = (): RootState => ({
})

export const getters: GetterTree<RootState, RootState> = {
}

export const mutations: MutationTree<RootState> = {
}

export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit (vuexContext, context) {
    console.log('nuxtServerInit is running')
    if (process.client) {
      console.log('nuxtServerInit is on client side')
    } else {
      console.log('nuxtServerInit is on server side')
    }
  }
}

