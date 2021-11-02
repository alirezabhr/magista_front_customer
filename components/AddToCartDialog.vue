<template>
  <v-dialog
    v-model="show"
    max-width="350"
  >
    <v-card>
      <v-card-title class="text-body-1 green--text font-weight-bold">
        <v-icon class="ml-1" color="green">mdi-checkbox-marked-circle-plus-outline mdi-18px</v-icon>
        به سبد خرید اضافه شد

        <v-spacer />

        <v-btn
          icon
          @click.prevent="show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-card
          class="pa-2"
          outlined
        >
          <v-row>
            <v-col cols="3">
              <v-card
                outlined
              >
                <v-img
                  :aspect-ratio="1"
                  :src="getImageUrl"
                >
                  <template #placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-2"
                      />
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
            <v-col cols="7">
              <v-row no-gutters>
                <div class="text-truncate">
                  {{ getLastAppendedProduct.title }}
                </div>
              </v-row>
              <v-row class="font-weight-bold" no-gutters>
                {{ getLastAppendedProduct.price }} تومان
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>

      <v-card-actions>
        <v-btn
          class="darken-1 white--text px-4 mx-auto"
          color="green"
          rounded
          to="/cart"
          @click="setShowAddToCart(false)"
        >
          <v-icon>mdi-cart mdi-flip-h</v-icon>
          رفتن به سبد
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'AddToCartDialog',
  data () {
    return {
      show: true
    }
  },
  computed: {
    ...mapGetters('cart', ['getLastAppendedProduct']),

    getImageUrl () {
      return process.env.baseURL + this.getLastAppendedProduct.displayImage
    }
  },
  watch: {
    show (newValue) {
      if (!newValue) { // dialog closed by clicking somewhere else
        this.setShowAddToCart(newValue)
        this.show = true // always should set show property true, dialog shows when getShowAddToCartStatus getter returns true
      }
    }
  },
  methods: {
    ...mapMutations('cart', ['setShowAddToCart'])
  }
}
</script>
