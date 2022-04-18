<template>
  <v-text-field
    v-model="searchField"
    placeholder="جستجو در مگیستا"
    append-icon="mdi-magnify"
    hide-details
    outlined
    dense
    @click:append="search"
    @keyup.enter="search"
  />
</template>

<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      searchField: ''
    }
  },
  methods: {
    search () {
      if (!!this.searchField) {
        this.$router.push(`/search?q=${this.searchField}`)
      }
    }
  }
}
</script>
