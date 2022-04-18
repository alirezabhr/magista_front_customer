<template>
  <!-- IMPORTANT: be careful in using v-if in elements. especially with isAuthenticated getter
        it's better to use v-show if it is possible -->
  <div>
    <v-app-bar app fixed color="white" elevation="3">
      <v-app-bar-nav-icon @click="drawer = true" />

      <v-toolbar-title class="primary--text font-weight-bold px-0">
        <NuxtLink to="/" active-class="text-decoration-none"> مگیستا </NuxtLink>
      </v-toolbar-title>

      <v-spacer />

      <v-btn to="/cart" icon>
        <v-badge
          :content="cartItemCountBadge"
          :value="cartItemCountBadge"
          color="green"
          overlap
          left
        >
          <v-icon class="pr-1"> mdi-cart-variant mdi-flip-h </v-icon>
        </v-badge>
      </v-btn>

      <v-divider vertical class="mx-1" />

      <v-btn
        text
        rounded
        outlined
        small
        class="primary--text"
        href="https://vendor.magista.ir"
        target="_blank"
      >
        پنل فروشنده
      </v-btn>

      <template v-slot:extension>
        <SearchBar class="mb-2" />
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary right>
      <v-list nav dense>
        <v-list-item-title class="pa-3 mb-3">
          <v-row align="center" no-gutters>
            <v-col cols="2">
              <v-img
                :src="require('@/assets/images/logo.png')"
                aspect-ratio="1"
                max-height="25px"
                max-width="25px"
              />
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
              <v-icon :color="isAuthenticated ? 'green darken-2' : ''"
                >mdi-account-circle</v-icon
              >
            </v-list-item-icon>
            <v-list-item-title>
              <span v-if="!isAuthenticated">ورود / ثبت‌نام</span>
              <span
                v-else
                class="green--text text--darken-3 text-body-2 font-weight-bold"
                >{{ customerName }}</span
              >
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-show="isAuthenticated" to="/orders">
            <v-list-item-icon class="mr-1 ml-4">
              <v-icon>mdi-script-text-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title> سفارشات </v-list-item-title>
          </v-list-item>

          <div class="py-3"><v-divider /></div>

          <v-list class="pa-0">
            <v-list-group no-action>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title> دسته‌بندی </v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="category in categories"
                :key="category.id"
                :to="`/search?cat=${category.id}`"
                :active-class="
                  isCategorySelected(category.id) ? '' : 'bg-active'
                "
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="category.name"
                    :class="
                      isCategorySelected(category.id)
                        ? ''
                        : 'grey--text text--darken-3'
                    "
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>

          <div class="py-3"><v-divider /></div>

          <v-list-item
            v-for="(drawerItem, index) in drawerItems"
            :key="index"
            :to="drawerItem.page"
          >
            <v-list-item-title class="mr-3">
              {{ drawerItem.title }}
            </v-list-item-title>
          </v-list-item>

          <div class="py-3"><v-divider /></div>

          <v-list-item v-show="isAuthenticated" @click.prevent="userLogout">
            <v-list-item-icon class="mr-1 ml-4">
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="red--text font-weight-bold">
              خروج
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import categoriesJson from "@/assets/json/categories.json";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "NavigationBarMobile",
  components: {
    SearchBar,
  },
  data() {
    return {
      categories: categoriesJson,
      isClientRendered: false,
      drawer: false,
      group: null,
      drawerItems: [
        { title: "قوانین و مقررات", page: "terms" },
        { title: "راهنمای مگیستا", page: "help" },
        { title: "تماس با ما", page: "contact" },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "getCustomer"]),
    ...mapGetters("cart", ["getCartItemCounts"]),

    pageCategoriesQuery() {
      const cat = this.$route.query.cat;
      if (typeof cat === "string") {
        return [cat];
      }
      return cat;
    },
    cartItemCountBadge() {
      if (this.isClientRendered) {
        return this.getCartItemCounts;
      }
      return 0;
    },
    customerName() {
      if (this.getCustomer) {
        return this.getCustomer.name;
      }
      return "";
    },
  },
  mounted() {
    this.isClientRendered = true;
  },
  methods: {
    ...mapActions("auth", ["userLogout"]),

    isCategorySelected(categoryId) {
      const pageCatQueries = this.pageCategoriesQuery;
      if (pageCatQueries) {
        return pageCatQueries.indexOf(categoryId.toString()) !== -1;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.bg-active {
  background-color: transparent;
  color: white;
}
</style>
