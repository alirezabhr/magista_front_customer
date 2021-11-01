<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="8" lg="6" class="pa-0">
      <v-card min-height="620">
        <v-row class="py-6 px-2" no-gutters>
          <v-col cols="9" sm="10" class="ma-0">
            <v-row no-gutters>
              adf
            </v-row>
          </v-col>
          <v-col cols="3" sm="2" class="ma-0">
            <v-avatar
              color="primary"
              size="70"
              style="border-style: solid;"
            >
              <v-img :src="getImageUrl(getShopProfileImage)" />
            </v-avatar>
          </v-col>
        </v-row>
        <v-divider class="pb-3 mx-2" />
        <v-row class="pa-sm-1 pa-md-2" no-gutters>
          <v-col
            v-for="productPrice in getShopProductsPrice"
            :key="productPrice.product.shortcode"
            cols="4"
          >
            <ShopProductItem
              :display-image-url="getImageUrl(productPrice.product.display_image)"
              :price="productPrice.price"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

import ShopProductItem from '@/components/ShopProductItem.vue'

export default {
  name: 'ShopUsernamePage',
  components: {
    ShopProductItem
  },
  validate ({ params }) {
    const username = params.username
    const regexCheck = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(username)
    if (regexCheck === false) {
      return false
    }
    return true
  },
  async asyncData ({ params, store, error }) {
    await store.dispatch('shop/shopInfoData', params.username).catch(() => {
      error({ statusCode: 404, message: 'shop not found' })
    })
    await store.dispatch('shop/shopProducts', params.username)
  },
  computed: {
    ...mapGetters('shop', ['getShopProfileImage', 'getShopProductsPrice'])
  },
  methods: {
    getImageUrl (src) {
      return process.env.baseURL + src
    }
  }
}
</script>
