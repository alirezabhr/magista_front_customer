<template>
  <v-app>
    <v-container v-if="error.statusCode === 404">
      <v-col>
        <v-row class="pa-2 text-h5 font-weight-bold" justify="center" no-gutters>
          صفحه مورد نظر پیدا نشد!
        </v-row>
        <v-img
          class="ma-6"
          :src="notFoundImage"
        />
        <v-row justify="center" no-gutters>
          <NuxtLink to="/" active-class="" exact-active-class="">
            خانه
          </NuxtLink>
        </v-row>
      </v-col>
    </v-container>
    <h1 v-else>
      {{ otherError }}
      <NuxtLink to="/">
        خانه
      </NuxtLink>
    </h1>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? 'صفحه مورد نظر پیدا نشد' : this.otherError
    return {
      title
    }
  },
  computed: {
    notFoundImage () {
      return require('~/assets/images/not_found.png')
    }
  },
  mounted () {
    if (process.dev) {
      console.log('====ERROR====')
      console.log(this.error)
      console.log('=============')
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
