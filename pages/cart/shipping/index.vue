<template>
  <v-row justify="center" no-gutters>
    <v-snackbar
      v-model="showSnackbar"
      color="grey darken-3"
    >
      {{ snackbarMessage }}
    </v-snackbar>
    <v-col cols="12" sm="9" md="8" lg="6" class="pa-0">
      <v-card min-height="620" outlined color="grey lighten-4" class="pa-2">
        <div v-if="isClientRendered">
          <div v-if="getCart.length > 0">
            <div v-for="shopCartOrder in getCart" :key="shopCartOrder.shopId">
              <ShopDeliverySelectCard :shop-cart-order="shopCartOrder" />
            </div>
            
            <v-card flat outlined class="mx-5 my-2 pa-3" v-show="getCustomer">
              <v-row no-gutters>
                <v-icon>mdi-map-marker-outline mdi-18px</v-icon>
                <div class="text-caption" no-gutters>{{ customerFullAddress }}</div>
              </v-row>
            </v-card>

            <v-card-actions>
              <v-btn
                class="darken-1 white--text px-4 mx-auto"
                color="green"
                width="80%"
                rounded
                :loading="isSubmitting"
                :disabled="isSubmitting"
                @click.prevent="pay"
              >
                تایید و ادامه
              </v-btn>
            </v-card-actions>
          </div>
          <div v-else min-height="620" class="pa-2">
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
          </div>
        </div>
        <v-skeleton-loader v-else type="image@2, card-heading" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ShopDeliverySelectCard from '@/components/ShopDeliverySelectCard.vue'

export default {
  name: 'CartShippingPage',
  components: {
    ShopDeliverySelectCard
  },
  data () {
    return {
      isSubmitting: false,
      snackbarMessage: '',
      showSnackbar: false,
      isClientRendered: false
    }
  },
  computed: {
    ...mapGetters('cart', ['getCart']),
    ...mapGetters('auth', ['getCustomer']),

    customerFullAddress () {
      if (this.getCustomer) {
        return `${this.getCustomer.province}-${this.getCustomer.city}، ${this.getCustomer.address}`
      }
      return ''
    },
    getEmptyStateImage () {
      return require('~/assets/images/empty_state.png')
    }
  },
  mounted () {
    this.isClientRendered = true
  },
  methods: {
    ...mapActions('cart', ['createCartOrders']),
    
    checkCartValidation () {
      this.getCart.forEach((shopCartOrder) => {
        if (!shopCartOrder.shop.delivery.sendEverywhere && shopCartOrder.shop.city !== this.getCustomer.city) {
          throw new Error(`فروشگاه ${shopCartOrder.shop.instagramUsername} فقط به شهر ${shopCartOrder.shop.city} ارسال می‌کند.`)
        }
        if (!shopCartOrder.deliveryId) {
          throw new Error(`روش ارسال فروشگاه ${shopCartOrder.shop.instagramUsername} را انتخاب نکرده‌اید!`)
        }
      })
    },
    pay () {
      try {
        this.isSubmitting = true
        this.checkCartValidation()
        this.createCartOrders().then((invoiceId) => {
          this.$router.push(`/invoice/${invoiceId}`)
          this.isSubmitting = false
        }).catch(() => {
          this.snackbarMessage = 'در حال حاضر تکمیل خرید ممکن نمی‌باشد.'
          this.showSnackbar = true
          this.isSubmitting = false
        })
      } catch (error) {
        this.snackbarMessage = error.message
        this.showSnackbar = true
        this.isSubmitting = false
      }
    }
  }
}
</script>
