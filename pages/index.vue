<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-row class="pa-2">
        <v-layout style="overflow-x: scroll;" class="pa-4">
          <ProductPreviewCard
            v-for="product in bestSellerProducts"
            :key="product.id"
            :shop-name="product.shop_name"
            :image-url="product.display_image"
            :title="product.title"
            :rate="product.rate"
            :price="product.price"
          />
        </v-layout>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ProductPreviewCard from '@/components/ProductPreviewCard.vue'

export default {
  name: 'HomePage',
  components: {
    ProductPreviewCard
  },
  data () {
    return {
      bestSellerProducts: []
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
