<template>
  <v-card class="pb-4">
    <v-form
      ref="form"
      lazy-validation
      @submit.prevent="validateAndSubmitForm"
    >
      <v-card-title>
        <v-col>
          <div class="text-h6 font-weight-bold">ورود در مگیستا</div>
          <div class="text-subtitle-2 grey--text text--darken-1 pt-2">شما قبلا در مگیستا ثبت‌نام کرده‌اید. لطفا رمز عبور خود را وارد کنید.</div>
        </v-col>
      </v-card-title>

      <v-col class="py-0 px-8">
        <v-text-field
          v-model="password"
          :prepend-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="رمز عبور"
          hint="حداقل 8 کاراکتر"
          outlined
          dense
          class="py-2"
          style="direction: ltr"
          @click:prepend="showPassword = !showPassword"
        />
      </v-col>

      <v-card-actions>
        <v-col>
          <v-row class="px-8" no-gutters>
            <v-btn
              block
              rounded
              class="primary font-weight-bold py-5"
              type="submit"
              :loading="isSubmittingPassword"
              :disabled="isSubmittingPassword"
              no-gutters
            >
              ورود
            </v-btn>
          </v-row>
          <v-row justify="space-around" class="my-4" no-gutters>
            <v-btn
              text
              color="primary"
              class="text-subtitle-2 px-2"
              @click.prevent="$emit('changePhone')"
              no-gutters
            >
              <v-icon left>
                mdi-pencil
              </v-icon>
              تغییر شماره موبایل
            </v-btn>
            <v-btn
              text
              color="primary"
              class="text-subtitle-2 px-2"
              @click.prevent="$emit('forgetPassword')"
            >
              رمز عبورم را فراموش کرده‌ام
            </v-btn>
          </v-row>
        </v-col>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'LoginPasswordForm',
  props: {
    isSubmittingPassword: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      password: '',
      showPassword: false,
      passwordRules: [
        value => !!value || '.رمز عبور الزامی می‌باشد',
        v => v.length >= 8 || '.رمز عبور باید حداقل 8 کاراکتر باشد'
      ]
    }
  },
  methods: {
    validateAndSubmitForm () {
      if (this.$refs.form.validate()) {
        this.$emit('submitForm', this.password)
      }
    }
  }
}
</script>
