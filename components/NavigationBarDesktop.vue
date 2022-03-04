<template>
  <v-app-bar
    fixed
    app
    class="white"
    elevation="3"
  >
    <v-row class="hidden-xs-only" no-gutters>
      <v-toolbar-title class="primary--text font-weight-bold mx-3">
        <NuxtLink to="/" active-class="text-decoration-none">
          مگیستا
        </NuxtLink>
      </v-toolbar-title>

      <v-spacer />

      <v-btn text to="/auth" v-if="!isAuthenticated">
        ورود / ثبت‌نام
      </v-btn>

      <v-menu offset-y v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
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
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NavigationBarDesktop',
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
