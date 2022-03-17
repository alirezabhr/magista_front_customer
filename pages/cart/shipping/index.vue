<template>
  <v-row justify="center" no-gutters>
    <v-snackbar
      v-model="showSnackbar"
      color="grey darken-3"
    >
      {{ snackbarMessage }}
    </v-snackbar>
    <v-col cols="12" sm="9" md="8" lg="6" class="pa-0">
      <v-card v-if="isClientRendered" min-height="620" outlined color="grey lighten-4" class="pa-2">
        <v-card v-for="shopCartOrder in getCart" :key="shopCartOrder.shopId" class="pa-2 my-2">
          <v-card-title>
            <v-col cols="3">
              <v-avatar>
                <img
                  :src="shopProfileImageUrl(shopCartOrder.shop.profilePic)"
                  :aspect-ratio="1"
                  alt="پروفایل"
                >
              </v-avatar>
            </v-col>
            <v-col cols="9">
              <div>{{ shopCartOrder.shop.instagramUsername }}</div>
              <div class="text-caption">
                <v-icon small>mdi-map-marker-outline</v-icon>
                {{ shopCartOrder.shop.province }} - {{ shopCartOrder.shop.city }}
              </div>
            </v-col>
          </v-card-title>

          <v-card-text v-show="!shopCartOrder.shop.delivery.sendEverywhere && !inSameLocation(shopCartOrder.shop.province, shopCartOrder.shop.city)" class="red--text py-0">
            این فروشگاه فقط به {{ shopCartOrder.shop.city }} ارسال دارد.
          </v-card-text>

          <v-card-subtitle class="pb-1 pt-3">روش ارسال را انتخاب کنید.</v-card-subtitle>
          
          <div class="my-0 mx-4">
            <v-card
              v-if="shopCartOrder.shop.delivery.nationalPost"
              outlined
              class="pa-2 my-1"
              :style="shopCartOrder.deliveryId === shopCartOrder.shop.delivery.nationalPost.id ? 'border: 1px solid #42A5F5;' : ''"
              @click.prevent="changeDelivery(shopCartOrder.shopId, shopCartOrder.shop.delivery.nationalPost.id)"
            >
              <v-row align="center" no-gutters>
                <v-col offset="1" cols="1">
                  <v-card height="18" width="18" rounded="circle" :color="shopCartOrder.deliveryId === shopCartOrder.shop.delivery.nationalPost.id ? '#42A5F5' : ''" elevation="0" style="border: 1px solid #42A5F5;" />
                </v-col>
                <v-col class="justify-start" offset="1" cols="9">
                  <div>پست پیشتاز</div>
                  <div class="text-caption">
                    هزینه حدودی: 
                    <span v-if="inSameLocation(shopCartOrder.shop.province, shopCartOrder.shop.city)" class="font-weight-bold">رایگان</span>
                    <span v-else class="font-weight-bold">{{ shopCartOrder.shop.delivery.nationalPost.base }} تومان</span>
                  </div>
                </v-col>
              </v-row>
            </v-card>
            <v-card
              v-if="shopCartOrder.shop.delivery.onlineDelivery && shopCartOrder.shop.city === getCustomer.city"
              outlined
              class="pa-2 my-1"
              :style="shopCartOrder.deliveryId === shopCartOrder.shop.delivery.onlineDelivery.id ? 'border: 1px solid #42A5F5;' : ''"
              @click.prevent="changeDelivery(shopCartOrder.shopId, shopCartOrder.shop.delivery.onlineDelivery.id)"
            >
              <v-row align="center" no-gutters>
                <v-col offset="1" cols="1">
                  <v-card height="18" width="18" rounded="circle" :color="shopCartOrder.deliveryId === shopCartOrder.shop.delivery.onlineDelivery.id ? '#42A5F5' : ''" elevation="0" style="border: 1px solid #42A5F5;" />
                </v-col>
                <v-col class="justify-start" offset="1" cols="9">
                  <div>پیک آنلاین</div>
                  <div class="text-caption">
                    هزینه حدودی:
                    <span v-if="inSameLocation(shopCartOrder.shop.province, shopCartOrder.shop.city)" class="font-weight-bold">رایگان</span>
                    <span v-else class="font-weight-bold">{{ shopCartOrder.shop.delivery.onlineDelivery.base }} تومان</span>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </div>

          <div class="pb-6">
            <v-row v-for="orderItem in shopCartOrder.orderItems" :key="orderItem.product.shortcode" class="px-6" no-gutters>
              <div class="px-4">{{ orderItem.count }} ×</div>
              <div>{{ orderItem.product.title }}</div>
            </v-row>
          </div>
        </v-card>
        
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
      </v-card>
      <v-card v-else min-height="620" outlined color="grey lighten-4" class="pa-2">
        <v-skeleton-loader type="image@2, card-heading" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'CartShippingPage',
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

    customerProvince () {
      if (this.getCustomer) {
        return this.getCustomer.province
      }
      return null
    },
    customerCity () {
      if (this.getCustomer) {
        return this.getCustomer.city
      }
      return null
    },
    customerFullAddress () {
      if (this.getCustomer) {
        return `${this.getCustomer.province}-${this.getCustomer.city}، ${this.getCustomer.address}`
      }
      return ''
    }
  },
  mounted () {
    this.isClientRendered = true
  },
  methods: {
    ...mapMutations('cart', ['changeShopCartOrderDelivery']),
    ...mapActions('cart', ['createCartOrders']),
    
    inSameLocation (shopProvince, shopCity) {
      return this.customerProvince === shopProvince && this.customerCity === shopCity
    },
    changeDelivery(shopIdN, deliveryIdN) {
      this.changeShopCartOrderDelivery({shopId: shopIdN, deliveryId: deliveryIdN})
    },
    shopProfileImageUrl (src) {
      return process.env.baseURL + src
    },
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
