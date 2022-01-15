<template>
  <div v-if="productImages.length === 0">
    <v-skeleton-loader
      class="ma-0 pa-0"
      type="card"
    />
  </div>
  <div v-else>
    <v-carousel
      id="imageFrame"
      v-model="carouselIndex"
      :show-arrows="false"
      :hide-delimiters="true"
      class="pa-0 ma-0"
      height="100%"
    >
      <v-carousel-item
        v-for="productImage in productImages"
        :key="productImage.id"
      >
        <v-img
          :src="productImageUrl(productImage.displayImage)"
          :aspect-ratio="1"
          style="cursor: pointer;"
          @click.prevent="showProductTags = !showProductTags"
        >
          <div v-for="prod in productImages[carouselIndex].products" v-show="showProductTags" :key="prod.id">
            <ProductTag :product="prod"/>
          </div>
          <v-row v-show="!showProductTags && productImages[carouselIndex].products.length > 0" class="shop-icon grey darken-4 rounded-circle pa-1" justify="center" align="center" no-gutters>
            <v-icon color="white">mdi-shopping-outline mdi-18px</v-icon>
          </v-row>
        </v-img>
      </v-carousel-item>
    </v-carousel>
    <!-- delimiter -->
    <v-row v-if="productImages.length > 1" justify="center" no-gutters>
      <v-card
      v-for="i in productImages.length"
      :key="i"
      class="ma-1"
      height="8px"
      width="8px"
      :color="i === carouselIndex+1 ? 'black' : 'grey' "
      @click.prevent="carouselIndex = i-1"
    />
    </v-row>
  </div>
</template>

<script>
import ProductTag from '@/components/ProductTag'

export default {
  name: 'ProductImageCarousel',
  components: {
    ProductTag
  },
  props: {
    productImages: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      carouselIndex: 0,
      showProductTags: false
    }
  },
    watch: {
    carouselIndex (newValue) {
      this.$emit('changeCarouselIndex', newValue)
    },
  },
  methods: {
    productImageUrl (src) {
      return process.env.baseURL + src
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
