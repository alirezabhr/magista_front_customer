<template>
  <NavigationBarMobile v-if="$vuetify.breakpoint.smAndDown" />
  <NavigationBarDesktop v-else />
</template>

<script>
import NavigationBarMobile from '@/components/NavigationBarMobile.vue'
import NavigationBarDesktop from '@/components/NavigationBarDesktop.vue'

export default {
  name: 'Header',
  components: {
    NavigationBarMobile,
    NavigationBarDesktop
  }
}
</script>
