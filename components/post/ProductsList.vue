<template>
  <div v-if="productImages.length === 0">
    <v-skeleton-loader
      class="ma-0 pa-0"
      type="article"
    />
  </div>
  <div v-else>
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      timeout="1500"
    >
      <v-icon>{{ snackbarIcon }}</v-icon>
      <span class="font-weight-bold">{{ snackbarMessage }}</span>
    </v-snackbar>
    <v-col v-for="product in productImages[carouselIndex].products" :key="product.id" class="pa-0">
      <v-row no-gutters>
        <v-col class="pa-0 lighten-2" cols="2" align-self="center">
          <v-row justify="center" no-gutters>
            <v-btn icon class="mx-auto" @click.prevent="addItem(product)">
              <v-icon size="30" color="green">
                mdi-plus
              </v-icon>
            </v-btn>
          </v-row>
          <v-row justify="center" align="center" class="text-body-1 font-weight-bold" no-gutters>
            {{ productCountInCart(product.id) }}
          </v-row>
          <v-row justify="center" no-gutters>
            <v-btn icon class="mx-auto" :disabled="productCountInCart(product.id) === 0" @click="removeItem(product)">
              <v-icon size="30" color="red">
                mdi-minus
              </v-icon>
            </v-btn>
          </v-row>
        </v-col>
        <v-col class="pa-2" cols="10">
          <v-row class="font-weight-bold" no-gutters>
            {{ product.title }}
          </v-row>
          <v-row no-gutters align="center">
            <v-rating
              v-model="product.rate"
              background-color="yellow accent-4"
              color="yellow accent-4"
              readonly
              half-increments
              dense
              size="24"
            />
            <div class="grey-text text-darken-1 font-weight-light px-2">
              <div v-if="product.rate">({{ product.rate }})</div>
              <div v-else>بدون نظر</div>
            </div>
          </v-row>
          <v-row no-gutters class="px-1">
            قیمت:
            <v-row v-if="product.originalPrice" no-gutters class="pr-2">
              <div
                v-show="product.discountPercent"
                class="pr-2 text-decoration-line-through"
              >
                {{ product.originalPrice }}
              </div>
              <v-icon v-show="product.discountPercent" class="pr-1">mdi-chevron-triple-left</v-icon>
              <div>
                {{ product.finalPrice }}
              </div>
              تومان
            </v-row>
            <div v-else>ندارد</div>
          </v-row>
          <v-row no-gutters class="px-1">
            تخفیف:
            <div v-if="product.discountPercent" class="px-2 font-weight-bold">
              <v-icon color="grey darken-2">mdi-percent mdi-18px</v-icon>
              {{ product.discountPercent }}
            </div>
            <div v-else>ندارد</div>
          </v-row>
          <v-col v-if="product.attributes.length > 0" class="px-0 py-3">
            <div class="font-weight-bold text-body-2" no-gutters>
              مشخصات محصول
            </div>
            <v-row
              v-for="attr in product.attributes"
              :key="attr.id"
              no-gutters
            >
              {{ attr.name }}: {{ attr.value }}
            </v-row>
          </v-col>
          <div v-if="product.description" class="font-weight-bold text-body-2 pt-1">توضیحات</div>
          <v-row v-if="product.description" class="font-weight-light" no-gutters>
            {{ product.description }}
          </v-row>
        </v-col>
      </v-row>            
      <div class="pa-2">
        <v-divider />
      </div>
    </v-col>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProdcutsList',
  props: {
    productImages: {
      type: Array,
      required: true
    },
    carouselIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      showSnackbar: false,
      snackbarIcon: '',
      snackbarMessage: '',
      snackbarColor: ''
    }
  },
  computed: {
    ...mapGetters('cart', ['getCart'])
  },
  methods: {
    ...mapActions('cart', ['addItemToCart', 'removeItemFromCart']),

    addItem (product) {
      this.addItemToCart(product)
      this.snackbarColor = 'green darken-2'
      this.snackbarIcon = 'mdi-check-circle-outline'
      this.snackbarMessage = 'به سبد خرید اضافه شد.'
      this.showSnackbar = true
    },
    removeItem (product) {
      this.removeItemFromCart(product)
      this.snackbarColor = 'red'
      this.snackbarIcon = 'mdi-close-circle-outline'
      this.snackbarMessage = 'از سبد خرید حذف شد.'
      this.showSnackbar = true
    },
    productCountInCart (productId) {
      let count = 0
      this.getCart.forEach((shopCartItem) => {
        const oi = shopCartItem.orderItems.find(el => el.product.id === productId)
        if (oi) {
          count =  oi.count
        }
      })
      return count
    }
  }
}
</script>

<style>

</style>