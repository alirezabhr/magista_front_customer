<template>
  <v-col>
    <div class="primary--text font-weight-bold py-2">
      فیلترهای اعمال شده:
    </div>
    <v-row class="px-4" align="center" no-gutters>
      <div>
        دسته‌بندی:
      </div>
      <v-chip-group class="px-3" column>
        <v-chip
          v-for="cat in selectedCategories"
          :key="cat.id"
          close
          @click:close="removeCategory(cat.id)"
        >
          {{ cat.name }}
        </v-chip>
      </v-chip-group>
    </v-row>
  </v-col>
</template>

<script>
import categoriesJson from '@/assets/json/categories.json'

export default {
  name: 'SearchPage',
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
    selectedCategories () {
      let sc = []
      if (this.pageCategoriesQuery) {
        this.pageCategoriesQuery.forEach((c) => {
          sc.push(this.categories.find(i => `${i.id}` == `${c}`))
        })
      }
      return sc
    }
  },
  methods: {
    removeCategory (categoryId) {
      const query = Object.assign({}, this.$route.query)
      if (typeof query.cat === 'string') {
        delete query.cat
        this.$router.push({query})
      } else {
        console.log('here');
        const catIndex = query.cat.findIndex(i => i == categoryId) // dont check type
        query.cat.splice(catIndex, 1)
        const q = Object.assign({}, query)
        console.log(query);
        console.log(q);
        this.$router.push({...this.$router.currentRoute, query: q})
      }
    }
  }
}
</script>

<style>

</style>