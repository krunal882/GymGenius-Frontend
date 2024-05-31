<!-- this component is the wrapper of the footer -->
<template>
  <div class="layout">
    <div class="content">
      <slot></slot>
    </div>
    <PageFooter />
  </div>
</template>

<script>
import PageFooter from "./PageFooter.vue";
export default {
  components: {
    PageFooter,
  },
};
</script>

<style></style>
