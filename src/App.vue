<template>
  <div>
    <main-nav-wrapper v-if="!isAuthPage && !isForgot && !isReset">
      <footer-wrapper>
        <router-view></router-view>
      </footer-wrapper>
    </main-nav-wrapper>
    <router-view v-if="isAuthPage || isForgot || isReset" />
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
  computed: {
    isAuthPage() {
      return this.$route.path === "/authentication";
    },
    isForgot() {
      return this.$route.path === "/forgotPassword";
    },
    isReset() {
      return this.$route.path.startsWith("/resetPassword/");
    },
  },
};
</script>

<style></style>
