<template>
  <div>
    <store-nav-wrapper>
      <router-view></router-view>
    </store-nav-wrapper>
    <!-- This will render the child components -->
  </div>
</template>

<script>
import StoreNavWrapper from "@/components/store/storeComponents/StoreNavWrapper.vue";
export default {
  name: "StorePage",
  components: {
    StoreNavWrapper,
  },
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
