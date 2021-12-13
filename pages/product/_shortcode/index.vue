<template>
  <v-progress-circular v-if="!getProduct" indeterminate size="64" />
  <v-col
    v-else
    class="pa-0 mx-auto"
    cols="12"
    sm="8"
    md="7"
    lg="6"
  >
    <AddToCartDialog v-if="showDialog" @closeDialog="showDialog=false" />
    <v-card min-height="670">
      <v-row dir="ltr" no-gutters class="px-2 py-1 white" align="center">
        <NuxtLink :to="`/shop/${getProduct.shop.instagramUsername}`">
          <v-avatar color="primary" style="border-style: solid;">
            <img
              :src="getShopProfilePhotoUrl"
              alt="profile"
            >
          </v-avatar>
        </NuxtLink>
        <NuxtLink :to="`/shop/${getProduct.shop.instagramUsername}`" class="text-decoration-none" active-class="text-decoration-none">
          <div class="pl-3 font-weight-bold black--text">{{ getProduct.shop.instagramUsername }}</div>
        </NuxtLink>
        <v-spacer />
      </v-row>
      <v-img :src="productImageUrl" :aspect-ratio="1">
        <v-overlay
          absolute
          value="1"
          opacity="0"
          class="my-overlay"
        >
          <v-row style="width: 100%; height: 100%;" no-gutters align="end" class="pa-2">
            <v-row v-if="getProduct.rate" no-gutters align="center">
              <v-rating
                v-model="getProduct.rate"
                background-color="yellow accent-4"
                color="yellow accent-4"
                readonly
                half-increments
                dense
                size="20"
              />
              <div class="grey-text text-darken-1 font-weight-light px-2">
                ({{ getProduct.rate }})
              </div>
            </v-row>
            <v-spacer />
            <v-row v-if="getProduct.discountPercent" class="font-weight-bold" no-gutters justify="end">
              <v-avatar color="orange">
                <v-row no-gutters justify="center">
                  <v-icon class="pa-0 ma-0">mdi-percent mdi-18px</v-icon>
                  <div>{{ getProduct.discountPercent }}</div>
                </v-row>
              </v-avatar>
            </v-row>
          </v-row>
        </v-overlay>
      </v-img>
      <v-col class="pa-3" no-gutters>
        <v-row no-gutters class="px-1">
          قیمت:
          <v-row  no-gutters class="pr-2">
            <div v-show="getProduct.discountPercent" class="pr-2 text-decoration-line-through">
              {{ getProduct.originalPrice }}
            </div>
            <v-icon v-show="getProduct.discountPercent" class="pr-1">mdi-chevron-triple-left</v-icon>
            <div>
              {{ getProduct.finalPrice }}
            </div>
            تومان
          </v-row>
        </v-row>
        <v-row no-gutters class="px-1">
          <v-icon>mdi-map-marker-outline mdi-18px</v-icon>
          <v-row class="text-caption" no-gutters>از {{getProduct.shop.province}} - {{getProduct.shop.city}}</v-row>
        </v-row>
        <v-row v-if="productCountInCart === 0" class="py-3" justify="center" no-gutters>
          <v-btn rounded color="green" class="white--text" @click.prevent="addToCart(getProduct)">
            افزودن به سبد
          </v-btn>
        </v-row>
        <v-row v-else class="py-3" justify="center" no-gutters align="center">
          <v-card>
            <v-card-actions class="pa-0">
              <v-btn icon rounded large class="white--text" @click.prevent="addItemToCart(getProduct)">
                <v-icon color="green">mdi-plus</v-icon>
              </v-btn>
              <div class="font-weight-bold text-h5">{{ productCountInCart }}</div>
              <v-btn icon rounded large class="white--text" @click.prevent="removeItemFromCart(getProduct)">
                <v-icon color="red">mdi-minus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
        <v-divider class="px-1 pb-3" />
        <v-row class="font-weight-bold" no-gutters>
          {{ getProduct.title }}
        </v-row>
        <v-col v-if="getProduct.attributes.length > 0" class="px-0 py-3">
          <div class="font-weight-bold text-body-2" no-gutters>مشخصات</div>
          <v-row v-for="(attr, index) in getProduct.attributes" :key="index" no-gutters>
            {{ attr.name }}:  {{ attr.value }}
          </v-row>
        </v-col>
        <v-row v-if="getProduct.description" class="font-weight-light" no-gutters>
          <div class="font-weight-bold text-body-2" no-gutters>توضیح</div>
          {{ getProduct.description }}
        </v-row>
      </v-col>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductShortcodePage',
  data () {
    return {
      showDialog: false
    }
  },
  mounted () {
    this.productDetail(this.$route.params.shortcode)
      .catch((response) => {
        if (response.status === 404) {
          this.$nuxt.error({ statusCode: 404, message: 'محصول یافت نشد.' })
        } else {
          this.$nuxt.error({ statusCode: 500, message: 'خطایی رخ داده است!' })
        }
      })
  },
  computed: {
    ...mapGetters('product', ['getProduct']),
    ...mapGetters('cart', ['productCountInCart']),

    getShopProfilePhotoUrl () {
      return process.env.baseURL + this.getProduct.shop.profileImageUrl
    },
    productImageUrl () {
      return process.env.baseURL + this.getProduct.displayImageUrl
    }
  },
  methods: {
    ...mapActions('product', ['productDetail']),
    ...mapActions('cart', ['addItemToCart', 'removeItemFromCart']),

    addToCart (product) {
      this.addItemToCart(product)
      this.showDialog = true
    }
  }
}
</script>

<style scoped>
  .my-overlay >>> .v-overlay__content {
    width: 100%;
    height: 100%;
  }
</style>
