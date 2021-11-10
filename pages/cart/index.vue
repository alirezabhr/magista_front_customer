<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="8" lg="6" class="pa-0">
      <AuthDialog v-if="showDialog" @closeDialog="showDialog=false" />
       <v-dialog
          v-model="showCustomerForm"
          persistent
          max-width="600px"
        >
          <CustomerForm
            :is-submitting-form="isCreatingCustomer"
            @submit="submitCustomerForm"
            @close="showCustomerForm = false"
          />
      </v-dialog>
      <v-card v-if="getCart.length > 0" min-height="620" class="pa-2">
        <v-card v-for="shopOrder in getCart" :key="shopOrder.shop_id" class="pa-2 my-2">
          <v-card-title>
            خرید از {{ shopOrder.shop_name }}
          </v-card-title>

          <div v-for="orderItem in shopOrder.orders" :key="orderItem.product.shortcode">
            <v-card v-if="orderItem.product.shop.id === shopOrder.shop_id" outlined class="mb-2">
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

import AuthDialog from '@/components/AuthDialog.vue'
import CustomerForm from '@/components/CustomerForm.vue'

export default {
  name: 'CartPage',
  components: {
    AuthDialog,
    CustomerForm
  },
  data () {
    return {
      showDialog: false,
      showCustomerForm: false,
      isCreatingCustomer: false
    }
  },
  methods: {
    ...mapActions('cart', ['addItemToCart', 'removeItemFromCart', 'createCartInvoices']),
    ...mapActions('auth', ['createCustomer']),

    pay () {
      if (!this.isAuthenticated) {
        this.showDialog = true
      } else {
        if (this.getCustomerId) {
          this.createCartInvoices().catch((resp) => {
            console.log('catch error')
            console.log(resp)
          })
        } else {
          this.showCustomerForm = true
        }
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
    },
    submitCustomerForm (payload) {
      this.isCreatingCustomer = true
      this.createCustomer(payload).then(() => {
        this.isCreatingCustomer = false
        this.showCustomerForm = false
      }).catch((response) => {
        this.isCreatingCustomer = false
        console.log(response)
      })
    }
  },
  computed: {
    ...mapGetters('cart', ['getCart', 'getCartItemCounts', 'getCartTotalPrice']),
    ...mapGetters('auth', ['isAuthenticated', 'getCustomerId'])
  }
}
</script>
