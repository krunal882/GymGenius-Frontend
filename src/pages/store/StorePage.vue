<!-- store page -->
<template>
  <div>
    <store-nav-wrapper>
      <router-view></router-view>
    </store-nav-wrapper>
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

<style scoped></style>
