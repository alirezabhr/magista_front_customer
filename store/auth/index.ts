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

    return axios.post(
      url,
      payload
    ).then((response) => {
      vuexContext.commit('setUserPhone', payload.phone)
      return response
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      for (const k in e.response.data) {
        const issue = new Issue('checkUserExistence', k, e.response.data[k][0], null)
        vuexContext.commit('issue/addIssue', issue, { root: true })
      }
      vuexContext.dispatch('issue/capture', null, { root: true })
      throw e.response
    })
  },
  requestOtpCode (vuexContext, payload) {
    const url = process.env.baseURL + 'user/send-otp/'

    return axios.post(
      url,
      payload
    ).then(() => {
      vuexContext.commit('setUserPhone', payload.phone)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      for (const k in e.response.data) {
        const issue = new Issue('requestOtpCode', k, e.response.data[k][0], null)
        vuexContext.commit('issue/addIssue', issue, { root: true })
      }
      vuexContext.dispatch('issue/capture', null, { root: true })
    })
  },
  checkOtpCode (vuexContext, payload) {
    const url = process.env.baseURL + 'user/check-otp/'

    return axios.post(
      url,
      payload
    ).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      for (const k in e.response.data) {
        if (k !== 'error') {
          const issue = new Issue('checkOtpCode', k, e.response.data[k][0], null)
          vuexContext.commit('issue/addIssue', issue, { root: true })
        }
      }
      if (vuexContext.rootGetters['issue/getIssues'].length > 0) {
        vuexContext.dispatch('issue/capture', null, { root: true })
      }
      throw e.response
    })
  },
  userSignup (vuexContext, payload) {
    const url = process.env.baseURL + 'user/signup/'

    return axios.post(
      url,
      payload
    ).then((response) => {
      const data = response.data

      vuexContext.commit('setUserToken', data.token)
      vuexContext.commit('setUserId', data.id)
      vuexContext.commit('setCustomer', data.customer)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      for (const k in e.response.data) {
        const issue = new Issue('userSignup', k, e.response.data[k][0], null)
        vuexContext.commit('issue/addIssue', issue, { root: true })
      }
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

      vuexContext.commit('setUserToken', data.token)
      vuexContext.commit('setUserId', data.id)
      vuexContext.commit('setCustomer', data.customer)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      for (const k in e.response.data) {
        if (e.response.data[k][0] !== 'Unable to log in with provided credentials.') {
          const issue = new Issue('userLogin', k, e.response.data[k][0], null)
          vuexContext.commit('issue/addIssue', issue, { root: true })
        }
      }
      if (vuexContext.rootGetters['issue/getIssues'].length > 0) {
        vuexContext.dispatch('issue/capture', null, { root: true })
      }
      throw e.response
    })
  },
  changeUserPassword (vuexContext, payload) {
    const url = process.env.baseURL + 'user/'

    return axios.put(
      url,
      payload
    ).then((response) => {
      const data = response.data

      vuexContext.commit('setUserToken', data.token)
      vuexContext.commit('setUserId', data.id)
      vuexContext.commit('setCustomer', data.customer)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      for (const k in e.response.data) {
        if (k !== 'error') {
          const issue = new Issue('changeUserPassword', k, e.response.data[k][0], null)
          vuexContext.commit('issue/addIssue', issue, { root: true })
        }
      }
      if (vuexContext.rootGetters['issue/getIssues'].length > 0) {
        vuexContext.dispatch('issue/capture', null, { root: true })
      }
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

    return axios.post(
      url,
      payload
    ).then((response) => {
      vuexContext.commit('setCustomer', response.data)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      for (const k in e.response.data) {
        const issue = new Issue('createCustomer', k, e.response.data[k][0], null)
        vuexContext.commit('issue/addIssue', issue, { root: true })
      }
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
  getCustomerId: (state) : number => {
    if (state.customer) {
      return state.customer.id
    }
    return 0
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
