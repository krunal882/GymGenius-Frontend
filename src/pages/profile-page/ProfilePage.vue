<template>
  <v-app id="inspire">
    <v-app-bar-nav-icon
      @click="drawer = !drawer"
      z-index="1"
    ></v-app-bar-nav-icon>

    <v-navigation-drawer v-model="drawer" app absolute bottom>
      <v-sheet class="pa-4" color="grey-lighten-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>
        <div>{{ $store.state.userModule.email }}</div>
      </v-sheet>

      <v-list>
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          router
          :to="{ name: link.route }"
          :prepend-icon="link.icon"
          :title="link.text"
          @click="selectedItem = index"
        ></v-list-item>
      </v-list>
      <div v-if="this.$store.state.userModule.role === 'owner'">
        <h4 class="text-center">Admin section</h4>
        <v-list>
          <v-list-item
            v-for="(link, index) in admin"
            :key="index"
            router
            :to="{ name: link.route }"
            :prepend-icon="link.icon"
            :title="link.text"
            @click="selectedItem = index"
          >
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const links = [
  {
    icon: "mdi-account",
    text: "Personal Info",
    route: "personalInfo",
  },
  { icon: "mdi-cart", text: "Cart", route: "cart" },
  { icon: "mdi-bookmark", text: "Bookmarked", route: "bookmark" },
  { icon: "mdi-currency-inr", text: "purchase", route: "purchase" },
  { icon: "mdi-logout", text: "logout", route: "logout" },
];

const admin = [
  {
    icon: "mdi-account-group",
    text: "Your users",
    route: "users-admin",
  },
  { icon: "mdi-cart-outline", text: "Orders", route: "orders" },
  {
    icon: "mdi-information-outline",
    text: "Info Section ",
    route: "Info-admin",
  },
];
const drawer = ref(true);
const selectedItem = ref(
  links.findIndex((link) => link.text === "Personal Info")
);
</script>
<script>
export default {
  components: {},
};
</script>

<style>
.v-navigation-drawer {
  transition: transform 0.3s ease;
}

.v-navigation-drawer--open {
  transform: translateX(0);
}

.v-navigation-drawer--close {
  transform: translateX(-100%);
}
</style>
