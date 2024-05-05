<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headersWithActions"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    item-value="name"
    @update:options="loadItems"
  >
    <template v-slot:item="{ items }">
      <tr>
        <td>{{ items.name }}</td>
        <td>{{ items.email }}</td>
        <td>{{ items.age }}</td>
        <td>{{ items.role }}</td>
        <td>{{ items.iron }}</td>
        <td>{{ items.state }}</td>
        <td align="start">
          <v-icon color="blue" @click="editItem(item)">mdi-pencil</v-icon>
        </td>
        <td align="start">
          <v-icon color="red" @click="deleteItem(item)">mdi-delete</v-icon>
        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    itemsPerPage: 5,
    headers: [
      {
        title: "user Name",
        align: "start",
        sortable: false,
        key: "name",
      },
      { title: "Email", key: "email", align: "start" },
      { title: "Age", key: "age", align: "start" },
      { title: "Role", key: "role", align: "start" },
      { title: "State", key: "state", align: "start" },
      { title: "Edit", key: "edit", align: "start" },
      { title: "Delete", key: "delete", align: "start" },
    ],

    loading: true,
  }),
  computed: {
    ...mapState({
      serverItems: (state) => state.user,
      totalItems: (state) => (state.user ? state.user.length : 0),
    }),
    headersWithActions() {
      return [
        ...this.headers,
        { text: "", align: "end", sortable: false }, // Edit column
        { text: "", align: "end", sortable: false }, // Delete column
      ];
    },
  },
  methods: {
    ...mapActions(["getAllUser"]),
    async loadItems() {
      this.loading = true;
      try {
        await this.getAllUser();
        this.loading = false;
      } catch (error) {
        console.error("Error loading items:", error);
        this.loading = false;
      }
    },

    editItem(item) {
      // Implement edit action here
      console.log("Edit item:", item);
    },
    deleteItem(item) {
      // Implement delete action here
      console.log("Delete item:", item);
    },
  },
};
</script>

<style>
/* Add your custom styles here */
</style>
