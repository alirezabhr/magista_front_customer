<template>
  <div>
    <v-dialog
      v-model="showDialog"
      max-width="600px"
    >
      <RateOrderForm :is-submitting="isSubmitting" @rate="rate" />
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
          <v-row v-for="(orderItem, i) in order.orderItems" :key="i" class="px-2" justify="center" no-gutters>
            <OrderItem :order-item="orderItem" />
          </v-row>
        </div>
        <v-row v-if="order.status === orderStatus.AWAITING_PAYMENT && isInInvoicePage" class="py-2 px-3" no-gutters>
          <v-col cols="10">
            <v-text-field
              v-model="discountCode"
              :label="order.hasDiscountCode ? '********' : 'بُن تخفیف'"
              hide-details
              :disabled="order.hasDiscountCode"
              outlined
              dense
            />
            <div class="text-caption red--text">{{ discountCodeErrorMsg }}</div>
          </v-col>
          <v-col cols="2">
            <div v-if="isSubmittingDiscount" class="pt-2 pr-4" >
              <v-progress-circular indeterminate size="24" color="green"/>
            </div>
            <v-btn v-else :disabled="order.hasDiscountCode" text color="green" class="font-weight-bold" @click.prevent="applyDiscount">
              ثبت
            </v-btn>
          </v-col>
        </v-row>
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
import RateOrderForm from '@/components/order/RateOrderForm.vue'

export default {
  name: 'OrderCard',
  props: {
    order: {
      type: Object,
      required: true
    },
    isInInvoicePage: {
      type: Boolean,
      required: true
    }
  },
  components: {
    OrderItem,
    RateOrderForm
  },
  data () {
    return {
      orderStatus: OrderStatus,
      showDialog: false,
      isSubmitting: false,
      discountCode: '',
      isSubmittingDiscount: false,
      discountCodeErrorMsg: ''
    }
  },
  methods: {
    ...mapActions('order', ['editOrder', 'rateOrder']),
    ...mapActions('invoice', ['applyOrderDiscount']),

    hadReceivedOrder () {
      this.isSubmitting = true
      const o = { ...this.order }
      o.status = OrderStatus.RECEIVED

      this.editOrder(o).then ( () => {
        this.isSubmitting = false
        this.showDialog = true
      })
    },
    rate (rateNumber) {
      this.isSubmitting = true
      const o = { ...this.order }
      o.rate = rateNumber

      this.rateOrder(o).then ( () => {
        this.isSubmitting = false
        this.showDialog = false
      })
    },
    applyDiscount () {
      this.discountCodeErrorMsg = ''
      if (this.discountCode) {
        this.isSubmittingDiscount = true
        const data = { orderId: this.order.id, code: this.discountCode }
        this.applyOrderDiscount(data).then(() => {
          this.isSubmittingDiscount = false
        }).catch(() => {
          this.isSubmittingDiscount = false
          this.discountCodeErrorMsg = 'بُن تخفیف نامعتبر است'
        })
      } else {
        this.discountCodeErrorMsg = 'کد تخفیف خالی است'
      }
    }
  }
}
</script>
