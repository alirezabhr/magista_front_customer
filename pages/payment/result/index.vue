<template>
    <v-col cols="12" sm="8" md="6" lg="5" class="mx-auto">
      <v-card v-if="isLoading" class="pa-2">
        <div v-for="i in 3" :key="i" class="px-1 py-3">
          <v-col offset="4" cols="8">
            <v-skeleton-loader type="heading" />
          </v-col>
          <v-skeleton-loader type="text@2" class="mx-auto" width="70%" />
        </div>
      </v-card>
      <v-card v-else class="pa-2">
        <v-card-title :class='`${color}--text`' class="my-5">
          <v-row justify="center" class="text-h5 font-weight-bold" no-gutters>
            تراکنش {{ trxStatusText }}
          </v-row>
        </v-card-title>

        <div v-if="trxStatus === TransactionStatus.SUCCESSFUL">
          <v-col class="mx-auto">
            <v-row justify="center" class="font-weight-bold text-body1 py-2" no-gutters>مبلغ تراکنش</v-row>
            <v-row justify="center" class="text-body1" no-gutters>{{ amount }} ریال</v-row>
          </v-col>
          <v-col class="mx-auto py-6">
            <v-row justify="center" class="font-weight-bold text-body1 py-2" no-gutters>شماره مرجع بانکی</v-row>
            <v-row justify="center" class="text-body1" no-gutters>{{ refNum }}</v-row>
          </v-col>
          <v-col class="mx-auto py-6">
            <v-row justify="center" class="font-weight-bold text-body1 py-2" no-gutters>شماره تراکنش</v-row>
            <v-row justify="center" class="text-body1" no-gutters>{{ invoiceNum }}</v-row>
          </v-col>
          <v-col class="mx-auto pt-5">
            <v-row justify="center" class="text-body2" no-gutters>{{ paidDateTime }}</v-row>
          </v-col>
        </div>
        <div v-else-if="trxStatus === TransactionStatus.FAILED">
          <v-row justify="center" no-gutters>
            <v-col>
              <v-img
                max-height="250"
                max-width="250"
                :src="getFailedTrxImage"
                class="mx-auto"
              />
              <div>{{ errorMessage }}</div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import Issue from '@/models/issue_tracker/issue'

enum TransactionStatus {
  SUCCESSFUL = 1,
  FAILED,
}

export default Vue.extend({
  name: 'PaymentResultPage',
  data () {
    return {
      TransactionStatus,
      isLoading: false,
      trxStatus: 0,
      trxStatusText: '',
      color: '',
      refNum: '',
      amount: '',
      invoiceNum: '',
      paidDateTime: '',
      errorMessage: ''
    }
  },
  async mounted () {
    this.isLoading = true
    const url = process.env.baseURL + 'payment/ipg'

    const payload = {
      invoiceNumber: this.$route.query.iN,
      invoiceDate: this.$route.query.iD,
      trxReferenceId: this.$route.query.tref
    }

    await this.$client.put(url, payload).then((resp:any) => {
      this.refNum = resp.data.refNumber
      this.amount = resp.data.amount
      this.invoiceNum = resp.data.paymentInvoice
      this.paidDateTime = resp.data.paidAt
      this.trxStatus = TransactionStatus.SUCCESSFUL
      this.isLoading = false
    }).catch((e:any) => {
      this.$store.commit('issue/createNewIssues', null, { root: true })
      const issue = new Issue('created in payment result', JSON.stringify(e.response.data))
      issue.setCritical()
      this.$store.dispatch('issue/capture', null, { root: true })

      if (e.response.data.error) {
        this.errorMessage = e.response.data.error[0]
      }

      this.trxStatus = TransactionStatus.FAILED
      this.isLoading = false
    })
  },
  computed: {
    getFailedTrxImage () {
      return require('~/assets/images/empty_state.png')
    }
  },
  watch: {
    trxStatus (newValue: TransactionStatus) : void {
      if (newValue === TransactionStatus.SUCCESSFUL) {
        this.trxStatusText = 'موفق',
        this.color = 'green'
      } else if (newValue === TransactionStatus.FAILED) {
        this.trxStatusText = 'ناموفق',
        this.color = 'red'
      }
    }
  }
})
</script>
