<template>
  <v-col
    class="pa-0 mx-auto"
    cols="12"
    sm="8"
    md="7"
    lg="6"
  >
    <div v-if="!getPost">
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
      <v-row dir="ltr" no-gutters class="px-3 py-2 grey lighten-4" align="center">
        <NuxtLink :to="`/shop/${getPost.shop.instagramUsername}`">
          <v-avatar size="45">
            <v-img :src="getShopProfilePhotoUrl" alt="profile" />
          </v-avatar>
        </NuxtLink>
        <NuxtLink :to="`/shop/${getPost.shop.instagramUsername}`" class="text-decoration-none" active-class="text-decoration-none">
          <div class="pl-3 font-weight-bold text-body-2 grey--text text--darken-4">{{ getPost.shop.instagramUsername }}</div>
        </NuxtLink>
        <v-spacer />
      </v-row>
      <ProductImageCarousel :product-images="getPostProductImages" @changeCarouselIndex="changeCarouselIndex" />
      <v-row class="px-2 pt-2" no-gutters>
        <v-icon>mdi-clock-outline mdi-18px</v-icon>
        <div class="px-2 text-subtitle-2">زمان آماده سازی: <strong>{{ getPreparationText }}</strong></div>
      </v-row>
      <v-row v-if="!getPost.shop.delivery.sendEverywhere" class="px-2 pb-2" no-gutters>
        <v-icon>mdi-truck-outline mdi-flip-h mdi-18px</v-icon>
        <div class="px-2 text-subtitle-2">ارسال فقط به <strong>{{ getPost.shop.city }}</strong></div>
      </v-row>
      <ProductsList :productImages="getPostProductImages" :carouselIndex="carouselIndex" />
      
      <v-col class="px-3 py-0">
        <v-col v-if="getPost.description" class="font-weight-light">
          <div class="font-weight-bold text-body-2">توضیح پُست</div>
          <div class="description">
            {{ getPost.description }}
          </div>
        </v-col>
      </v-col>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ProductImageCarousel from '@/components/post/ProductImageCarousel'
import ProductsList from '@/components/post/ProductsList'

const preparationTextList = ['2ساعت', '12ساعت', 'یک روز', '3روز', 'یک هفته']

export default {
  name: 'ProductShortcodePage',
  components: {
    ProductImageCarousel,
    ProductsList
  },
  data () {
    return {
      carouselIndex: 0
    }
  },
  async fetch() {
    const shortcode = this.$route.params.shortcode
    this.$store.commit('product/clearPostProductImages')
    await this.$store.dispatch('product/postDetail', shortcode).catch((response) => {
      if (response.status === 404) {
        // error({ statusCode: 404, message: 'محصول یافت نشد.' })
      } else {
        // error({ statusCode: 500, message: 'خطایی رخ داده است!' })
      }
    })
    await this.$store.dispatch('product/postProductImages', shortcode)
  },
  computed: {
    ...mapGetters('product', ['getPost', 'getPostProductImages']),

    getShopProfilePhotoUrl () {
      return process.env.baseURL + this.getPost.shop.profilePic
    },
    getPreparationText () {
      return preparationTextList[this.getPost.shop.preparation]
    }
  },
  methods: {
    ...mapActions('product', ['postProductImages']),

    
    changeCarouselIndex (newVal) {
      this.carouselIndex = newVal
    }
  }
}
</script>

<style scoped>
.description {
  white-space: pre-line;
}
</style>
