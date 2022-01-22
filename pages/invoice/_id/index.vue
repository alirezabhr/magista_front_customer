<template>
  <v-row justify="center" no-gutters>
    <v-snackbar
      v-model="showSnackbar"
      color="grey darken-3"
    >
      {{ snackbarMessage }}
    </v-snackbar>
    <v-progress-circular v-if="!getSelectedInvoice" />
    <v-col v-else cols="12" class="pa-0">
      <v-card class="pa-2" flat>
        <v-col cols="11" sm="9" md="8" lg="6" class="pa-0 mx-auto">
          <v-row justify="center" class="pt-5 text-h6 yellow--text text--darken-3 font-weight-bold" no-gutters>
            فاکتور خرید
          </v-row>
          <div v-for="o in getSelectedInvoice.orders" :key="o.id">
            <OrderCard :order="o" :is-in-invoice-page="true" />
          </div>
        </v-col>
        <v-col cols="10" sm="8" md="6" lg="4" class="pa-0 mx-auto">
          <InvoiceTable :invoice="getSelectedInvoice" />
        </v-col>
        <v-card-actions v-show="!getSelectedInvoice.isPaid">
          <v-col cols="10" sm="8" md="6" lg="4" class="mx-auto">
            <v-btn
              rounded
              color="green"
              width="100%"
              class="darken-1 white--text px-4"
              @click.prevent="pay"
            >
              پرداخت
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import OrderCard from '~/components/order/OrderCard.vue'
import InvoiceTable from '~/components/order/InvoiceTable.vue'

export default {
  name: "InvoiceIdPage",
  components: {
    OrderCard,
    InvoiceTable
  },
  data () {
    return {
      showSnackbar: false,
      snackbarMessage: ''
    }
  },
  computed: {
    ...mapGetters('invoice', ['getSelectedInvoice'])
  },
  async mounted() {
    const invoiceId = this.$route.params.id
    const selectedInvoice = this.getSelectedInvoice
    
    if (selectedInvoice) {
      if (selectedInvoice.id == invoiceId) {
        return
      }
    } else {
      await this.selectedInvoiceData(invoiceId)
    }
  },
  methods: {
    ...mapActions('invoice', ['selectedInvoiceData', 'paySelectedInvoice']),

    pay () {
      this.paySelectedInvoice().then((url) => {
        window.open(url)
        this.$router.push('/orders')
      }).catch(() => {
        this.snackbarMessage = 'در حال حاضر تکمیل خرید ممکن نمی‌باشد.'
        this.showSnackbar = true
      })
    }
  }
}
</script>
