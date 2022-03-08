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
          <v-row class="py-2" no-gutters>
            <v-col cols="3" md="2">
              <a
                referrerpolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=237568&amp;Code=eFDsUbAr6MywnIzE6rMI"
              >
                <v-card outlined class="ma-2 pa-2" height="130px" title="نماد اعتماد الکترونیکی">
                  <v-img
                    referrerpolicy="origin"
                    src="https://Trustseal.eNamad.ir/logo.aspx?id=237568&amp;Code=eFDsUbAr6MywnIzE6rMI"
                    alt="نماد اعتماد الکترونیکی"
                    id="eFDsUbAr6MywnIzE6rMI"
                  />
                </v-card>
              </a>
            </v-col>
            <v-col cols="3" md="2">
                <v-card style="cursor: pointer;" outlined class="ma-2 pa-2" height="130px" title="پرداخت مطمئن از درگاه بانک پاسارگاد">
                  <v-img
                    :src="pasargadBankLogoSrc"
                    contain
                    alt="بانک پاسارگاد"
                  />
                </v-card>
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
  data() {
    return {
      mainItems: [
        { title: "تماس با ما", page: "contact" },
        { title: "قوانین و مقررات", page: "terms" },
        { title: "راهنمای مگیستا", page: "help" },
      ],
    };
  },
  computed: {
    magistaIconSrc() {
      return require("@/assets/images/logo.png");
    },
    pasargadBankLogoSrc () {
      return require('@/assets/images/Bank_Pasargad_logo.png')
    }
  }
};
</script>
