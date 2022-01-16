<template>
  <v-row justify="center" align="center" no-gutters>
    <AddToCartDialog v-if="showNewCartItemDialog" @closeDialog="showNewCartItemDialog=false" />
    <v-col>
      <v-row justify="center" no-gutters>
        <v-col cols="12" md="8" lg="7" class="ma-4 py-3 px-8">
          <v-card outlined rounded="xl">
            <v-img
              :src="imagesUrl[0]"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-card outlined class="mx-2 my-8" rounded="lg">
        <v-card-title class="mx-4 py-0 mt-2 mb-0 red--text">
          جدیدترین محصولات
        </v-card-title>
        <v-row class="px-4 py-2" no-gutters>
          <v-layout style="overflow-x: scroll;" class="pa-4">
            <div v-for="product in newestProductsList" :key="product.id" class="ml-10">
              <ProductPreviewCard
                :shop-name="product.shop.instagramUsername"
                :image-url="product.displayImageUrl"
                :title="product.title"
                :post-shortcode="product.postShortcode"
                :original-price="product.originalPrice"
                :final-price="product.finalPrice"
                :discount-percent="product.discountPercent"
                @addToCart="addToCart(product)"
              />
            </div>
          </v-layout>
        </v-row>
      </v-card>
      <v-card v-if="discountedProductsList.length" outlined class="mx-2 my-8" rounded="lg">
        <v-card-title class="mx-4 py-0 mt-2 mb-0 red--text">
          فروش ویژه
        </v-card-title>
        <v-row class="px-4 py-2" no-gutters>
          <v-layout style="overflow-x: scroll;" class="pa-4">
            <div v-for="product in discountedProductsList" :key="product.id" class="ml-10">
              <ProductPreviewCard
                :shop-name="product.shop.instagramUsername"
                :image-url="product.displayImageUrl"
                :title="product.title"
                :post-shortcode="product.postShortcode"
                :original-price="product.originalPrice"
                :final-price="product.finalPrice"
                :discount-percent="product.discountPercent"
                @addToCart="addToCart(product)"
              />
            </div>
          </v-layout>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

import AddToCartDialog from '@/components/AddToCartDialog.vue'
import ProductPreviewCard from '@/components/ProductPreviewCard.vue'

export default {
  name: 'HomePage',
  layout: 'home_layout',
  components: {
    AddToCartDialog,
    ProductPreviewCard
  },
  data () {
    return {
      showNewCartItemDialog: false
    }
  },
  async fetch ({ store }) {
    await store.dispatch('homePageImagesUrl').catch(() => {
      
    })
    await store.dispatch('newestProducts').catch(() => {
      
    })
    await store.dispatch('discountedProducts').catch(() => {
      
    })
  },
  computed: {
    imagesUrl () {
      const list = []
      this.$store.getters.getHomePageImagesUrlList.forEach(element => {
        list.push(process.env.baseURL + element)
      })
      return list
    },
    newestProductsList () {
      return this.$store.getters.getNewestProductsList
    },
    discountedProductsList () {
      return this.$store.getters.getDiscountedProductsList
    }
  },
  methods: {
    ...mapActions('cart', ['addItemToCart']),

    addToCart (product) {
      this.addItemToCart(product)
      this.showNewCartItemDialog = true
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  height: 4px;
  border: 1px solid #d5d5d5;
}

::-webkit-scrollbar-track {
  border-radius: 0;
  background: #eeeeee;
}

::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #7e4eec;
}
</style>
