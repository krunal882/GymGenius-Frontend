<template>
  <nav
    class="navbar d-flex justify-content-center py-0 shadow"
    style="height: 50px; position: sticky"
  >
    <!-- navbar options -->
    <div class="scrollable-wrapper">
      <ul class="navbar-nav">
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
            :to="{ name: navItem.route }"
            @click="setActiveNavItem(index)"
            >{{ navItem.label }}</router-link
          >
        </li>
        <div class="cart-icon text-none mt-2 ml-2">
          <!-- cart option button -->
          <v-badge color="error" :content="cartItemCount">
            <router-link :to="{ name: 'cart' }">
              <v-btn icon size="small">
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </router-link>
          </v-badge>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      activeNavItem: null,
      navItems: [
        {
          label: "Men",
          route: "men",
          highlight: ["/store/men", "/store/men/:products"],
        },
        {
          label: "Women",
          route: "women",
          highlight: ["/store/women", "/store/women/:products"],
        },
        {
          label: "Cardio",
          route: "cardio",
          highlight: ["/store/cardio", "/store/cardio/:products"],
        },
        {
          label: "Cycles",
          route: "cycles",
          highlight: ["/store/cycles", "/store/cycles/:products"],
        },

        {
          label: "Accessories",
          route: "accessories",
          highlight: ["/store/accessories", "/store/accessories/:products"],
        },
        {
          label: "Equipments",
          route: "equipments",
          highlight: ["/store/equipments", "/store/equipments/:products"],
        },
        {
          label: "Supplements",
          route: "supplements",
          highlight: ["/store/supplements", "/store/supplements/:products"],
        },
      ],
      activeNavItemIndex: null,
    };
  },
  computed: {
    cartItemCount() {
      return this.$store.state.cartModule.cartItems.length;
    },
  },
  methods: {
    setActiveNavItem(index) {
      this.activeNavItem = index;
    },
  },
  mounted() {
    const routeIndex = this.navItems.findIndex((item) => {
      if (Array.isArray(item.highlight)) {
        return item.highlight.some((highlight) =>
          this.$route.path.startsWith(highlight)
        );
      } else {
        return item.highlight === this.$route.path;
      }
    });
    this.activeNavItem = routeIndex !== -1 ? routeIndex : -1;
  },
  watch: {
    $route() {
      // Update activeNavItemIndex whenever route changes
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
  },
};
</script>

<style scoped>
nav {
  background-color: white;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 100;
}

.scrollable-wrapper {
  overflow-x: auto;
  width: 706px;
}

.navbar-nav {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: inline-block;
  position: relative;
  min-width: 600px;
}

nav ul li {
  float: left;
}

nav ul li a {
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

nav ul li a:hover {
  background-color: #111;
  color: white;
}

.navbar-nav .active a {
  background-color: #111;
  color: white;
}

.cart-icon {
  display: flex;
}
</style>
