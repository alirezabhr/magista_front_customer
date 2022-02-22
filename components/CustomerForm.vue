<template>
    <v-card>
        <v-row class="pa-5 ma-2 red--text text--darken-3" no-gutters>
            <v-icon color="red" class="px-3">mdi-alert-decagram mdi-22px</v-icon>
            <span>ابتدا حساب کاربری خود را تکمیل کنید</span>
        </v-row>
        <v-form
            ref="form"
            lazy-validation
            @submit.prevent="validateAndSubmitForm"
        >
        <v-card-title class="pt-0 mx-3 text-h6 font-weight-bold">
          ثبت اطلاعات
        </v-card-title>

        <v-col class="py-0 px-8">
            <v-text-field
                v-model="customerData.name"
                label="نام و نام خانوادگی"
                :rules="nameRules"
                outlined
                dense
            />
            <v-row no-gutters>
              <v-col cols="12" md="6" class="my-0 py-0">
                  <v-autocomplete
                      v-model="customerData.province"
                      label="استان"
                      :items="getAllProvinces"
                      :rules="provinceRules"
                      outlined
                      dense
                  >
                  <template #no-data>
                      <v-list-item>
                      <v-list-item-title>
                          هیچ استانی با این مشخصات پیدا نشد.
                      </v-list-item-title>
                      </v-list-item>
                  </template>
                  </v-autocomplete>
              </v-col>

              <v-col cols="12" md="6" class="my-0 py-0">
                  <v-autocomplete
                      v-model="customerData.city"
                      label="شهر"
                      :items="getProvinceCities"
                      :rules="cityRules"
                      outlined
                      dense
                  >
                  <template #no-data>
                      <v-list-item>
                      <v-list-item-title>
                          هیچ شهری با این مشخصات پیدا نشد.
                      </v-list-item-title>
                      </v-list-item>
                  </template>
                  </v-autocomplete>
              </v-col>
            </v-row>
            <v-textarea
                v-model="customerData.address"
                label="آدرس"
                :rules="addressRules"
                outlined
                dense
            />
            <v-text-field
                v-model="customerData.postalCode"
                label="کد پستی"
                :rules="postalCodeRules"
                outlined
                dense
            />
        </v-col>

        <v-card-actions class="px-8">
            <v-col cols="12">
                <v-row justify="center" no-gutters>
                    <v-btn
                        block
                        class="primary font-weight-bold py-5"
                        :loading="isSubmittingForm"
                        :disabled="isSubmittingForm"
                        type="submit"
                    >
                        ثبت و ادامه
                    </v-btn>
                </v-row>
                <v-row justify="center" no-gutters>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="$emit('close')"
                    >
                        بستن
                    </v-btn>
                </v-row>
            </v-col>
        </v-card-actions>
        
        </v-form>
    </v-card>
</template>

<script>
import provincesAndCities from '@/assets/json/iran_cities.json'

export default {
  name: 'CustomerForm',
  props: {
    isSubmittingForm: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      customerData: {
        name: '',
        province: '',
        city: '',
        address: '',
        postalCode: ''
      },
      nameRules: [
        value => !!value || '.نام و نام‌خانوادگی الزامی می‌باشد',
      ],
      provinceRules: [
        value => !!value || 'استان الزامی است.',
        value => this.getAllProvinces.includes(value) || 'استان نامعتبر است.'
      ],
      cityRules: [
        value => !!value || 'شهر الزامی است.',
        value => this.getProvinceCities.includes(value) || 'شهر نامعتبر است.'
      ],
      addressRules: [
        value => !!value || 'آدرس الزامی می‌باشد.',
        value => !/^\s+$/.test(value) || 'آدرس نامعتبر است.'
      ],
      postalCodeRules: [
        value => !!value || 'کد پستی الزامی می‌باشد.'
      ]
    }
  },
  computed: {
    getAllProvinces () {
      return Array.from(provincesAndCities, item => item.name)
    },
    getProvinceCities () {
      if (this.getAllProvinces.includes(this.customerData.province)) {
        const province = provincesAndCities.find(province => province.name === this.customerData.province)
        return Array.from(province.cities, item => item.name)
      }
      return []
    }
  },
  methods: {
    validateAndSubmitForm () {
      if (this.$refs.form.validate()) {
        this.$emit('submit', this.customerData)
      }
    }
  }
}
</script>
