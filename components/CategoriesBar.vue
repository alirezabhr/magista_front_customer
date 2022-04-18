<template>
  <v-row no-gutters>
    <div v-for="category in categories" :key="category.id">
      <v-btn
        :plain="!isCategorySelected(category.id)"
        :class="isCategorySelected(category.id) ? 'text--darken-4' : 'text--darken-2'"
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
      categories: categoriesJson,
    }
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
    isCategorySelected (categoryId) {
      const pageCatQueries = this.pageCategoriesQuery
      if (pageCatQueries) {
        return pageCatQueries.indexOf(categoryId.toString()) !== -1
      }
      return false
    }
  },
};
</script>
