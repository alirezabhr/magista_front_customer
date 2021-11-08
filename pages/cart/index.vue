<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="8" lg="6" class="pa-0">
      <AuthDialog v-if="showDialog" @closeDialog="showDialog=false" />
      <v-card v-if="getOrdersList.length > 0" min-height="620" class="pa-2">
        <v-card v-for="shop in getOrdersShopList" :key="shop.id" class="pa-2 my-2">
          <v-card-title>
            خرید از {{ shop.instagram_username }}
          </v-card-title>

          <div v-for="orderItem in getOrdersList" :key="orderItem.product.shortcode">
            <v-card v-if="orderItem.product.shop.id === shop.id" outlined class="mb-2">
              <v-row class="pa-2">
                <v-col cols="3">
                  <v-card
                    outlined
                  >
                    <v-img
                      :aspect-ratio="1"
                      :src="getFullImageUrl(orderItem.product.displayImageUrl)"
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
                <v-col cols="1" class="" align-self="center">
                  <v-row justify="center">
                    <v-btn icon @click.prevent="addItemToCart(orderItem.product)"><v-icon>mdi-plus</v-icon></v-btn>
                  </v-row>
                  <v-row class="font-weight-bold" justify="center">
                    {{ orderItem.count }}
                  </v-row>
                  <v-row justify="center">
                    <v-btn icon @click.prevent="removeItemFromCart(orderItem.product)"><v-icon>mdi-minus</v-icon></v-btn>
                  </v-row>
                </v-col>
                <v-col cols="7">
                  <v-row no-gutters>
                    <div class="text-truncate">
                      {{ orderItem.product.title }}
                    </div>
                  </v-row>
                  <v-row class="font-weight-bold" no-gutters>
                    {{ orderItem.product.price }} تومان
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-card>
        <v-card-actions>
          <v-col>
            <div>
                تعداد کل: {{ getCartItemCounts }}
            </div>
            <div>
              قیمت کل: {{ getCartTotalPrice }} تومان
            </div>
          </v-col>
          <v-btn
            class="darken-1 white--text px-4 mx-auto"
            color="green"
            rounded
            @click.prevent="pay"
          >
            تکمیل خرید
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else min-height="620" class="pa-2">
        <v-card-title>
          <v-row justify="center">
            سبد شما خالی است!
          </v-row>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CartPage',
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
    ...mapActions('cart', ['addItemToCart', 'removeItemFromCart']),

    pay () {
      if (!this.isAuthenticated) {
        this.showDialog = true
      } else {
        if (this.)
        console.log('PAY')
      }
    },
    getFullImageUrl (src) {
      return process.env.baseURL + src
    },
    shopTotalPrice (shopId) {
      let total = 0
      this.getOrdersList.forEach((orderItem) => {
        if (orderItem.product.shop.id === shopId) {
          const orderPrice = orderItem.count * orderItem.product.price
          total += orderPrice
        }
      });
      return total
    },
    shopTotalCount (shopId) {
      let total = 0
      this.getOrdersList.forEach((orderItem) => {
        if (orderItem.product.shop.id === shopId){
          total += orderItem.count
        }
      })
      return total
    }
  },
  computed: {
    ...mapGetters('cart', ['getOrdersList', 'getOrdersShopList', 'getCartItemCounts', 'getCartTotalPrice']),
    ...mapGetters('auth', ['isAuthenticated'])
  }
}
</script>
