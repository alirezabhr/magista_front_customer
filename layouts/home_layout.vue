<template>
  <v-app>
    <Header />
    <v-main class="background">
      <v-container class="pa-0">
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'HomeLayout',
  components: {
    Header,
    Footer
  }
}
</script>
