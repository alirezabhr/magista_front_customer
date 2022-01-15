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
      <ProductsList :productImages="getPostProductImages" :carouselIndex="carouselIndex" />
      
      <v-col class="pa-3">
        <v-row v-if="getPost.description" class="font-weight-light" no-gutters>
          <div class="font-weight-bold text-body-2">توضیح پُست</div>
          {{ getPost.description }}
        </v-row>
      </v-col>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ProductImageCarousel from '@/components/post/ProductImageCarousel'
import ProductsList from '@/components/post/ProductsList'

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
      return process.env.baseURL + this.getPost.shop.profileImageUrl
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
