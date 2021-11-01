<template>
  <v-card rounded="0">
    <v-img
      :aspect-ratio="1"
      :src="displayImageUrl"
      style="border-style: solid; border-width: 0.5px; border-color: grey;"
      gradient="to bottom, rgba(0,0,0,0) 80%, rgba(0,0,0,.5) 100%"
      class="align-end"
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
      <v-card-title class="pa-0">
        <v-row align="end" class="pa-0" no-gutters>
          <v-col class="ma-0 pa-0" align-self="center">
            <v-row no-gutters class="pa-0 ma-0" align="end">
              <v-spacer />
              <div class="px-1 pt-1 grey--text font-weight-thin text--lighten-2 text-caption text-sm-caption text-decoration-line-through">
                {{ price }}
              </div>
              <div class="px-1 pt-1 text-caption text-sm-body-2 font-weight-bold white--text text--lighten-2">
                {{ price }}
              </div>
            </v-row>
          </v-col>

          <v-col cols="2" class="pa-0" align-self="end">
            <v-icon color="white">mdi-currency-rial</v-icon>
          </v-col>
        </v-row>
      </v-card-title>
    </v-img>

    <v-card-title class="pa-0">
      <v-row no-gutters>
        <v-btn
          dark
          small
          fab
          top
          right
          absolute
          color="green"
          style="right: 4px; top: 4px;"
          @click.prevent="removeItem(post)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-row>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'ShopProductItem',
  props: {
    displayImageUrl: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }
}
</script>
