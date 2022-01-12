<template>
  <v-card rounded="0">
    <v-img
      :aspect-ratio="1"
      :src="getFullImageUrl(product.displayImageUrl)"
      style="border-style: solid; border-width: 0.5px; border-color: grey;"
      gradient="to bottom, rgba(0,0,0,0) 80%, rgba(0,0,0,.5) 100%"
      class="align-end"
    >
      <template #placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
          no-gutters
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-2"
          />
        </v-row>
      </template>
      <v-card-title class="pa-0">
        <v-row align="end" class="pa-0" no-gutters>
          <v-col class="ma-0 pa-0" align-self="center">
            <v-row no-gutters class="pa-0 ma-0" align="end">
              <v-spacer />
              <div v-show="product.discountPercent" class="px-1 pt-1 grey--text font-weight-thin text--lighten-2 text-caption text-sm-caption text-decoration-line-through">
                {{ product.originalPrice }}
              </div>
              <div class="px-1 pt-1 text-caption text-sm-body-2 font-weight-bold white--text text--lighten-2">
                {{ product.finalPrice }}
              </div>
            </v-row>
          </v-col>

          <div class="currency mx-auto pl-2 white--text">تومان</div>
        </v-row>
      </v-card-title>
    </v-img>

    <v-card-title class="pa-0">
      <v-row no-gutters>
        <v-btn
          dark
          small
          fab
          top
          right
          absolute
          color="green"
          style="right: 4px; top: 4px;"
          @click.prevent="$emit('addToCart')"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-row>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { PropType } from "vue";
import Product from "~/models/product";

export default {
  name: 'ShopProductItem',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  methods: {
    getFullImageUrl(src: string) {
      return process.env.baseURL + src;
    }
  }
}
</script>

<style scoped>
.currency {
  -webkit-text-size-adjust: 100%;
    direction: rtl;
    list-style: none;
    text-align: center;
    -webkit-box-direction: normal;
    box-sizing: inherit;
    outline: none!important;
    font-size: .714rem;
    line-height: 21px;
    font-weight: 600;
}
</style>
