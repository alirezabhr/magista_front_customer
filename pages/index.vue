<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <AddToCartDialog v-if="getShowAddToCartStatus" />
      <v-row class="pa-2">
        <v-layout style="overflow-x: scroll;" class="pa-4">
          <ProductPreviewCard
            v-for="product in bestSellerProducts"
            :key="product.shortcode"
            shop-name="test online shop"
            :image-url="product.displayImage"
            :title="product.title"
            :rate="product.rate"
            :price="product.price"
            @addToCart="addItemToCart(product)"
          />
        </v-layout>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ProductPreviewCard from '@/components/ProductPreviewCard.vue'
import bestSellerMock from '@/mock/best_sellers'

export default {
  name: 'HomePage',
  components: {
    ProductPreviewCard
  },
  data () {
    return {
      bestSellerProducts: bestSellerMock
    }
  },
  computed: {
    ...mapGetters('cart', ['getShowAddToCartStatus'])
  },
  methods: {
    ...mapActions('cart', ['addItemToCart'])
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
