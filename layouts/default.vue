<template>
  <v-app>
    <Header />
    <v-main class="background">
      <v-container class="pa-0">
        <Nuxt keep-alive />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Header
  }
}
</script>
