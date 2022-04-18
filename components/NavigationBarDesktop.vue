<template>
  <!-- IMPORTANT: be careful in using v-if in elements. especially with isAuthenticated getter
        it's better to use v-show if it is possible -->
  <v-app-bar
    fixed
    app
    color="white"
    elevation="3"
  >
    <v-toolbar-title class="primary--text text-h5 font-weight-bold mx-4">
      <NuxtLink to="/" active-class="text-decoration-none">
        مگیستا
      </NuxtLink>
    </v-toolbar-title>

    <SearchBar class="mr-4" />

    <v-row justify="end" no-gutters>
      <div v-if="!isAuthenticated">
        <v-btn text to="/auth">
          ورود / ثبت‌نام
        </v-btn>
      </div>

      <div v-else>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-account</v-icon>
              پروفایل
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in profileOptions"
              :key="index"
              @click.prevent="item.onClick"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-divider vertical class="mx-3" />
      
      <v-btn text to="/cart">
        <v-badge
          :content="getCartItemCounts"
          :value="getCartItemCounts"
          color="green"
          overlap
          left
        >
          <v-icon class="pr-1">
            mdi-cart-variant mdi-flip-h
          </v-icon>
        </v-badge>
          سبد
      </v-btn>

      <v-divider vertical class="mx-3" />
      <v-btn rounded outlined class="primary--text" href="https://vendor.magista.ir" target="_blank">
        پنل فروشنده
      </v-btn>
    </v-row>

    <template v-slot:extension>
      <CategoriesBar />
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import SearchBar from '@/components/SearchBar.vue'
import CategoriesBar from '@/components/CategoriesBar.vue'

export default {
  name: 'NavigationBarDesktop',
  components: {
    SearchBar,
    CategoriesBar
  },
  data () {
    return {
      profileOptions: [
        { title: 'سفارشات', color: 'black', onClick: this.routeToOrders },
        { title: 'خروج', color: 'red', onClick: this.userLogout }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('cart', ['getCartItemCounts'])
  },
  methods: {
    ...mapActions('auth', ['userLogout']),

    routeToOrders () {
      this.$router.push('/orders')
    }
  }
}
</script>
