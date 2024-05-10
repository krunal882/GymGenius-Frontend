<template>
  <div>
    <main-nav-wrapper>
      <footer-wrapper>
        <router-view></router-view>
      </footer-wrapper>
    </main-nav-wrapper>
  </div>
</template>

<script>
import MainNavWrapper from "./components/MainNavWrapper.vue";
import FooterWrapper from "./components/FooterWrapper.vue";
export default {
  name: "App",
  components: {
    MainNavWrapper,
    FooterWrapper,
  },
};
</script>

<style></style>
