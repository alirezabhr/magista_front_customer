<template>
  <v-row justify="center">
    <v-progress-circular v-if="isLoading" indeterminate size="64" />
    <v-col v-else cols="11" sm="9" md="8" lg="6" class="pa-0">
      <div v-if="getInvoiceList.length > 0">
        <v-card v-for="invoice in getInvoiceList" :key="invoice.id" class="pa-2 my-4 mx-2"  elevation="6">
          <v-col>
            <v-card-title class="pt-0 pb-6">
              وضعیت:
              {{ invoice.statusText }}
            </v-card-title>
            <v-card-subtitle class="py-0">
              فروشگاه:
              {{ invoice.shop.instagramUsername }}
            </v-card-subtitle>
            <v-card-subtitle class="py-0">
              <v-icon>mdi-map-marker-outline</v-icon>
              {{ invoice.shop.province }} -
              {{ invoice.shop.city }}
            </v-card-subtitle>
            <v-divider class="mt-2 pb-6" />
            <div class="py-2">
              <v-row v-for="(orderItem, i) in invoice.orderItems" :key="i" class="px-2" justify="center">
                <OrderItem :order-item="orderItem" />
              </v-row>
            </div>
            <v-row class=" py-2 px-3 text-subtitle1" no-gutters>
              قیمت کل:
              {{ invoice.totalPrice }}
              تومان
            </v-row>
            <v-card-subtitle class="py-0">
              {{ invoice.createdAt }}
            </v-card-subtitle>
          </v-col>
        </v-card>
      </div>
      
      <v-card v-else min-height="620" class="pa-2">
        <v-card-title>
          <v-col>
            <v-row justify="center">
              سفارشی موجود نمی‌باشد!
            </v-row>
            <v-row justify="center">
              <v-img
                contain
                max-height="250"
                max-width="250"
                :src="getEmptyStateImage"
              />
            </v-row>
          </v-col>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'OrdersPage',
  components: {
    OrderItem
  },
  data () {
    return {
      isLoading: false
    }
  },
  mounted () {
    this.isLoading = true
    this.customerInvoices().then(() => {
      this.isLoading = false
    }).catch((resp) => {
      this.isLoading = false
      console.log(resp)
    })
  },
  methods: {
    ...mapActions('invoice', ['customerInvoices'])
  },
  computed: {
    ...mapGetters('invoice', ['getInvoiceList']),
    
    getEmptyStateImage () {
      return require('~/assets/images/empty_state.png')
    }
  }
}
</script>
