import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '../index'
import Order from '~/models/order'
import Issue from '~/models/issue_tracker/issue'

const namespace = 'order'

interface OrderState {
  orderList: Order[]
}

const state = (): OrderState => ({
  orderList: []
})

const mutations = <MutationTree<OrderState>>{
  appendToOrderList (state, order) {
    const item = new Order(order.id, order.status, order.shop, order.customer, order.orderItems, order.totalPrice, order.updatedAt, order.createdAt)
    state.orderList.splice(0, 0, item) // insert order at index 0
  },
  clearOrderList (state) {
    state.orderList = []
  }
}

const actions = <ActionTree<OrderState, RootState>>{
  customerOrders (vuexContext) {
    const customerId = vuexContext.rootGetters['auth/getCustomerId']
    const url = process.env.baseURL + `order/customer/${customerId}/`

    return this.$client.get(url).then((response) => {
      vuexContext.commit('clearOrderList')
      response.data.forEach((element: Order) => {
        vuexContext.commit('appendToOrderList', element)
      })
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('customerOrders', JSON.stringify(e.response))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
    })
  }
}

const getters = <GetterTree<OrderState, RootState>>{
  getOrderList: (state) : Order[] => {
    return state.orderList
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
