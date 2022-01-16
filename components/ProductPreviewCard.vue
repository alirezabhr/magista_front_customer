<template>
  <NuxtLink :to="postUrl" active-class="text-decoration-none" class="text-decoration-none">
    <v-card
      min-width="200"
      rounded="xl"
    >
      <v-img
        :aspect-ratio="1"
        :src="productImageUrl"
        class="ma-1 rounded-xl"
      />

      <v-card-title dir="ltr" class="text-body-2 font-weight-bold py-2">{{ shopName }}</v-card-title>

      <v-divider class="mx-4" />

      <v-card-text class="pt-1 pb-0">
        {{ title }}
      </v-card-text>

      <v-card-actions class="py-1">
        <v-row align="end" class="py-auto my-auto" no-gutters>
          <v-col>
            <v-btn
              icon
              @click.prevent="$emit('addToCart')"
            >
              <v-icon large color="primary">mdi-plus-circle</v-icon>
            </v-btn>
          </v-col>

          <v-row align="end" class="mb-1 ml-2 pa-0" no-gutters>
            <v-spacer />
            <v-col cols="9" class="pa-0">
              <v-row v-if="discountPercent" justify="center" no-gutters>
                <div class="grey--text text-caption text-decoration-line-through">{{ originalPrice }}</div>
                <v-spacer />
                <div class="red--text font-weight-bold pl-2">{{ discountPercent }}%</div>
              </v-row>
              <v-row justify="center" no-gutters>
                <div class="text-body-2 font-weight-bold">{{ finalPrice }}</div>
                <v-spacer />
                <div class="currency pl-2">تومان</div>
              </v-row>
            </v-col>
          </v-row>
        </v-row>
      </v-card-actions>
    </v-card>
  </NuxtLink>
</template>

<script>
export default {
  name: 'ProductPreviewCard',
  props: {
    shopName: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    postShortcode: {
      type: String,
      required: true
    },
    originalPrice: {
      type: Number,
      required: true
    },
    finalPrice: {
      type: Number,
      required: true
    },
    discountPercent: {
      type: Number,
      required: true
    }
  },
  computed: {
    productImageUrl () {
      return process.env.baseURL + this.imageUrl
    },
    postUrl () {
      return `product/${this.postShortcode}`
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
    color: #232933;
    box-sizing: inherit;
    outline: none!important;
    font-size: .714rem;
    line-height: 21px;
    font-weight: 600;
}
</style>
