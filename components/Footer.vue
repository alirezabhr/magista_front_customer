<template>
  <div>
    <v-footer class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-row no-gutters>
            <v-col cols="3" class="py-3 px-2">
              <v-img
                :src="magistaIconSrc"
                max-height="100px"
                max-width="100px"
                class="mx-auto"
              />
              <v-row
                class="primary--text text-body-1 py-3"
                justify="center"
                no-gutters
              >
                Magista
              </v-row>
            </v-col>
            <v-col cols="5" class="py-3 px-2">
              <div class="font-weight-bold px-5">مگیستا</div>
              <div class="px-5 py-1">
                <div v-for="(item, index) in mainItems" :key="index" class="pt-1">
                  <NuxtLink
                    :to="item.page"
                    active-class="text-decoration-none"
                    class="text-decoration-none grey--text text--darken-2 pt-1"
                    :class="{ 'text-caption': $vuetify.breakpoint.smAndDown }"
                  >
                    {{ item.title }}
                  </NuxtLink>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <v-row no-gutters>
            <v-col cols="3" class="pa-0">
              <a
                referrerpolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=237568&amp;Code=eFDsUbAr6MywnIzE6rMI"
              >
                <img
                  referrerpolicy="origin"
                  src="https://Trustseal.eNamad.ir/logo.aspx?id=237568&amp;Code=eFDsUbAr6MywnIzE6rMI"
                  alt="نماد اعتماد الکترونیکی"
                  style="cursor: pointer"
                  id="eFDsUbAr6MywnIzE6rMI"
                />
              </a>
            </v-col>
            <v-col cols="3">
              <v-img
                :src="require('@/assets/images/Bank_Pasargad_logo.png')"
                alt="بانک پاسارگاد"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-footer>
    <v-row
      class="grey darken-4 py-2 white--text text-caption"
      justify="center"
      no-gutters
    >
      <v-icon class="px-2" color="white" size="14">mdi-copyright</v-icon>
      <span
        >تمامی حقوق این سایت متعلق به<strong class="px-1"> مگیستا </strong
        >می‌باشد. 1400</span
      >
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    magistaIconSrc() {
      return require("@/assets/images/logo.png");
    },
  },
  data() {
    return {
      mainItems: [
        { title: "ارتباط با ما", page: "contact" },
        { title: "قوانین و مقررات", page: "terms" },
        { title: "راهنمای مگیستا", page: "help" },
      ],
    };
  },
};
</script>
