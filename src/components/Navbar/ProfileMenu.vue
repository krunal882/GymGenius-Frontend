<!-- this component is for displaying profile menu button on the navigation bar -->
<template>
  <v-row>
    <v-col cols="12" offset-sm="3" sm="6">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-avatar>
            <v-img
              alt="https://cdn.vuetifyjs.com/images/john.jpg"
              v-bind="props"
              :src="userAvatarUrl"
            ></v-img>
          </v-avatar>
        </template>

        <v-list class="items">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            class="custom-list-item"
          >
            <router-link class="item" :to="getRoute(item.title)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    // content to display inside of profile menu
    return {
      userAvatarUrl:
        this.$store.state.userModule.userAvatarUrl ||
        "https://cdn.vuetifyjs.com/images/john.jpg",
      items: [
        { title: "Your Profile", route: "/profile" },
        { title: "Cart", route: "/profile/cart" },
        { title: "Logout", route: "/profile/logout" },
      ],
    };
  },
  methods: {
    // get the route of the item
    getRoute(title) {
      const item = this.items.find((item) => item.title === title);
      return item ? item.route : "/";
    },
  },

  // watcher on the profile url
  watch: {
    "$store.state.userModule.userAvatarUrl"(newUrl) {
      this.userAvatarUrl =
        newUrl || "https://cdn.vuetifyjs.com/images/john.jpg";
    },
  },
};
</script>

<style scoped>
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
</style>
