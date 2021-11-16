<template>
  <v-app>
    <v-app-bar
      fixed
      app
      class="white"
      elevation="3"
    >
      <v-toolbar-title class="primary--text font-weight-bold mx-3">
        <NuxtLink to="/" active-class="text-decoration-none">
          مگیستا
        </NuxtLink>
      </v-toolbar-title>

      <v-spacer />

      <v-btn text to="/auth" v-if="!isAuthenticated">
        ورود / ثبت‌نام
      </v-btn>

      <v-btn text v-else>
        پروفایل
      </v-btn>

      <v-divider vertical class="mx-3" />
      <v-btn text to="/cart">
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
          سبد
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
    ...mapGetters('auth', ['isAuthenticated']),
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
