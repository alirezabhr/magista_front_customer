<template>
  <v-card>
    <v-card-title>امتیاز به سفارش</v-card-title>
    <v-card-text>شما می‌توانید با ثبت نظرتان در بهبود کیفیت فروشگاه کمک کنید.</v-card-text>
    <v-card-actions>
      <v-col>
        <v-rating
          v-model="rating"
          background-color="orange lighten-3"
          color="orange"
          large
        />
        <div class="red--text">{{ ratingError }}</div>
        <v-row v-if="rating" class="orange--text font-weight-bold text-h6" dir="ltr" justify="center" no-gutters>
          {{ rating }} / 5
        </v-row>
      </v-col>
    </v-card-actions>
    <v-card-actions>
      <v-col cols="8" class="mx-auto">
        <v-btn
          width="100%"
          class="pa-2 font-weight-bold"
          color="primary"
          rounded
          @click.prevent="rate"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          ثبت
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RateOrderForm',
  props: {
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      rating: 0,
      ratingError: ''
    }
  },
  methods: {
    rate () {
      if (this.rating) {
        this.$emit('rate', this.rating)
      } else {
        this.ratingError = 'لطفا بین 1 تا 5 ستاره نظر دهید.'
      }
    }
  }
}
</script>
