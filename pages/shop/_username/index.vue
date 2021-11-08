<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="8" lg="6" class="pa-0">
      <AddToCartDialog v-if="showDialog" @closeDialog="showDialog=false" />
      <v-card min-height="620">
        <v-row class="py-6 px-2" no-gutters>
          <v-col cols="8" sm="9" class="ma-0 py-1 px-4">
            <v-row class="text-subtitle-1 text-sm-h6 font-weight-bold" no-gutters>
              فروشگاه {{ getShopInfoData.instagramUsername }}
            </v-row>
            <v-row class="text-body-2 text-sm-subtitle-2" no-gutters>
              {{ getShopInfoData.province }} - {{ getShopInfoData.city }}
            </v-row>
          </v-col>
          <v-col cols="4" sm="3" class="ma-0">
            <v-row justify="center" no-gutters>
              <v-avatar
                color="primary"
                size="75"
                style="border-style: solid;"
              >
                <v-img :src="profileImageFullUrl" />
              </v-avatar>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="pb-3 mx-2" />
        <v-row class="pa-sm-1 pa-md-2" no-gutters dir="ltr">
          <v-col
            v-for="product in getShopProducts"
            :key="product.shortcode"
            cols="4"
          >
            <ShopProductItem
              :display-image-url="product.displayImageUrl"
              :price="product.price"
              dir="rtl"
              @addToCart="addToCart(product)"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AddToCartDialog from '@/components/AddToCartDialog.vue'
import ShopProductItem from '@/components/ShopProductItem.vue'

export default {
  name: 'ShopUsernamePage',
  components: {
    AddToCartDialog,
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
    await store.dispatch('shop/shopInfoData', params.username).catch((response) => {
      if (response.statusCode === 404) {
        error({ statusCode: 404, message: 'shop not found' })
      } else {
        error({ statusCode: 500, message: 'Oops! An error occured.' })
      }
    })
    await store.dispatch('shop/shopProducts', params.username)
  },
  data () {
    return {
      showDialog: false
    }
  },
  computed: {
    ...mapGetters('shop', ['getShopInfoData', 'getShopProducts']),

    profileImageFullUrl () {
      return process.env.baseURL + this.getShopInfoData.profileImageUrl
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
