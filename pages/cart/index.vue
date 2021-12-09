<template>
  <v-row justify="center">
    <v-snackbar
      v-model="showSnackbar"
      color="grey darken-3"
    >
      {{ snackbarMessage }}
    </v-snackbar>
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
        <v-card v-for="shopCartOrder in getCart" :key="shopCartOrder.shop_id" class="pa-2 my-2">
          <v-card-title>
            خرید از {{ shopCartOrder.shop_name }}
          </v-card-title>

          <div v-for="orderItem in shopCartOrder.orderItems" :key="orderItem.product.shortcode">
            <CartOrderItem v-if="orderItem.product.shop.id === shopCartOrder.shop_id" :orderItem="orderItem"/>
          </div>
        </v-card>
        
        <v-card flat outlined class="mx-5 my-2 pa-3" v-if="getCustomer">
          <v-row no-gutters>
            <v-icon>mdi-map-marker-outline mdi-18px</v-icon>
            <v-row class="text-caption" no-gutters>{{ getCustomer.province }}-{{ getCustomer.city }}، {{ getCustomer.address }}</v-row>
          </v-row>
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
            ادامه خرید
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
      showSnackbar: false,
      snackbarMessage: ''
    }
  },
  computed: {
    ...mapGetters('cart', ['getCart', 'getCartItemCounts', 'getCartTotalPrice']),
    ...mapGetters('auth', ['isAuthenticated', 'getCustomer', 'getCustomerId']),

    getEmptyStateImage () {
      return require('~/assets/images/empty_state.png')
    }
  },
  methods: {
    ...mapActions('cart', ['createCartOrders']),
    ...mapActions('auth', ['createCustomer']),

    pay () {
      if (!this.isAuthenticated) {
        this.showDialog = true
      } else {
        if (this.getCustomerId) {
          this.createCartOrders().then((invoiceId) => {
            this.$router.push(`/invoice/${invoiceId}`)
          }).catch(() => {
            this.snackbarMessage = 'در حال حاضر تکمیل خرید ممکن نمی‌باشد.'
            this.showSnackbar = true
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
      }).catch(() => {
        this.isCreatingCustomer = false
        this.snackbarMessage = 'خطا در ثبت اطلاعات'
        this.showSnackbar = true
      })
    }
  }
}
</script>
