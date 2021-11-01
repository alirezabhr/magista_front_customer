<template>
  <v-card
    class="ml-10"
    min-width="200"
    rounded="xl"
  >
    <v-img
      :aspect-ratio="1"
      :src="getImageFullUrl(imageUrl)"
      class="ma-1 rounded-xl"
    />

    <v-card-title class="text-body-2 font-weight-bold py-2">{{ shopName }}</v-card-title>

    <v-divider class="mx-4" />

    <v-card-text class="pt-1 pb-0">
      {{ title }}
    </v-card-text>

    <v-card-actions class="py-1">
      <v-row align="end" class="py-auto my-auto">
        <v-col>
          <v-btn
            icon
            @click="addToCart()"
          >
            <v-icon large color="primary">mdi-plus-circle</v-icon>
          </v-btn>
        </v-col>

        <v-row align="end" class="mb-1 ml-2 pa-0" no-gutters>
          <v-spacer />
          <v-col cols="6" class="pa-0">
            <v-row v-if="rate" class="ma-0 grey--text text-caption text-decoration-line-through" justify="center" no-gutters>
              {{ price }}
            </v-row>
            <v-row class="ma-0 text-body-2 font-weight-bold" justify="center" no-gutters>
              {{ price }}
            </v-row>
          </v-col>
          <div class="currency mx-auto pl-2">تومان</div>
        </v-row>
      </v-row>
    </v-card-actions>
  </v-card>
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
    rate: {
      type: Number,
      required: false,
      default: null
    },
    price: {
      type: Number,
      required: true
    }
  },
  methods: {
    getImageFullUrl (url) {
      return `${process.env.baseURL}${url}`
    },
    addToCart () {
      console.log(this.title + 'added to cart')
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
