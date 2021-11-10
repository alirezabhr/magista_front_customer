<template>
  <v-card outlined class="mb-2">
    <v-row class="pa-2">
        <v-col cols="3">
            <v-card
            outlined
            >
            <v-img
                :aspect-ratio="1"
                :src="getFullImageUrl(orderItem.product.displayImageUrl)"
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
        <v-col cols="1" class="" align-self="center">
            <v-row justify="center">
            <v-btn icon @click.prevent="addItemToCart(orderItem.product)"><v-icon>mdi-plus</v-icon></v-btn>
            </v-row>
            <v-row class="font-weight-bold" justify="center">
            {{ orderItem.count }}
            </v-row>
            <v-row justify="center">
            <v-btn icon @click.prevent="removeItemFromCart(orderItem.product)"><v-icon>mdi-minus</v-icon></v-btn>
            </v-row>
        </v-col>
        <v-col cols="7">
            <v-row no-gutters>
            <div class="text-truncate">
                {{ orderItem.product.title }}
            </div>
            </v-row>
            <v-row class="font-weight-bold" no-gutters>
            {{ orderItem.product.price }} تومان
            </v-row>
        </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { mapActions } from 'vuex'

import OrderItem from '~/models/order_item'

export default {
    name: 'CartOrderItem',
    props: {
        orderItem: {
            type: Object as PropType<OrderItem>,
            required: true
        }
    },
    methods: {
        ...mapActions('cart', ['addItemToCart', 'removeItemFromCart']),

        getFullImageUrl (src:string) {
            return process.env.baseURL + src
        },
    }
}
</script>
