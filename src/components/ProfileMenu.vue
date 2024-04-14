<template>
  <v-row>
    <v-col cols="12" offset-sm="3" sm="6">
      <v-menu>
        <template v-slot:activator="{ on, props }">
          <v-avatar>
            <v-img
              alt="John"
              v-bind="props"
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              v-on="on"
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
  data: () => ({
    items: [
      { title: "Your Profile", route: "/profile" },
      { title: "Cart", route: "/cart" },
      { title: "Logout", route: "/logout" },
    ],
  }),
  methods: {
    getRoute(title) {
      // Find the route for the given title
      const item = this.items.find((item) => item.title === title);
      return item ? item.route : "/";
    },
  },
};
</script>

<style scoped>
.custom-list-item {
  /* Add your custom styles for list items here */
  padding: 10px 0; /* Example: Add padding to list items */
  transition: background-color 0.3s; /* Smooth transition effect */
}

.custom-list-item:hover {
  background-color: #f0f0f0; /* Background color on hover */
}

.item {
  text-decoration: none;
  color: black;
}
</style>
