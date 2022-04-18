<template>
  <v-row v-if="!$fetchState.pending" no-gutters>
    <div v-for="category in categoriesList" :key="category.id">
      <v-btn
        :plain="!isTabSelected(category.id)"
        :class="isTabSelected(category.id) ? 'text--darken-4' : 'text--darken-2'"
        text
        nuxt
        link
        :to="`/search?cat=${category.id}`"
        class="text-caption orange--text font-weight-bold"
      >
        {{ category.name }}
      </v-btn>
    </div>
  </v-row>
</template>

<script>
import categoriesJson from '@/assets/json/categories.json'

export default {
  name: "CategoriesBar",
  data () {
    return {
      categoriesList: categoriesJson,
    }
  },
  async fetch() {
  },
  computed: {
    pageCategoriesQuery() {
      const cat = this.$route.query.cat
      if (typeof cat === 'string') {
        return [cat]
      }
      return cat
    },
  },
  methods: {
    isTabSelected (categoryId) {
      const pageCatQueries = this.pageCategoriesQuery
      if (pageCatQueries) {
        return pageCatQueries.indexOf(categoryId.toString()) !== -1
      }
      return false
    }
  },
};
</script>
