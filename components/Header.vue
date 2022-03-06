<template>
  <div>  
    <NavigationBarMobile v-if="isMobileTablet" />
    <NavigationBarDesktop v-else />
  </div>
</template>

<script>
import NavigationBarMobile from '@/components/NavigationBarMobile.vue'
import NavigationBarDesktop from '@/components/NavigationBarDesktop.vue'

export default {
  name: 'Header',
  components: {
    NavigationBarMobile,
    NavigationBarDesktop
  },
  data () {
    return {
      isHydrated: false   // for vue warn and problems about the differences between ssr and client side rendering
    }
  },
  computed: {
    isMobileTablet () {
      return this.isHydrated
        ? this.$vuetify.breakpoint.smAndDown
        : false
    }
  },  
  mounted () {
    this.isHydrated = true
  }
}
</script>
