<template>
  <v-card flat outlined>
    <v-col class="pa-0 mx-auto">
      <div v-for="(content, index) in tableContent" :key="index">
        <v-row justify="center" no-gutters>
          <v-col cols="5" class="pa-0 mx-auto">
            <div :class="index === (tableContent.length - 1) ? 'font-weight-bold text-subtitle-1' : 'text-subtitle-2'" class="py-1 mx-auto">
              {{ content.title }}
            </div>
          </v-col>
          <v-divider vertical class="grey lighten-2" />
          <v-col cols="6" class="pa-0 mx-auto">
            <div :class="index === (tableContent.length - 1) ? 'font-weight-bold text-subtitle-1' : 'text-subtitle-2'" class="py-1 mx-auto">
              {{ content.value }}
            </div>
          </v-col>
        </v-row>
        <v-divider v-show="index !== (tableContent.length - 1)" class="grey lighten-2" />
      </div>
    </v-col>
  </v-card>
</template>

<script>
export default {
  name: 'InvoiceTable',
  props: {
    invoice: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tableContent: []
    }
  },
  computed: {
    invoiceTotalPrice () {
      let s = 0
      this.invoice.orders.forEach(el => {
        s += el.totalOriginalPrice
      })
      return s 
    },
    invoiceTotalDiscount () {
      let s = 0
      this.invoice.orders.forEach(el => {
        s += el.totalDiscountAmount
      })
      return s 
    },
    invoiceFinalPrice () {
      return this.invoiceTotalPrice - this.invoiceTotalDiscount
    }
  },
  mounted () {
    this.fillTableContents()  // should be in mounted
  },
  methods: {
    fillTableContents () {
      this.tableContent = [
        { title: 'قیمت کل کالاها', value: `${this.invoiceTotalPrice} تومان` },
        { title: 'تخفیف کالاها', value: `${this.invoiceTotalDiscount} تومان` },
        { title: 'جمع', value: `${this.invoiceFinalPrice} تومان` }
      ]
    }
  }
}
</script>
