import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '../index'
import Invoice from "~/models/invoice"
import Issue from '~/models/issue_tracker/issue'

const namespace = 'invoice'

interface InvoiceState {
  selectedInvoice: Invoice | null
  invoiceList: Invoice[]
}

const state = (): InvoiceState => ({
  selectedInvoice: null,
  invoiceList: []
})

const mutations = <MutationTree<InvoiceState>>{
  setSelectedInvoice (state, invoice) {
    state.selectedInvoice = invoice
  },
  changeOrder (state, order) {
    if (state.selectedInvoice) {
      const orderIndex = state.selectedInvoice.orders.findIndex(el => el.id === order.id)
      state.selectedInvoice.orders.splice(orderIndex, 1, order)
    }
  }
}

const actions = <ActionTree<InvoiceState, RootState>>{
  selectedInvoiceData (vuexContext, invoiceId) {
    const url = process.env.baseURL + `order/invoice/${invoiceId}/`

    return this.$client.get(url).then((response) => {
      vuexContext.commit('setSelectedInvoice', response.data)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('selectedInvoiceData', JSON.stringify(e.response))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
    })
  },
  paySelectedInvoice (vuexContext) {
    const url = process.env.baseURL + `payment/ipg/`
    const payload = vuexContext.getters.getSelectedInvoice

    return this.$client.post(url, payload).then((response) => {
      return response.data.url
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('paySelectedInvoice', JSON.stringify(e.response))
      issue.setCritical()
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
      throw e.response
    })
  },
  applyOrderDiscount (vuexContext, data) {
    const orderId = data.orderId
    const discountCode = data.code
    const url = process.env.baseURL + `order/${orderId}/discount/apply/`

    const payload = {
      code: discountCode
    }

    return this.$client.post(url, payload).then((response) => {
      vuexContext.commit('changeOrder', response.data)
    }).catch((e) => {
      vuexContext.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('applyOrderDiscount', JSON.stringify(e.response.data))
      vuexContext.commit('issue/addIssue', issue, { root: true })
      vuexContext.dispatch('issue/capture', null, { root: true })
      throw e.response
    })
  }
}

const getters = <GetterTree<InvoiceState, RootState>>{
  getSelectedInvoice: (state): Invoice | null => {
    return state.selectedInvoice
  }
}

export default {
  namespace,
  state,
  mutations,
  getters,
  actions
}
