import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '../index'
import Invoice from "~/models/invoice"

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
  }
}

const actions = <ActionTree<InvoiceState, RootState>>{
  selectedInvoiceData (vuexContext, invoiceId) {
    const url = process.env.baseURL + `order/invoice/${invoiceId}/`

    return this.$client.get(url).then((response) => {
      vuexContext.commit('setSelectedInvoice', response.data)
    }).catch((e) => {
      throw e.response
    })
  },
  paySelectedInvoice (vuexContext) {
    const url = process.env.baseURL + `order/payment/`
    const payload = vuexContext.getters.getSelectedInvoice

    return this.$client.post(url, payload).then((response) => {
      return response.data.url
    }).catch((e) => {
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
