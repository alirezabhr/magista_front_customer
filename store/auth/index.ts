import axios from 'axios'
import { GetterTree, MutationTree, ActionTree } from "vuex"
import Customer from '~/models/customer'
import Issue from '~/models/issue_tracker/issue'
import { RootState } from '../index'

const namespace = 'auth'

interface AuthState {
  userPhone: string
  userAccessToken: string | null
  userRefreshToken: string | null
  userId: number
  customer: Customer | null
}

const state = () : AuthState => ({
  userPhone: '',
  userAccessToken: null,
  userRefreshToken: null,
  userId: 0,
  customer: null
})

const mutations = <MutationTree<AuthState>>{
  initialAuthStore (state) {
    if (!process.client) { // localStorage is only available on client side
      return
    }

    // initial user tokens
    state.userAccessToken = localStorage.getItem('MagistaAccessToken')
    state.userRefreshToken = localStorage.getItem('MagistaRefreshToken')

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
  setUserAccessToken (state, token) {
    localStorage.setItem('MagistaAccessToken', 'Bearer ' + token)
    state.userAccessToken = 'Bearer ' + token
  },
  setUserRefreshToken (state, token) {
    localStorage.setItem('MagistaRefreshToken', token)
    state.userRefreshToken = token
  },
  setUserId (state, id) {
    state.userId = id
    localStorage.setItem('MagistaId', id)
  },
  setCustomer (state, c) {
    state.customer = c
    localStorage.setItem('MagistaCustomer', JSON.stringify(c))
  },
  removeUserAccessToken (state) {
    localStorage.removeItem('MagistaAccessToken')
    state.userAccessToken = null
  },
  removeUserRefreshToken (state) {
    localStorage.removeItem('MagistaRefreshToken')
    state.userRefreshToken = null
  },
  removeUserId (state) {
    localStorage.removeItem('MagistaId')
    state.userId = 0
  },
  removeCustomerData (state) {
    localStorage.removeItem('MagistaCustomer')
    state.customer = null
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

      const accessToken = data.token
      const refreshToken = data.refreshToken
      const id = data.id
      const customer = data.customer

      vuexContext.commit('setUserAccessToken', accessToken)
      vuexContext.commit('setUserRefreshToken', refreshToken)
      vuexContext.commit('setUserId', id)
      vuexContext.commit('setCustomer', customer)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('userSignup', JSON.stringify(e.response))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
    })
  },
  userLogin (vuexContext, payload) {
    const url = process.env.baseURL + 'user/login/'

    return axios.post(
      url,
      payload
    ).then((response) => {
      const data = response.data

      const accessToken = data.token
      const refreshToken = data.refresh_token
      const id = data.id
      const customer = data.customer
      
      vuexContext.commit('setUserAccessToken', accessToken)
      vuexContext.commit('setUserRefreshToken', refreshToken)
      vuexContext.commit('setUserId', id)
      vuexContext.commit('setCustomer', customer)
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
      
      const accessToken = data.token
      const refreshToken = data.refreshToken
      const id = data.id
      const customer = data.customer

      vuexContext.commit('setUserAccessToken', accessToken)
      vuexContext.commit('setUserRefreshToken', refreshToken)
      vuexContext.commit('setUserId', id)
      vuexContext.commit('setCustomer', customer)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('changeUserPassword', JSON.stringify(e.response))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
      throw e.response
    })
  },
  refreshToken (vuexContext) {
    const url = process.env.baseURL + 'user/token/refresh/'
    const refreshToken = vuexContext.getters.getUserRefreshToken

    if (!refreshToken) {
      throw new Error('refresh token not found')
    }
    
    return axios.post(
      url,
      {refresh: refreshToken}
    ).then((response) => {
      const data = response.data
      const accessToken = data.access
      vuexContext.commit('setUserAccessToken', accessToken)
      return accessToken
    })
  },
  createCustomer (vuexContext, payload) {
    const url = process.env.baseURL + 'user/customer/'
    
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
  },
  userLogout (vuexContext) {
    vuexContext.commit('removeUserAccessToken')
    vuexContext.commit('removeUserRefreshToken')
    vuexContext.commit('removeCustomerData')
    vuexContext.commit('removeUserId')
  }
}

const getters = <GetterTree<AuthState, RootState>>{
  getUserPhone: (state) => {
    return state.userPhone
  },
  getUserId: (state) => {
    return state.userId
  },
  getUserAccessToken: (state) => {
    return state.userAccessToken
  },
  getUserRefreshToken: (state) => {
    return state.userRefreshToken
  },
  getCustomerId: (state) : number | null => {
    if (state.customer) {
      return state.customer.id
    }
    return null
  },
  getCustomer: (state) : Customer | null => {
    return state.customer
  },
  isAuthenticated: (state) => {
    return !!state.userAccessToken
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
