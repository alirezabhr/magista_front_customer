<template>
  <v-app>
    <v-app-bar
      fixed
      app
      class="white"
      elevation="3"
    >
      <v-toolbar-title class="primary--text font-weight-bold mx-3">
        مگیستا
      </v-toolbar-title>

      <v-spacer />

      <v-btn text>
        ورود / ثبت‌نام
      </v-btn>
      <v-divider vertical class="mx-3" />
      <v-btn text to="/cart">
        <v-badge
          :content="getCartItemCounts"
          :value="getCartItemCounts"
          color="green"
          overlap
        >
          سبد
          <v-icon>
            mdi-cart-variant mdi-flip-h
          </v-icon>
        </v-badge>
      </v-btn>
      <v-divider vertical class="mx-3" />
      <v-btn rounded outlined class="primary--text" href="https://vendor.magista.ir" target="_blank">
        پنل فروشنده
      </v-btn>
    </v-app-bar>

    <v-main class="background">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',
  computed: {
    ...mapGetters('cart', ['getCartItemCounts'])
  },
  mounted () {
    this.initialCartStore()
    this.initialAuthStore()
  },
  methods: {
    ...mapMutations('auth', ['initialAuthStore']),
    ...mapMutations('cart', ['initialCartStore'])
  }
}
</script>
