<template>
  <div class="layout">
    <StoreNavbar />
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import StoreNavbar from "./StoreNavbar.vue";
export default {
  components: {
    StoreNavbar,
  },
};
</script>

<style scoped>
.layout {
  position: relative;
  min-height: 100vh;
}

/* Sticky navbar */
.StoreNavbar {
  position: fixed;
  top: 0;
  z-index: 100; /* Adjust as needed */
}
</style>
