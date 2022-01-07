<template>
  <div>
    <v-dialog
      v-model="showDialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>امتیاز به سفارش</v-card-title>
        <v-card-text>شما می‌توانید با ثبت نظرتان در بهبود کیفیت فروشگاه کمک کنید.</v-card-text>
        <v-card-actions>
          <v-col>
            <v-rating
              v-model="rating"
              background-color="orange lighten-3"
              color="orange"
              large
            />
            <div class="red--text">{{ ratingError }}</div>
            <v-row v-if="rating" class="orange--text font-weight-bold text-h6" dir="ltr" justify="center" no-gutters>
              {{ rating }} / 5
            </v-row>
          </v-col>
        </v-card-actions>
        <v-card-actions>
          <v-col cols="8" class="mx-auto">
            <v-btn width="100%" class="pa-2 font-weight-bold" color="primary" rounded @click.prevent="rate" :loading="isSubmitting">
              ثبت
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card class="pa-2 my-4 mx-2"  elevation="6">
      <v-col>
        <v-card-title class="pt-0 pb-6">
          وضعیت:
          {{ order.statusText }}
        </v-card-title>
        <v-card-subtitle class="py-0">
          فروشگاه:
          {{ order.shop.instagramUsername }}
        </v-card-subtitle>
        <v-card-subtitle class="py-0">
          <v-icon>mdi-map-marker-outline</v-icon>
          {{ order.shop.province }} -
          {{ order.shop.city }}
        </v-card-subtitle>
        <v-divider class="mt-2 pb-6" />
        <div class="py-2">
          <v-row v-for="(orderItem, i) in order.orderItems" :key="i" class="px-2" justify="center">
            <OrderItem :order-item="orderItem" />
          </v-row>
        </div>
        <v-row class=" py-2 px-3 text-subtitle1" no-gutters>
          قیمت کل:
          {{ order.totalPrice }}
          تومان
        </v-row>
        <v-card-subtitle class="py-0">
          {{ order.createdAt }}
        </v-card-subtitle>
        <v-card-actions v-if="order.status === orderStatus.SHIPPED">
          <v-btn dark color="green" class="mx-auto" @click.prevent="hadReceivedOrder" :loading="isSubmitting">دریافت کردم</v-btn>
        </v-card-actions>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import OrderStatus from '@/models/order_status'
import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'OrderCard',
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  components: {
    OrderItem
  },
  data () {
    return {
      orderStatus: OrderStatus,
      rating: 0,
      showDialog: false,
      ratingError: '',
      isSubmitting: false
    }
  },
  methods: {
    ...mapActions('order', ['editOrder', 'rateOrder']),

    hadReceivedOrder () {
      this.isSubmitting = true
      const o = { ...this.order }
      o.status = OrderStatus.RECEIVED

      this.editOrder(o).then ( () => {
        this.isSubmitting = false
        this.showDialog = true
      })
    },
    rate () {
      if (this.rating) {
        this.isSubmitting = true
        const o = { ...this.order }
        o.rate = this.rating

        this.rateOrder(o).then ( () => {
          this.isSubmitting = false
          this.showDialog = false
        })
      } else {
        this.ratingError = 'لطفا بین 1 تا 5 ستاره نظر دهید.'
      }
    }
  }
}
</script>
