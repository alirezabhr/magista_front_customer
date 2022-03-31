<template>
  <v-row v-if="!$fetchState.pending" no-gutters>
    <div v-for="category in getCategories" :key="category.id">
      <v-btn :plain="pageCategoryQuery !== `${category.id}`" text nuxt link :to="`/search?cat=${category.id}`" class="text-caption font-weight-bold orange--text text--darken-3">
        {{ category.name }}
      </v-btn>
    </div>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CategoriesBar',
  async fetch () {
    await this.categories()
  },
  computed: {
    ...mapGetters('shop', ['getCategories']),

    pageCategoryQuery () {
      return this.$route.query.cat
    }
  },
  methods: {
    ...mapActions('shop', ['categories'])
  }
}
</script>

<style>
.button-active {
  background-color: transparent;
}
</style>
