<template>
  <nav class="navbar my-navbar navbar-expand-lg navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/GymGenius">
        <img src="@/assets/logo.png" alt="Logo" style="width: 220px" />
      </router-link>
      <button
        class="navbar-toggler border-0"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <v-app-bar-nav-icon class="iconify bar-icon"></v-app-bar-nav-icon>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
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
            <a
              v-else
              class="nav-link"
              href="#"
              @click="setActiveNavItem(index)"
              >{{ navItem.label }}</a
            >
          </li>
        </ul>
      </div>
      <router-link class="" to="/authentication">
        <v-btn variant="outlined" color="white">Login/Register</v-btn>
      </router-link>
    </div>
    <ProfileMenu style="margin-right: 0" />
  </nav>
</template>

<script>
import ProfileMenu from "./ProfileMenu.vue";

export default {
  components: {
    ProfileMenu,
  },
  data() {
    return {
      activeNavItem: 0,
      navItems: [
        { label: "Home", route: "/" },
        { label: "Exercises" },
        { label: "Yoga" },
        { label: "Nutrition" },
        { label: "Shop", route: "store" },
        { label: "Blogs" },
        { label: "Analyzer", route: "/fitnessTrackers" },
      ], // Track the active navigation item
    };
  },
  methods: {
    setActiveNavItem(index) {
      this.activeNavItem = index; // Update active navigation item
    },
  },
  watch: {
    $route() {
      const routeIndex = this.navItems.findIndex(
        (item) => item.route === this.$route.path
      );
      this.activeNavItem = routeIndex !== -1 ? routeIndex : 0;
    },
  },
  created() {
    // Set activeNavItem based on initial route
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
      case "/nutrition":
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
        this.activeNavItem = -1; // Set activeNavItem to -1 for the login/register route
        break;

      default:
    }
  },
  // mounted() {
  //   const script = document.createElement("script");
  //   script.src = "https://www.chatbase.co/embed.min.js";
  //   script.defer = true;
  //   script.setAttribute("chatbotId", "_goC7mZy5K-mr7xGihzhw");
  //   script.setAttribute("domain", "www.chatbase.co");
  //   document.body.appendChild(script);
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");

body {
  font-family: "Poppins" !important;
}

.my-navbar {
  background-color: #1c2331;
  width: 100%;
  z-index: 1000; /* Ensure navbar stays on top */
}
.nav-item.active .nav-link {
  color: rgb(250, 0, 0) !important;
  font-weight: 600;
  border-bottom: 4px solid #eb4027;
}

.navbar-brand {
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
</style>
