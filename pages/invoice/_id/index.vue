<template>
  <v-row justify="center">
    <v-snackbar
      v-model="showSnackbar"
      color="grey darken-3"
    >
      {{ snackbarMessage }}
    </v-snackbar>
    <v-progress-circular v-if="!getSelectedInvoice" />
    <v-col v-else cols="11" sm="9" md="8" lg="6" class="pa-0">
      <v-card class="pa-2" flat>
        <v-card
          v-for="order in getSelectedInvoice.orders"
          :key="order.id"
          class="pa-2 my-4 mx-2"
          elevation="6"
        >
          <v-col>
            <v-card-title class="pt-0 pb-6">
              وضعیت:
              {{ order.statusText }}
            </v-card-title>
            <v-card-subtitle class="py-0">
              فروشگاه:
              {{ order.shop.instagramUsername }}
            </v-card-subtitle>
            <v-card-subtitle class="py-0">
              <v-icon>mdi-map-marker-outline</v-icon>
              {{ order.shop.province }} -
              {{ order.shop.city }}
            </v-card-subtitle>
            <v-divider class="mt-2 pb-6" />
            <div class="py-2">
              <v-row
                v-for="(orderItem, i) in order.orderItems"
                :key="i"
                class="px-2"
                justify="center"
              >
                <OrderItem :order-item="orderItem" />
              </v-row>
            </div>
            <v-row class="py-2 px-3 text-subtitle1" no-gutters>
              قیمت کل:
              {{ order.totalPrice }}
              تومان
            </v-row>
            <v-card-subtitle class="py-0">
              {{ order.createdAt }}
            </v-card-subtitle>
          </v-col>
        </v-card>
        <v-card-actions>
          <v-btn
            rounded
            color="green"
            class="darken-1 white--text px-4 mx-auto"
            @click.prevent="pay"
          >
            پرداخت
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "InvoiceIdPage",
  computed: {
    ...mapGetters('invoice', ['getSelectedInvoice'])
  },
  data () {
    return {
      showSnackbar: false,
      snackbarMessage: ''      
    }
  },
  async mounted() {
    const invoiceId = this.$route.params.id
    const selectedInvoice = this.getSelectedInvoice
    
    if (selectedInvoice) {
      if (selectedInvoice.id == invoiceId) {
        return
      }
    } else {
      this.selectedInvoiceData(invoiceId)
    }
  },
  methods: {
    ...mapActions('invoice', ['selectedInvoiceData', 'paySelectedInvoice']),

    pay () {
      this.paySelectedInvoice().then((url) => {
        this.$router.push(url)
      }).catch(() => {
        this.snackbarMessage = 'در حال حاضر تکمیل خرید ممکن نمی‌باشد.'
        this.showSnackbar = true
      })
    }
  }
}
</script>
