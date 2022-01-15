<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" sm="9" md="8" lg="6" class="pa-0">
      <AddToCartDialog v-if="showDialog" @closeDialog="showDialog=false" />
      <v-card v-if="!isLoadingShopData" min-height="620">
        <v-row class="py-6 px-2" no-gutters>
          <v-col cols="8" sm="9" class="ma-0 py-1 px-2">
            <v-row class="text-subtitle-1 text-sm-h6 font-weight-bold px-1" no-gutters>
              فروشگاه {{ getShopInfoData.instagramUsername }}
            </v-row>
            <v-row class="text-body-2 text-sm-subtitle-2" align="center" no-gutters>
              <v-icon>mdi-map-marker-outline</v-icon>
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
        <PostsListPreview :ig-username="getShopInfoData.instagramUsername" />
      </v-card>
      <div v-else>
        <v-progress-circular indeterminate color="grey lighten-2" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AddToCartDialog from '@/components/AddToCartDialog.vue'
import PostsListPreview from '@/components/PostsListPreview.vue'

export default {
  name: 'ShopUsernamePage',
  components: {
    AddToCartDialog,
    PostsListPreview
  },
  validate ({ params }) {
    const username = params.username
    const regexCheck = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(username)
    if (regexCheck === false) {
      return false
    }
    return true
  },
  async fetch ({ params, store, error}) {
    const igUsername = params.username
    this.isLoadingShopData = true
    try {
      await store.dispatch('shop/shopInfoData', igUsername)
      this.isLoadingShopData = false
    } catch (e) {
      this.isLoadingShopData = false
      if (e.status === 404) {
        error({ statusCode: 404, message: 'page not found.' })
      } else {
        error({ statusCode: e.status, message: 'Oops! An error occured.' })
      }
    }
  },
  data () {
    return {
      isLoadingShopData: false,
      showDialog: false
    }
  },
  computed: {
    ...mapGetters('shop', ['getShopInfoData']),

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
