<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="8" lg="6" class="pa-0">
      <v-alert
      v-model="paymentAlert"
      border="left"
      close-text="بستن"
      color="deep-purple accent-4"
      dark
      dismissible
    >
      در حال حاضر به دلیل آماده نبودن درگاه پرداخت امکان پرداخت وجود ندارد
    </v-alert>
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
        <v-card v-for="shopCartOrder in getCart" :key="shopCartOrder.shop_id" class="pa-2 my-2">
          <v-card-title>
            خرید از {{ shopCartOrder.shop_name }}
          </v-card-title>

          <div v-for="orderItem in shopCartOrder.orderItems" :key="orderItem.product.shortcode">
            <CartOrderItem v-if="orderItem.product.shop.id === shopCartOrder.shop_id" :orderItem="orderItem"/>
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
          <v-col>
            <v-row justify="center">
              سبد شما خالی است!
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

import AuthDialog from '@/components/AuthDialog.vue'
import CustomerForm from '@/components/CustomerForm.vue'
import CartOrderItem from '~/components/CartOrderItem.vue'

export default {
  name: 'CartPage',
  components: {
    AuthDialog,
    CustomerForm,
    CartOrderItem
  },
  data () {
    return {
      showDialog: false,
      showCustomerForm: false,
      isCreatingCustomer: false,
      paymentAlert: false,
    }
  },
  computed: {
    ...mapGetters('cart', ['getCart', 'getCartItemCounts', 'getCartTotalPrice']),
    ...mapGetters('auth', ['isAuthenticated', 'getCustomerId']),

    getEmptyStateImage () {
      return require('~/assets/images/empty_state.png')
    }
  },
  methods: {
    ...mapActions('cart', ['createCartInvoices', 'payPendingInvoices']),
    ...mapActions('auth', ['createCustomer']),

    pay () {
      if (!this.isAuthenticated) {
        this.showDialog = true
      } else {
        if (this.getCustomerId) {
          this.createCartInvoices().then(() => {
            // TODO redirect to payment
            this.payPendingInvoices().catch((resp) => {
              console.log(resp.data)
            })
          }).catch((resp) => {
            console.log(resp.data)
          })
        } else {
          this.showCustomerForm = true
        }
      }
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
  }
}
</script>
