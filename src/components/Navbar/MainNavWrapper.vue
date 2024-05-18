<template>
  <div class="layout">
    <MainNav />
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import MainNav from "./MainNav.vue";
export default {
  components: {
    MainNav,
  },
};
</script>

<style></style>
