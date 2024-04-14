/* eslint-disable */
<template>
  <v-app id="inspire">
    <v-app-bar-nav-icon
      @click="drawer = !drawer"
      z-index="1"
    ></v-app-bar-nav-icon>

    <v-navigation-drawer v-model="drawer" z-index="2" persistent app>
      <v-sheet class="pa-4" color="grey-lighten-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>
        <div>john@google.com</div>
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
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <!-- Render different content based on selected item -->
      </v-container>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const links = [
  {
    icon: "mdi-inbox-arrow-down",
    text: "Personal Info",
    route: "personalInfo",
  },
  { icon: "mdi-inbox-arrow-down", text: "Cart", route: "cart" },
  { icon: "mdi-send", text: "Setting", route: "setting" },
  { icon: "mdi-delete", text: "Bookmarked", route: "bookmark" },
  { icon: "mdi-alert-octagon", text: "purchase", route: "purchase" },
  { icon: "mdi-alert-octagon", text: "logout", route: "logout" },
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
