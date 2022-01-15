<template>
  <div>
    <v-row v-if="isGettingShopPosts" justify="center" no-gutters>
      <v-progress-circular indeterminate color="grey lighten-2" />
    </v-row>
    <v-row v-else class="pa-sm-1 pa-md-2" dir="ltr" no-gutters>
      <v-col
        v-for="post in getShopPosts"
        :key="post.shortcode"
        cols="4"
      >
        <NuxtLink :to="`/product/${post.shortcode}`" class="text-decoration-none" active-class="text-decoration-none">
          <v-img
            :aspect-ratio="1"
            :src="getImageUrl(post.productImages[0].displayImage)"
            style="border-style: solid; border-width: 0.5px; border-color: grey;"
          >
            <template #placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
                no-gutters
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-2"
                />
              </v-row>
            </template>
          </v-img>
        </NuxtLink>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PostsListPreview',
  props: {
    igUsername: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      isLoadingData: false
    }
  },
  fetch () {
    this.shopPosts(this.igUsername)
  },
  computed: {
    ...mapGetters('shop', ['getShopPosts', 'isGettingShopPosts'])
  },
  methods: {
    ...mapActions('shop', ['shopPosts']),

    getImageUrl (src) {
      return process.env.baseURL + src
    }
  }
}
</script>

<style>

</style>