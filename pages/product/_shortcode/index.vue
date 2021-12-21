<template>
  <v-col
    class="pa-0 mx-auto"
    cols="12"
    sm="8"
    md="7"
    lg="6"
  >
    <div v-if="isGettingData">
      <v-row class="px-3 py-1" justify="end" no-gutters>
        <v-skeleton-loader
          type="avatar"
        />
      </v-row>
      <v-skeleton-loader
        type="image, article@2"
      />
    </div>
    <v-card v-else min-height="670">
      <v-row dir="ltr" no-gutters class="px-2 py-1 white" align="center">
        <NuxtLink :to="`/shop/${getPost.shop.instagramUsername}`">
          <v-avatar color="primary" style="border-style: solid;">
            <img
              :src="getShopProfilePhotoUrl"
              alt="profile"
            >
          </v-avatar>
        </NuxtLink>
        <NuxtLink :to="`/shop/${getPost.shop.instagramUsername}`" class="text-decoration-none" active-class="text-decoration-none">
          <div class="pl-3 font-weight-bold black--text">{{ getPost.shop.instagramUsername }}</div>
        </NuxtLink>
        <v-spacer />
      </v-row>
      <v-carousel
        id="imageFrame"
        v-model="carouselIndex"
        :show-arrows="false"
        :hide-delimiters="getPost.productImages.length <= 1"
        hide-delimiter-background
        class="pa-0 ma-0"
        height="100%"
      >
        <v-carousel-item
          v-for="productImage in getPost.productImages"
          :key="productImage.id"
        >
          <v-img
            :src="productImageUrl(productImage.displayImage)"
            :aspect-ratio="1"
            style="cursor: pointer;"
            @click.prevent="showProductTags = !showProductTags"
          >
            <div v-for="prod in productImage.products" v-show="showProductTags" :key="prod.id">
              <ProductTag :product="prod"/>
            </div>
            <v-row v-show="!showProductTags && productImage.products.length > 0" class="shop-icon grey darken-4 rounded-circle pa-1" justify="center" align="center" no-gutters>
              <v-icon color="white">mdi-shopping-outline mdi-18px</v-icon>
            </v-row>
          </v-img>
        </v-carousel-item>
      </v-carousel>
      <v-col v-for="product in getPost.productImages[carouselIndex].products" :key="product.id" class="pa-0">
        <v-row no-gutters>
          <v-col class="pa-0 lighten-2" cols="1" align-self="center">
            <v-btn icon class="mx-auto" @click.prevent="addItemToCart(product)">
              <v-icon color="green">
                mdi-plus
              </v-icon>
            </v-btn>
            <v-row justify="center" align="center" class="text-body-2 font-weight-bold" no-gutters>
              {{ productCountInCart(product.id) }}
            </v-row>
            <v-btn icon class="mx-auto">
              <v-icon color="red" :disabled="productCountInCart(product.id) === 0" @click.prevent="removeItemFromCart(product)">
                mdi-minus
              </v-icon>
            </v-btn>
          </v-col>
          <v-col class="pa-2" cols="11">
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
      
      <v-col class="px-3 pt-0 pb-3" no-gutters>
        <v-row v-if="getPost.description" class="font-weight-light" no-gutters>
          <div class="font-weight-bold text-body-2" no-gutters>توضیح پُست</div>
          {{ getPost.description }}
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
      isGettingData: false,
      carouselIndex: 0,
      showProductTags: false,
      showDialog: false
    }
  },
  mounted () {
    this.isGettingData = true

    this.postDetail(this.$route.params.shortcode).then(() => {
      this.isGettingData = false
    }).catch((response) => {
      this.isGettingData = false
      if (response.status === 404) {
        this.$nuxt.error({ statusCode: 404, message: 'محصول یافت نشد.' })
      } else {
        this.$nuxt.error({ statusCode: 500, message: 'خطایی رخ داده است!' })
      }
    })
  },
  computed: {
    ...mapGetters('product', ['getPost']),
    ...mapGetters('cart', ['getCart']),

    getShopProfilePhotoUrl () {
      return process.env.baseURL + this.getPost.shop.profileImageUrl
    }
  },
  methods: {
    ...mapActions('product', ['postDetail']),
    ...mapActions('cart', ['addItemToCart', 'removeItemFromCart']),

    productImageUrl (src) {
      return process.env.baseURL + src
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

<style scoped>
.shop-icon {
  cursor: pointer;
  left: 2%;
  bottom: 2%;
  position: absolute;
}
</style>
