<template>
  <v-container class="py-6">
    <v-card flat color="transparent" >
      <v-card-title class="text-h5 font-weight-bold">تماس با ما</v-card-title>
      <v-card-text>
        از ما سوالی دارید؟ یا با مشکلی روبرو شدید؟ خوشحال میشیم با ما در ارتباط باشید. 
        با روش‌های زیر می‌تونید با ما تماس بگیرید.
      </v-card-text>
      <v-card-title class="text-body-1 mx-3">
        <v-icon color="red">mdi-email-outline</v-icon>
        <span class="px-2">ایمیل:</span>
        <span class="text-body-2">magista.poshtibani@gmail.com</span>
      </v-card-title>
      <v-card-title class="text-body-1 mx-3">
        <v-icon color="green">mdi-whatsapp</v-icon>
        <span class="px-2">واتس‌اپ:</span>
        <span class="text-body-2">09217248134</span>
      </v-card-title>
      <v-card-title class="text-body-1 mx-3">
        <v-img :src="raychatLogo" :aspect-ratio="1" max-height="25px" max-width="25px"/>
        <span class="px-2">پشتیبانی آنلاین:</span>
        <span class="text-body-2">
          می‌تونید از طریق پشتیبانی آنلاین با ما در ارتباط باشید 
          و ما سعی می‌کنیم در سریع‌ترین زمان به شما جواب بدیم.
        </span>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ContactPage',
  layout: 'base_layout',
  computed: {
    raychatLogo () {
      return require('@/assets/images/raychat.svg')
    }
  }
}
</script>
