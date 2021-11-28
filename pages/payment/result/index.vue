<template>
    <v-row v-if="isLoading" justify="center" >
      <v-progress-circular/>
    </v-row>
    <v-col v-else cols="12" sm="8" md="6" lg="5" class="mx-auto">
      <v-card class="pa-2">
        <v-card-title :class='`${color}--text`' class="my-5">
          <v-row justify="center" class="text-h5 font-weight-bold">
            تراکنش {{ trxStatusText }}
          </v-row>
        </v-card-title>

        <div v-if="trxStatus === 1">
          <v-col class="mx-auto">
            <v-row justify="center" class="font-weight-bold text-body1 py-2">مبلغ تراکنش</v-row>
            <v-row justify="center" class="text-body1">{{ amount }} ریال</v-row>
          </v-col>
          <v-col class="mx-auto py-6">
            <v-row justify="center" class="font-weight-bold text-body1 py-2">شماره مرجع بانکی</v-row>
            <v-row justify="center" class="text-body1">{{ refNum }}</v-row>
          </v-col>
          <v-col class="mx-auto py-6">
            <v-row justify="center" class="font-weight-bold text-body1 py-2">شماره تراکنش</v-row>
            <v-row justify="center" class="text-body1">{{ invoiceNum }}</v-row>
          </v-col>
          <v-col class="mx-auto pt-5">
            <v-row justify="center" class="text-body2">{{ paidDateTime }}</v-row>
          </v-col>
        </div>
        <div v-else-if="trxStatus === 2">
          <v-row justify="center">
            <v-img
              max-height="250"
              max-width="250"
              :src="getFailedTrxImage"
            />
          </v-row>
        </div>
      </v-card>
    </v-col>
</template>

<script>
export default {
  name: 'PaymentResultPage',
  data () {
    return {
      isLoading: false,
      trxStatus: 0,
      trxStatusText: '',
      color: '',
      refNum: '',
      amount: '',
      invoiceNum: '',
      paidDateTime: '',
    }
  },
  async created () {
    this.isLoading = true
    const url = process.env.baseURL + 'order/payment/'

    const payload = {
      invoiceNumber: this.$route.query.iN,
      invoiceDate: this.$route.query.iD,
      trxReferenceId: this.$route.query.tref
    }

    await this.$client.post(url, payload).then((resp) => {
      this.refNum = resp.data.refNumber
      this.amount = resp.data.amount
      this.invoiceNum = resp.data.paymentInvoice
      this.paidDateTime = resp.data.paidAt
      this.trxStatus = 1 // 1 for success
      this.isLoading = false
    }).catch((resp) => {
      console.log(resp.erro.data)
      this.trxStatus = 2  // 2 for fail
      this.isLoading = false
    })
  },
  computed: {
    getFailedTrxImage () {
      return require('~/assets/images/empty_state.png')
    }
  },
  watch: {
    trxStatus (newValue) {
      if (newValue === 1) { // 1 for success
        this.trxStatusText = 'موفق',
        this.color = 'green'
      } else if (newValue === 2) { // 2 for fail
        this.trxStatusText = 'ناموفق',
        this.color = 'red'
      }
    }
  }
}
</script>
