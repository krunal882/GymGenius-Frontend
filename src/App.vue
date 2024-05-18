<template>
  <div>
    <main-nav-wrapper v-if="!isSpecialPage">
      <footer-wrapper>
        <router-view></router-view>
      </footer-wrapper>
    </main-nav-wrapper>
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
        path.startsWith("/resetPassword/") ||
        path === "/404"
      );
    },
  },
  // methods: {
  //   appendChatbotScripts() {
  //     if (
  //       document.querySelector(
  //         'script[src="https://www.chatbase.co/embed.min.js"]'
  //       )
  //     ) {
  //       return; // Scripts are already present, no need to append again
  //     }
  //     const configScript = document.createElement("script");
  //     configScript.innerHTML = `
  //       window.embeddedChatbotConfig = {
  //         chatbotId: "_goC7mZy5K-mr7xGihzhw",
  //         domain: "www.chatbase.co"
  //       }
  //     `;
  //     document.head.appendChild(configScript);

  //     const embedScript = document.createElement("script");
  //     embedScript.src = "https://www.chatbase.co/embed.min.js";
  //     embedScript.setAttribute("chatbotId", "_goC7mZy5K-mr7xGihzhw");
  //     embedScript.setAttribute("domain", "www.chatbase.co");
  //     embedScript.defer = true;
  //     document.head.appendChild(embedScript);
  //   },
  // },
  // watch: {
  //   $route() {
  //     this.appendChatbotScripts();
  //   },
  //   mounted() {
  //     this.appendChatbotScripts();
  //   },
  // },
};
</script>

<style></style>
