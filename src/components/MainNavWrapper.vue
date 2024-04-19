<template>
  <div class="layout">
    <HelloWorld />
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./MainNav.vue";
export default {
  components: {
    HelloWorld,
  },
};
</script>

<style></style>
