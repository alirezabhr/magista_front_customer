<template>
  <v-card class="pa-2 my-2">
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
              <span v-if="isDeliveryFree(shopCartOrder.shop)" class="font-weight-bold">رایگان</span>
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
              <span v-if="isDeliveryFree(shopCartOrder.shop)" class="font-weight-bold">رایگان</span>
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
</template>

<script lang="ts">
import { PropType } from "vue"
import Vue from "vue"
import { mapGetters, mapMutations } from 'vuex'
import ShopCartOrder from '@/models/shop_cart_order'
import FreeDelivery from '~/models/shipping/free_delivery'
import Shop from '~/models/shop'
import Shipping from "~/models/shipping/shipping"

export default Vue.extend({
  name: 'ShopDeliverySelectCard',
  props: {
    shopCartOrder: {
      type: Object as PropType<ShopCartOrder>,
      required: true
    }
  },
  computed: {
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
    }
  },
  methods: {
    ...mapMutations('cart', ['changeShopCartOrderDelivery']),
    
    shopProfileImageUrl (src: string) : string {
      return process.env.baseURL + src
    },
    isDeliveryFree (shop: Shop) : boolean {
      return this.isFreeInCountry(shop.delivery) || this.isFreeInSameLocation(shop)
    },
    isFreeInCountry (delivery: Shipping) : boolean {
      return delivery.countryCost == FreeDelivery.TOTALLY_FREE || this.isOccasionallyFreeInCountry(delivery)
    },
    isOccasionallyFreeInCountry (delivery: Shipping) : boolean {
      if (delivery.countryCost == FreeDelivery.OCCASIONALLY_FREE) {
        return this.shopCartOrder.totalPrice() > delivery.countryFreeCostFrom.freeFrom
      }
      return false
    },
    isFreeInSameLocation (shop: Shop) : boolean {
      return this.inSameLocation(shop.province, shop.city) && (this.isTotallyFreeInCity(shop) || this.isOccasionallyFreeInCity(shop.delivery))
    },
    isOccasionallyFreeInCity (delivery: Shipping) : boolean {
      if (delivery.cityCost == FreeDelivery.OCCASIONALLY_FREE) {
        return this.shopCartOrder.totalPrice() > delivery.cityFreeCostFrom.freeFrom
      }
      return false
    },
    isTotallyFreeInCity (shop: Shop) : boolean {
      return shop.delivery.cityCost == FreeDelivery.TOTALLY_FREE
    },
    inSameLocation (shopProvince: string, shopCity: string) : boolean {
      return this.customerProvince === shopProvince && this.customerCity === shopCity
    },
    changeDelivery(shopIdN: number, deliveryIdN: number) : void {
      this.changeShopCartOrderDelivery({shopId: shopIdN, deliveryId: deliveryIdN})
    }
  }
})
</script>
