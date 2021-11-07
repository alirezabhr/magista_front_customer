<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="8" lg="6" class="pa-0">
      <v-card min-height="620" class="pa-2">
        <v-card v-for="shopOrder in getOrderList" :key="shopOrder.shop" class="pa-2">
          <v-card-title>
            خرید از {{ shopOrder.shop }}
          </v-card-title>

          <v-card v-for="order in shopOrder.ordersList" :key="order.product.shortcode" outlined class="mb-2">
            <v-row class="pa-2">
              <v-col cols="3">
                <v-card
                  outlined
                >
                  <v-img
                    :aspect-ratio="1"
                    :src="getFullImageUrl(order.product.displayImageUrl)"
                  >
                    <template #placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-2"
                        />
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="1">
                <v-row class="font-weight-bold" no-gutters>
                  {{ order.count }}X
                </v-row>
              </v-col>
              <v-col cols="7">
                <v-row no-gutters>
                  <div class="text-truncate">
                    {{ order.product.title }}
                  </div>
                </v-row>
                <v-row class="font-weight-bold" no-gutters>
                  {{ order.product.price }} تومان
                </v-row>
              </v-col>
            </v-row>
          </v-card>
          <v-card-actions>
            <v-col>
              <div>
                 تعداد کل: {{ totalCount(shopOrder.ordersList) }}
              </div>
              <div>
                قیمت کل: {{ totalPrice(shopOrder.ordersList) }} تومان
              </div>
            </v-col>
          </v-card-actions>
        </v-card>
        <v-card-actions>
          <v-btn
            class="darken-1 white--text px-4 mx-auto"
            color="green"
            rounded
            @click.prevent=""
          >
            تکمیل خرید
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CartPage',
  methods: {
    getFullImageUrl (src) {
      return process.env.baseURL + src
    },
    totalPrice (ordersList) {
      let total = 0
      ordersList.forEach((order) => {
        const orderPrice = order.count * order.product.price
        total += orderPrice
      });
      return total
    },
    totalCount (orderList) {
      let total = 0
      orderList.forEach((order) => {
        total += order.count
      })
      return total
    }
  },
  computed: {
    ...mapGetters('cart', ['getOrderList'])
  }
}
</script>
