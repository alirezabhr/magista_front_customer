<template>
  <div
    class="tag"
    :style="`left: ${product.tag.x}%; bottom: ${product.tag.y}%;`"
    style="transform: translate(-50%, 100%); max-width: 130px;"
  >
    <div class="arrow-up" style="opacity: 85%;" />
    <div class="rounded-lg">
      <v-card
        rounded="md"
        color="black"
        max-width="130"
        style="opacity: 85%;"
        class="px-3 py-1"
        flat
      >
        <div class="white--text font-weight-bold text-caption text-truncate pb-1">{{ product.title }}</div>
        <v-row v-if="product.discountPercent" class="px-1 white--text font-weight-light text-decoration-line-through" style="font-size: .600rem;" no-gutters>
          {{ product.originalPrice }}
        </v-row>
        <v-row class="white--text font-weight-medium text-caption px-1" no-gutters>
          {{ product.finalPrice }}
          <v-spacer />
          <span class="currency">تومان</span>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductTag',
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.tag {
  position: absolute;
  -webkit-transform: scale(0);
  transform: scale(0);
  -webkit-transform-origin: center top;
  transform-origin: center top;
  -webkit-transition-duration: .2s;
  transition-duration: .2s;
  -webkit-transition-property: opacity,-webkit-transform;
  transition-property: transform,opacity;
  transition-property: transform,opacity,-webkit-transform;
  -webkit-transition-timing-function: cubic-bezier(.16,1.275,.725,1.255);
  transition-timing-function: cubic-bezier(.16,1.275,.725,1.255);
}
.arrow-up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid black;
  margin-right: 40%;
}
.currency {
  -webkit-text-size-adjust: 100%;
    direction: rtl;
    list-style: none;
    text-align: center;
    -webkit-box-direction: normal;
    box-sizing: inherit;
    outline: none!important;
    font-size: .540rem;
    line-height: 21px;
}
</style>
