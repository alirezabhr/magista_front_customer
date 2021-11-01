<template>
  <v-dialog
    v-if="getShowAddToCartStatus"
    v-model="show"
    max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        Use Google's location service?
      </v-card-title>

      <v-card-text>
        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="green darken-1"
          text
        >
          Disagree
        </v-btn>

        <v-btn
          color="green darken-1"
          text
        >
          Agree
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
    ...mapGetters('cart', ['getShowAddToCartStatus'])
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
