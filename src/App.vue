<template>
  <div>
    <!-- Main navigation and footer are displayed only if the current route is not a special page -->
    <main-nav-wrapper v-if="!isSpecialPage">
      <footer-wrapper>
        <!-- The main content of the page is displayed here -->
        <router-view></router-view>
      </footer-wrapper>
    </main-nav-wrapper>
    <!-- For special pages, only the main content is displayed without the main navigation and footer -->
    <router-view v-if="isSpecialPage" />
  </div>
</template>

<script>
import MainNavWrapper from "./components/Navbar/MainNavWrapper.vue";
import FooterWrapper from "./components/Footer/FooterWrapper.vue";

export default {
  name: "App",
  components: {
    MainNavWrapper,
    FooterWrapper,
  },
  computed: {
    isSpecialPage() {
      const { path } = this.$route;
      return (
        path === "/authentication" ||
        path === "/forgotPassword" ||
        path.startsWith("/resetPassword") ||
        path === "/404"
      );
    },
  },
};
</script>

<style></style>
