<template>
  <div class="app-container">
    <!-- Left side ad -->
    <div class="side-ad left-ad">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-7764190062746470"
           data-ad-slot="9707905683"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>

    <!-- Main content with navigation and footer -->
    <div class="main-content">
      <main-nav-wrapper v-if="!isSpecialPage">
        <footer-wrapper>
          <router-view></router-view>
        </footer-wrapper>
      </main-nav-wrapper>
      <router-view v-if="isSpecialPage" />
    </div>

    <!-- Right side ad -->
    <div class="side-ad right-ad">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-7764190062746470"
           data-ad-slot="9707905683"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
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
  mounted() {
    (adsbygoogle = window.adsbygoogle || []).push({});
  },
};
</script>

<style>
.app-container {
  display: flex;
  justify-content: space-between;
}

.main-content {
  flex-grow: 1;
  margin: 0 20px; /* Adjust as needed */
}

.side-ad {
  width: 160px; /* Adjust the width as needed */
}

.left-ad {
  /* You can add custom styles for the left ad if needed */
}

.right-ad {
  /* You can add custom styles for the right ad if needed */
}
</style>
