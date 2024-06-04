<!-- this component includes the navigation bar of the website , it has logo , navigation options , profile-menu , login/signup button -->
<template>
  <nav class="navbar my-navbar navbar-expand-md navbar-light">
    <div class="container">
      <!-- website logo -->
      <router-link class="navbar-brand" to="/GymGenius">
        <img src="@/assets/logo.png" alt="Logo" style="width: 220px" />
      </router-link>
      <!-- navigation options -->
      <div :class="{ 'navbar-collapse': true }">
        <ul class="navbar-nav ml-auto">
          <li
            v-for="(navItem, index) in navItems"
            :key="index"
            :class="{
              'nav-item': true,
              active: activeNavItem === index && activeNavItem !== -1,
            }"
          >
            <router-link
              v-if="navItem.route"
              class="nav-link"
              :to="navItem.route"
              @click="setActiveNavItem(index)"
            >
              {{ navItem.label }}
            </router-link>
          </li>
          <!-- login/signup button -->
          <div v-if="!token" class="d-flex flex-wrap">
            <router-link to="/authentication">
              <v-btn variant="outlined" color="white">Login/Register</v-btn>
            </router-link>
          </div>
        </ul>
      </div>
    </div>
    <!-- profile menu option -->
    <ProfileMenu class="hover" v-if="token" />
  </nav>
</template>

<script>
import Cookies from "js-cookie";

import ProfileMenu from "./ProfileMenu.vue";
import { jwtDecode } from "jwt-decode";

export default {
  components: {
    ProfileMenu,
  },
  data() {
    return {
      // navigation options
      activeNavItem: 0,
      navItems: [
        { label: "Home", route: "/" },
        { label: "Exercises", route: "/exercise" },
        { label: "Yoga", route: "/YogaPoses" },
        { label: "Nutrition", route: "/foodSection" },
        { label: "Shop", route: "/store" },
        { label: "Analyzer", route: "/fitnessTrackers" },
      ],
      user: null,
      token: null,
    };
  },
  methods: {
    // to highlight the active option on navbar
    setActiveNavItem(index) {
      this.activeNavItem = index;
    },
    // to check if the token is available , if available then make requests
    checkToken() {
      const currentToken = Cookies.get("token");
      if (currentToken !== undefined && currentToken !== this.token) {
        this.token = currentToken;
        if (this.token) {
          const decodedToken = jwtDecode(this.token);
          const id = decodedToken.userId;
          this.$store.dispatch("fetchUser", { id });
          this.$store.state.userModule.userId = decodedToken.userId;
          this.$store.state.userModule.role = decodedToken.role;
          this.$store.dispatch("fetchCart", {
            userId: decodedToken.userId,
            status: "pending",
          });
          this.$store.dispatch("fetchBookmarked", {
            userId: decodedToken.userId,
          });
        }
      }
    },
    // chatBoat for the fitness purpose
    chatBoat() {
      const scriptConfig = document.createElement("script");
      scriptConfig.innerHTML = `
          window.embeddedChatbotConfig = {
            chatbotId: "_goC7mZy5K-mr7xGihzhw",
            domain: "www.chatbase.co"
          }
        `;
      document.head.appendChild(scriptConfig);

      const scriptEmbed = document.createElement("script");
      scriptEmbed.src = "https://www.chatbase.co/embed.min.js";
      scriptEmbed.setAttribute("chatbotId", "_goC7mZy5K-mr7xGihzhw");
      scriptEmbed.setAttribute("domain", "www.chatbase.co");
      scriptEmbed.defer = true;
      document.head.appendChild(scriptEmbed);
    },
  },
  mounted() {
    // if (this.$store.state.userModule.userId.length > 0) {
    //   this.chatBoat();
    // }
  },
  computed: {
    userId() {
      return this.$store.state.userModule.userId?.length > 0;
    },
  },

  watch: {
    $route() {
      const routeIndex = this.navItems.findIndex(
        (item) => item.route === this.$route.path
      );
      this.activeNavItem = routeIndex !== -1 ? routeIndex : 0;
      this.checkToken();
    },
  },
  created() {
    switch (this.$route.path) {
      case "/":
        this.activeNavItem = 0;
        break;
      case "/exercises":
        this.activeNavItem = 1;
        break;
      case "/yoga":
        this.activeNavItem = 2;
        break;
      case "/foodSection":
        this.activeNavItem = 3;
        break;
      case "/store":
        this.activeNavItem = 4;
        break;
      case "/blogs":
        this.activeNavItem = 5;
        break;
      case "/fitnessTrackers/":
        this.activeNavItem = 6;
        break;

      case "/authentication":
        this.activeNavItem = -1;
        break;

      default:
        this.activeNavItem = 0;
    }
    this.checkToken();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");

body {
  font-family: "Poppins" !important;
}

.my-navbar {
  background-color: #1c2331;
  width: 100%;
  z-index: 1000;
}
.nav-item.active .nav-link {
  color: rgb(250, 0, 0) !important;
  font-weight: 600;
  border-bottom: 4px solid #eb4027;
}

.navbar-brand {
  margin-left: 10px;
  font-weight: bold;
}
.nav-link {
  margin-right: 24px;
  transition: 0.3s ease;
  padding: 5px;
  color: white;
}
.nav-link:hover {
  color: rgb(255, 0, 0);
  border-bottom: 4px solid #eb4027;
}
.nav-active a {
  color: rgb(250, 0, 0) !important;
  font-weight: 600;
  border-bottom: 4px solid #eb4027;
}

.img {
  width: 250px;
}

.hover {
  cursor: pointer;
}
</style>
