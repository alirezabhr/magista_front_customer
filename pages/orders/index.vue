<template>
  <v-row justify="center" no-gutters>
    <v-progress-circular v-if="isLoading" indeterminate size="64" />
    <v-col v-else cols="11" sm="9" md="8" lg="6" class="pa-0">
      <div v-if="getOrderList.length > 0">
        <div v-for="order in getOrderList" :key="order.id" >
          <OrderCard :order="order" />
        </div>
      </div>
      
      <v-card v-else min-height="620" class="pa-2">
        <v-card-title>
          <v-col>
            <v-row justify="center" no-gutters>
              سفارشی موجود نمی‌باشد!
            </v-row>
            <v-row justify="center" no-gutters>
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

import OrderCard from '~/components/OrderCard.vue'

export default {
  name: 'OrdersPage',
  components: {
    OrderCard
  },
  data () {
    return {
      isLoading: false
    }
  },
  mounted () {
    this.isLoading = true
    this.customerOrders().then(() => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions('order', ['customerOrders'])
  },
  computed: {
    ...mapGetters('order', ['getOrderList']),
    
    getEmptyStateImage () {
      return require('~/assets/images/empty_state.png')
    }
  }
}
</script>
