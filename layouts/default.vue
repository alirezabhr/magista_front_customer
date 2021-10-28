<template>
  <v-app>
    <v-app-bar
      fixed
      app
      class="white"
      elevation="3"
    >
      <v-toolbar-title class="primary--text font-weight-medium mx-3">
        مگیستا
      </v-toolbar-title>

      <v-spacer />

      <v-btn text>
        ورود / ثبت‌نام
      </v-btn>
      <v-divider vertical class="mx-3" />
      <v-btn text>
        <v-icon>
          mdi-cart-variant mdi-flip-h
        </v-icon>
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
export default {
  name: 'DefaultLayout'
}
</script>
