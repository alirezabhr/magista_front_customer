<template>
  <v-dialog
    v-model="show"
    max-width="350"
  >
    <v-card>
      <v-card-title class="text-body-1 grey--text font-weight-bold">
        برای ادامه فرآیند خرید ابتدا باید در حساب کاربری خود وارد شوید.
      </v-card-title>
      <v-card-actions>
        <v-btn
          class="darken-1 white--text px-4 mx-auto"
          color="primary"
          rounded
          @click.prevent="buttonOnClick"
        >
          ورود/ثبت‌نام
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AuthDialog',
  data () {
    return {
      show: true
    }
  },
  methods: {
    buttonOnClick () {
      this.$router.push('/auth')
      this.$emit('closeDialog')
    }
  },
  watch: {
    show (newValue) {
      if (!newValue) { // dialog closed by clicking somewhere else
        this.$emit('closeDialog')
        this.show = true // always should set show property true, dialog shows when getShowAddToCartStatus getter returns true
      }
    }
  },
}
</script>
