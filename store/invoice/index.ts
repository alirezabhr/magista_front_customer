import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '../index'
import ShopOrder from '~/models/ShopOrder'

const namespace = 'shop order'

interface ShopOrderState {
  shopOrderList: ShopOrder[]
}

const state = (): ShopOrderState => ({
  shopOrderList: []
})

const mutations = <MutationTree<ShopOrderState>>{
  appendToShopOrderList (state, shopOrder) {
    const item = new ShopOrder(shopOrder.id, shopOrder.status, shopOrder.shop, shopOrder.customer, shopOrder.orderItems, shopOrder.totalPrice, shopOrder.updatedAt, shopOrder.createdAt)
    state.shopOrderList.splice(0, 0, item) // insert shopOrder at index 0
  },
  clearShopOrderList (state) {
    state.shopOrderList = []
  }
}

const actions = <ActionTree<ShopOrderState, RootState>>{
  customerShopOrders (vuexContext) {
    const customerId = vuexContext.rootGetters['auth/getCustomerId']
    const url = process.env.baseURL + `order/customer/${customerId}/`

    return this.$client.get(url).then((response) => {
      vuexContext.commit('clearShopOrderList')
      response.data.forEach((element: ShopOrder) => {
        vuexContext.commit('appendToShopOrderList', element)
      })
    }).catch((e) => {
      throw e.response
    })
  }
}

const getters = <GetterTree<ShopOrderState, RootState>>{
  getShopOrderList: (state) : ShopOrder[] => {
    return state.shopOrderList
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
