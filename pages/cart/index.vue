<template>
  <v-row justify="center" no-gutters>
    <v-snackbar
      v-model="showSnackbar"
      color="grey darken-3"
    >
      {{ snackbarMessage }}
    </v-snackbar>
    <v-col cols="12" sm="9" md="8" lg="6" class="pa-0">
      <AuthDialog v-if="showAuthDialog" @closeDialog="showAuthDialog=false" />
       <v-dialog
          v-model="showCustomerForm"
          persistent
          max-width="600px"
        >
          <CustomerForm
            :show-warning="true"
            :is-submitting-form="isCreatingCustomer"
            @submit="submitCustomerForm"
            @close="showCustomerForm = false"
          />
      </v-dialog>
      <div v-if="isClientRendered">
        <v-card v-if="getCart.length > 0" min-height="620" class="pa-2">
          <v-card v-for="shopCartOrder in getCart" :key="shopCartOrder.shopId" class="pa-2 my-2">
            <v-card-title>
              خرید از {{ shopCartOrder.shop.instagramUsername }}
            </v-card-title>

            <div v-for="orderItem in shopCartOrder.orderItems" :key="orderItem.product.shortcode">
              <CartOrderItem v-if="orderItem.product.shop.id === shopCartOrder.shopId" :orderItem="orderItem"/>
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
              @click.prevent="submit"
            >
              ادامه خرید
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else min-height="620" class="pa-2">
          <v-card-title>
            <v-col>
              <v-row justify="center" no-gutters>
                سبد شما خالی است!
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
      </div>
      <div v-else>
        <v-card min-height="620" class="pa-2">
          <v-skeleton-loader type="image@2, card-heading" />
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AuthDialog from '@/components/AuthDialog.vue'
import CustomerForm from '@/components/auth/CustomerForm.vue'
import CartOrderItem from '@/components/CartOrderItem.vue'

export default {
  name: 'CartPage',
  components: {
    AuthDialog,
    CustomerForm,
    CartOrderItem
  },
  data () {
    return {
      showAuthDialog: false,
      showCustomerForm: false,
      isCreatingCustomer: false,
      showSnackbar: false,
      snackbarMessage: '',
      isClientRendered: false
    }
  },
  computed: {
    ...mapGetters('cart', ['getCart', 'getCartItemCounts', 'getCartTotalPrice']),
    ...mapGetters('auth', ['isAuthenticated', 'getCustomerId']),

    getEmptyStateImage () {
      return require('~/assets/images/empty_state.png')
    }
  },
  mounted () {
    this.isClientRendered = true
  },
  methods: {
    ...mapActions('auth', ['createCustomer']),

    submit () {
      if (!this.isAuthenticated) {
        this.showAuthDialog = true
      } else {
        if (this.getCustomerId) {
          this.moveToNextPage()
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
        this.moveToNextPage()
      }).catch(() => {
        this.isCreatingCustomer = false
        this.snackbarMessage = 'خطا در ثبت اطلاعات'
        this.showSnackbar = true
      })
    },
    moveToNextPage () {
      this.$router.push('/cart/shipping')
    }
  }
}
</script>
