<!-- this component is an wrapper of the store navbar -->
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
</style>
