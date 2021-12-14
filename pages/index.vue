<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <AddToCartDialog v-if="showDialog" @closeDialog="showDialog=false" />

      <v-row>
        <v-col cols="12" md="8">
          <v-card outlined rounded="xl">
            <v-img 
              :src="saleImageUrls[0]"
            />
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-row no-gutters>
            <v-col cols="6" md="12" class="pa-2">
              <v-card outlined rounded="xl">
                <v-img 
                  :src="saleImageUrls[1]"
                />
              </v-card>
            </v-col>
            <v-col cols="6" md="12" class="pa-2">
              <v-card outlined rounded="xl">
                <v-img 
                  :src="saleImageUrls[1]"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- <v-card outlined class="pa-5 my-2" rounded="lg">
        <v-card-title class="pt-0 mt-0 red--text">
          فروش ویژه
        </v-card-title>
        <v-row>
          <v-layout style="overflow-x: scroll;" class="pa-4">
            <ProductPreviewCard
              v-for="product in bestSellerProducts"
              :key="product.shortcode"
              shop-name="test online shop"
              :image-url="product.displayImageUrl"
              :title="product.title"
              :rate="product.rate"
              :price="product.finalPrice"
              @addToCart="addToCart(product)"
            />
          </v-layout>
        </v-row>
      </v-card> -->
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

import AddToCartDialog from '@/components/AddToCartDialog.vue'
import ProductPreviewCard from '@/components/ProductPreviewCard.vue'
import bestSellerMock from '~/mock/best_sellers'

export default {
  name: 'HomePage',
  layout: 'home_layout',
  components: {
    AddToCartDialog,
    ProductPreviewCard
  },
  data () {
    return {
      bestSellerProducts: bestSellerMock,
      showDialog: false
    }
  },
  computed: {
    saleImageUrls () {
      const base = process.env.baseURL + 'media/source/'
      return [`${base}autumn_sale.png`, `${base}sale1.png`]
    }
  },
  methods: {
    ...mapActions('cart', ['addItemToCart']),

    addToCart (product) {
      this.addItemToCart(product)
      this.showDialog = true
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
