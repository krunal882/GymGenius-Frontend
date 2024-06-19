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
        </ul>

        <!-- login/signup button -->
        <div v-if="!token" class="d-flex flex-wrap">
          <router-link to="/authentication">
            <v-btn variant="outlined" color="white">Login/Register</v-btn>
          </router-link>
        </div>
        <div class="d-flex flex-wrap">
          <!-- profile menu option -->
          <ProfileMenu class="hover" v-if="token" />
        </div>
      </div>
    </div>
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
      activeNavItem: null,
      navItems: [
        { label: "Home", route: "/", highlight: "/GymGenius" },
        { label: "Anatomy", route: "/anatomy", highlight: "/anatomy" },
        {
          label: "Exercises",
          route: "/exercise",
          highlight: ["/exercise", "/exercise/:detail"],
        },
        {
          label: "Yoga",
          route: "/YogaPoses",
          highlight: ["/YogaPoses", "YogaPoses/:detail"],
        },
        {
          label: "Nutrition",
          route: "/foodSection",
          highlight: ["/foodSection", "/foodSection/:category"],
        },
        {
          label: "Shop",
          route: "/store",
          highlight: ["/store", "/store/:name"],
        },
        {
          label: "Analyzer",
          route: "/fitnessTrackers",
          highlight: ["/fitnessTrackers", "/fitnessTrackers/:tracker"],
        },
        {
          highlight: ["/profile", "/profile/:section"],
        },
      ],
      token: null,
    };
  },
  methods: {
    setActiveNavItem(index) {
      this.activeNavItem = index;
    },
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
    this.checkToken();
    if (this.$store.state.userModule.userId.length > 0) {
      this.chatBoat();
    }
    const routeIndex = this.navItems.findIndex((item) => {
      if (Array.isArray(item.highlight)) {
        return item.highlight.some((highlight) =>
          this.$route.path.startsWith(highlight)
        );
      } else {
        return item.highlight === this.$route.path;
      }
    });
    this.activeNavItem = routeIndex !== -1 ? routeIndex : 0;
  },
  watch: {
    $route() {
      const routeIndex = this.navItems.findIndex((item) => {
        if (Array.isArray(item.highlight)) {
          return item.highlight.some((highlight) =>
            this.$route.path.startsWith(highlight)
          );
        } else {
          return item.highlight === this.$route.path;
        }
      });
      this.activeNavItem = routeIndex !== -1 ? routeIndex : 0;
      this.checkToken();
    },
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
.custom-list-item {
  padding: 10px 0;
  transition: background-color 0.3s;
}

.custom-list-item:hover {
  background-color: #f0f0f0;
}

.item {
  text-decoration: none;
  color: black;
}
.menu-icon {
  cursor: pointer;
  margin-right: 10px;
}
</style>

<style>
/* HTML: <div class="loader"></div> */
.main-loader {
  width: 50px;
  aspect-ratio: 1;
  --_c: no-repeat radial-gradient(farthest-side, #25b09b 92%, #0000);
  background: var(--_c) top, var(--_c) left, var(--_c) right, var(--_c) bottom;
  background-size: 12px 12px;
  animation: l7 1s infinite;
  position: absolute;
  left: 50%;
}
@keyframes l7 {
  to {
    transform: rotate(0.5turn);
  }
}
</style>
