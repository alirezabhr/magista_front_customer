<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="8" lg="6" class="pa-0">
      <v-card min-height="620">
          sadfsd
        <!-- <v-card v-for="seller in getSellersList" :key="seller.instagram_username">
          <v-card-title>
            خرید از {{ seller.instagram_username }}
          </v-card-title>

          <v-card v-for="product in seller.products" :key="product.id" outlined>
            <v-row class="pa-2">
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
              <v-col cols="9">
                <v-row no-gutters>
                  <div class="text-truncate">
                    {{ getLastAppendedProduct.product.title }}
                  </div>
                </v-row>
                <v-row class="font-weight-bold" no-gutters>
                  {{ getLastAppendedProduct.price }} تومان
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-card> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CartPage'
}
</script>
