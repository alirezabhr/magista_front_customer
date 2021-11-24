<template>
  <v-app>
    <Header />
    <v-main class="background">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Footer
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
