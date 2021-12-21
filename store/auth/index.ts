import axios from 'axios'
import { GetterTree, MutationTree, ActionTree } from "vuex"
import Customer from '~/models/customer'
import Issue from '~/models/issue_tracker/issue'
import { RootState } from '../index'

const namespace = 'auth'

interface AuthState {
  userPhone: string
  userToken: string | null
  userId: number
  customer: Customer | null
}

const state = () : AuthState => ({
  userPhone: '',
  userToken: null,
  userId: 0,
  customer: null
})

const mutations = <MutationTree<AuthState>>{
  initialAuthStore (state) {
    if (!process.client) { // localStorage is only available on client side
      return
    }

    // initial user token
    state.userToken = localStorage.getItem('MagistaToken')

    // initial user id
    const userIdStr = localStorage.getItem('MagistaId')
    if (userIdStr) {
      state.userId = JSON.parse(userIdStr)
    }

    // initial customer
    const customerStr = localStorage.getItem('MagistaCustomer')
    if (customerStr) {
      state.customer = JSON.parse(customerStr)
    }
  },
  setUserPhone (state, phone) {
    state.userPhone = phone
  },
  setUserToken (state, token) {
    localStorage.setItem('MagistaToken', 'JWT ' + token)
    axios.defaults.headers.common.Authorization = 'JWT ' + token
    state.userToken = 'JWT ' + token
  },
  setUserId (state, id) {
    state.userId = id
    localStorage.setItem('MagistaId', id)
  },
  setCustomer (state, c) {
    state.customer = c
    localStorage.setItem('MagistaCustomer', JSON.stringify(c))
  },
  removeUserToken (state) {
    localStorage.removeItem('MagistaToken')
    axios.defaults.headers.common.Authorization = ''
    state.userToken = null
  }
}

const actions = <ActionTree<AuthState, RootState>>{
  checkUserExistence (vuexContext, payload) {
    const url = process.env.baseURL + 'user/'

    return this.$client.post(
      url,
      payload
    ).then((response) => {
      vuexContext.commit('setUserPhone', payload.phone)
      return response
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('checkUserExistence', JSON.stringify(e.response))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
      throw e.response
    })
  },
  requestOtpCode (vuexContext, payload) {
    const url = process.env.baseURL + 'user/send-otp/'

    return this.$client.post(
      url,
      payload
    ).then(() => {
      vuexContext.commit('setUserPhone', payload.phone)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('requestOtpCode', JSON.stringify(e.response))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
    })
  },
  checkOtpCode (vuexContext, payload) {
    const url = process.env.baseURL + 'user/check-otp/'

    return this.$client.post(
      url,
      payload
    ).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('checkOtpCode', JSON.stringify(e.response))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
      throw e.response
    })
  },
  userSignup (vuexContext, payload) {
    const url = process.env.baseURL + 'user/signup/'

    return this.$client.post(
      url,
      payload
    ).then((response) => {
      const data = response.data

      vuexContext.commit('setUserToken', data.token)
      vuexContext.commit('setUserId', data.id)
      vuexContext.commit('setCustomer', data.customer)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('userSignup', JSON.stringify(e.response))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
    })
  },
  userLogin (vuexContext, payload) {
    const url = process.env.baseURL + 'user/login/'

    return this.$client.post(
      url,
      payload
    ).then((response) => {
      const data = response.data

      vuexContext.commit('setUserToken', data.token)
      vuexContext.commit('setUserId', data.id)
      vuexContext.commit('setCustomer', data.customer)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('userLogin', JSON.stringify(e.response))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
      throw e.response
    })
  },
  changeUserPassword (vuexContext, payload) {
    const url = process.env.baseURL + 'user/'

    return this.$client.put(
      url,
      payload
    ).then((response) => {
      const data = response.data

      vuexContext.commit('setUserToken', data.token)
      vuexContext.commit('setUserId', data.id)
      vuexContext.commit('setCustomer', data.customer)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('changeUserPassword', JSON.stringify(e.response))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
      throw e.response
    })
  },
  userLogout (vuexContext) {
    vuexContext.commit('removeUserToken')
    this.$router.push('/auth')
  },
  createCustomer (vuexContext, payload) {
    const url = process.env.baseURL + 'user/customer/'
    axios.defaults.headers.common.Authorization = vuexContext.rootGetters['auth/getUserToken']
    
    payload.user = vuexContext.getters.getUserId

    return this.$client.post(
      url,
      payload
    ).then((response) => {
      vuexContext.commit('setCustomer', response.data)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('createCustomer', JSON.stringify(e.response))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
      throw e.response
    })
  }
}

const getters = <GetterTree<AuthState, RootState>>{
  getUserPhone: (state) => {
    return state.userPhone
  },
  getUserId: (state) => {
    return state.userId
  },
  getUserToken: (state) => {
    return state.userToken
  },
  getCustomerId: (state) : number | null => {
    if (state.customer) {
      return state.customer.id
    }
    console.log('null')
    return null
  },
  getCustomer: (state) : Customer | null => {
    return state.customer
  },
  isAuthenticated: (state) => {
    return !!state.userToken
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
