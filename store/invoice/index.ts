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
