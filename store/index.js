const state = () => ({
})

const mutations = {

}

const actions = {
  nuxtServerInit (vuexContext, context) {
    console.log('nuxtServerInit is running')
    console.log('client:' + process.client)
    console.log('server:' + process.server)
    if (process.client) {
      console.log('nuxtServerInit is on client side')
    } else {
      console.log('nuxtServerInit is on server side')
    }
  }
}

const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
