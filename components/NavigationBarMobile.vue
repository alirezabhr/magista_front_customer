<template>
  <div>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = true" />

      <v-toolbar-title class="primary--text font-weight-bold px-0">
        <NuxtLink to="/" active-class="text-decoration-none">
          مگیستا
        </NuxtLink>
      </v-toolbar-title>

      <v-spacer />

      <v-btn to="/cart" icon>
        <v-badge
          :content="getCartItemCounts"
          :value="getCartItemCounts"
          color="green"
          overlap
          left
        >
          <v-icon class="pr-1">
            mdi-cart-variant mdi-flip-h
          </v-icon>
        </v-badge>
      </v-btn>

      <v-divider vertical class="mx-1" />

      <v-btn text rounded outlined small class="primary--text" href="https://vendor.magista.ir" target="_blank">
        پنل فروشنده
      </v-btn>
    </v-app-bar>

    <NavigationDrawer :drawer="drawer" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import NavigationDrawer from '@/components/NavigationDrawer.vue'

export default {
  name: 'NavigationBarMobile',
  components: {
    NavigationDrawer
  },
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapGetters('cart', ['getCartItemCounts'])
  }
}
</script>
