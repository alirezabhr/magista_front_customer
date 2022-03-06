<template>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
    right
  >
    <v-list
      nav
      dense
    >
      <v-list-item-title class="pa-3 mb-3">
        <v-row align="center" no-gutters>
          <v-col cols="2">
            <v-img :src="require('@/assets/images/logo.png')" aspect-ratio="1" max-height="25px" max-width="25px" />
          </v-col>
          <v-col cols="10">
            <span class="text-h6 font-weight-bold primary--text">مگیستا</span>
          </v-col>
        </v-row>
      </v-list-item-title>

      <v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >
        <v-list-item :disabled="isAuthenticated" to="/auth">
          <v-list-item-icon class="mr-1 ml-4">
            <v-icon :color="isAuthenticated ? 'green darken-2' : ''">mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <span v-if="!isAuthenticated">ورود / ثبت‌نام</span>
            <span v-else class="green--text text--darken-3 text-body-2 font-weight-bold">{{ customerName }}</span>
          </v-list-item-title>
        </v-list-item>

        <v-list-item v-if="isAuthenticated" to="/orders">
          <v-list-item-icon class="mr-1 ml-4">
            <v-icon>mdi-script-text-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            سفارشات
          </v-list-item-title>
        </v-list-item>

        <div class="py-3"><v-divider /></div>

        <v-list-item v-for="(drawerItem, index) in drawerItems" :key="index" :to="drawerItem.page">
          <v-list-item-title class="mr-3">
            {{drawerItem.title}}
          </v-list-item-title>
        </v-list-item>
        
        <div class="py-3"><v-divider /></div>

        <v-list-item v-if="isAuthenticated" @click.prevent="userLogout">
          <v-list-item-icon class="mr-1 ml-4">
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="red--text font-weight-bold">خروج</v-list-item-title>
        </v-list-item>

      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NavigationDrawer',
  props: {
    drawer: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      group: null,
      drawerItems: [
        { title: 'قوانین و مقررات', page: 'terms' },
        { title: 'راهنمای مگیستا', page: 'help' },
        { title: 'تماس با ما', page: 'contact' },
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'getCustomer']),

    customerName () {
      if (this.getCustomer) {
        return this.getCustomer.name
      }
      return ''
    }
  },
  methods: {
    ...mapActions('auth', ['userLogout'])
  }
}
</script>
