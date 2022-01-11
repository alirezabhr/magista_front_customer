<template>
  <v-footer class="pa-0">
    <v-row no-gutters>
      <v-col offset="1" cols="3" class="py-3 px-2">
        <v-img
          :src="magistaIconSrc"
          max-height="100px"
          max-width="100px"
          class="mx-auto"
        />
        <v-row class="primary--text text-body-1 py-3" justify="center" no-gutters>
          Magista
        </v-row>
      </v-col>
      <v-col cols="8" md="6" class="py-3 px-2">
        <div class="font-weight-bold px-5">مگیستا</div>
        <div><v-btn text small>ارتباط با ما</v-btn></div>
        <div><v-btn text small>تماس با ما</v-btn></div>
        <div><v-btn text small>قوانین و مقررات</v-btn></div>
      </v-col>
      <v-col cols="3" md="2" class="pa-0">            
        <!-- <a
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
        </a> -->
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    magistaIconSrc () {
      return `${process.env.baseURL}media/source/magista_logo.png`
    }
  }
};
</script>
