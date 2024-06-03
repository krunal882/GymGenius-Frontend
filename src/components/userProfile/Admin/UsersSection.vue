<!-- this component is parent component of users for the admin actions -->
<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col cols="auto">
        <h3>Your Users</h3>
      </v-col>
      <v-col cols="auto">
        <v-text-field
          v-model="userSearch"
          dense
          placeholder="Search user by name"
          append-outer-icon="mdi-magnify"
          style="max-width: 300px; min-width: 250px"
          variant="outlined"
          rounded
          @input="debouncedSearch"
        />
      </v-col>
      <v-col cols="auto">
        <v-btn class="mb-5" color="success" @click="addUser">Add User</v-btn>
      </v-col>
    </v-row>
    <!-- data table for displaying user info -->
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :items-length="totalItems"
      :items="users"
      :loading="loading"
      :headers="headers"
      :items-per-page-options="[5, 10, 20, 50]"
      @update:options="loadItems"
    >
      <template v-slot:headers="{ headers }">
        <tr>
          <th
            v-for="(header, index) in headers[0]"
            :key="index"
            :class="`text-${header.align}`"
          >
            {{ header.text }}
          </th>
        </tr>
      </template>

      <template v-slot:item="{ item, index }">
        <tr>
          <!-- user info -->
          <td>{{ (page - 1) * itemsPerPage + index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.number }}</td>
          <td>{{ item.role }}</td>
          <td>{{ item.state }}</td>
          <td>
            <!-- edit and delete button  -->
            <v-icon color="blue" class="mr-5" @click="openDialog(item)"
              >mdi-pencil</v-icon
            >
            <v-icon color="red" @click="openDeleteDialog(item)"
              >mdi-delete</v-icon
            >
          </td>
        </tr>
      </template>
    </v-data-table-server>
    <!-- component for delete operation -->
    <DeleteUserDialog :id="userToDelete" v-model:dialog="deleteDialog" />
    <!-- component for adding user -->
    <AddUser v-model:addDialog="addDialog" />
    <v-dialog v-model="dialog" :persistent="false" max-width="500px">
      <v-card>
        <!-- fields for edit user -->
        <v-card-title>Edit Details</v-card-title>
        <v-card-text>
          <v-select
            label="Role"
            v-model="editedUser.role"
            :items="['user', 'owner']"
            required
          ></v-select>
          <v-select
            label="State"
            v-model="editedUser.state"
            :items="['active', 'inactive']"
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <!-- button for save and cancel edit -->
          <v-btn
            color="primary"
            :disabled="validationErrors"
            @click="saveChanges(editedUser)"
            >Save</v-btn
          >
          <v-btn @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import DeleteUserDialog from "../DeleteUserDialog.vue";
import AddUser from "./information/actions/addItem/AddUser.vue";

export default {
  components: {
    DeleteUserDialog,
    AddUser,
  },
  data() {
    return {
      userSearch: "",
      addDialog: false,
      deleteDialog: false,
      userToDelete: null,
      loading: false,
      dialog: false,
      editedUser: {},
      validationErrors: false,
      itemsPerPage: 10,
      page: 1,
      headers: [
        { text: "No", align: "start", sortable: false },
        { text: "Name", align: "start", sortable: false },
        { text: "Email", align: "start", sortable: false },
        { text: "Age", align: "start", sortable: false },
        { text: "Phone", align: "start", sortable: false },
        { text: "Role", align: "start", sortable: false },
        { text: "State", align: "start", sortable: false },
        { text: "Actions", align: "start", sortable: false },
      ],
      searchTimeout: null, // Timeout ID for debounce
    };
  },
  computed: {
    users() {
      return this.$store.state.adminModule.userInfo || [];
    },
    totalItems() {
      return this.$store.state.adminModule.total;
    },
  },
  methods: {
    // to load more products
    async loadItems({ page, itemsPerPage }) {
      this.loading = true;
      try {
        if (this.userSearch) {
          await this.$store.dispatch("fetchFilteredUser", {
            name: this.userSearch,
          });
        } else {
          await this.$store.dispatch("getAllUser", {
            page,
            limit: itemsPerPage,
          });
        }
        this.loading = false;
        this.page = page;
      } catch (error) {
        console.error("Error loading items:", error);
        this.loading = false;
      }
    },
    // to open the edit dialog
    editItem(item) {
      this.openDialog(item);
    },
    // to open delete dialog
    openDeleteDialog(user) {
      this.userToDelete = user._id;
      this.deleteDialog = true;
    },
    // to close delete dialog
    closeDeleteDialog() {
      this.deleteDialog = false;
      this.userToDelete = null;
    },
    // to open add dialog
    addUser() {
      this.addDialog = true;
    },
    // to open edit dialog
    openDialog(item) {
      this.editedUser = { ...item };
      this.dialog = true;
    },
    // to close dialog
    closeDialog() {
      this.dialog = false;
    },
    // to update user information
    saveChanges({ _id, role, state }) {
      console.log(role, state);
      const updatedUser = { _id, role, state };
      this.$store.dispatch("userUpdate", { updatedUser });
      this.updateUserLocally(updatedUser);
      this.dialog = false;
    },
    // update user locally
    updateUserLocally(updatedUser) {
      const index = this.users.findIndex(
        (user) => user._id === updatedUser._id
      );
      if (index !== -1) {
        this.users[index].role = updatedUser.role;
        this.users[index].state = updatedUser.state;
      }
    },
    debouncedSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.handleSearchInput();
      }, 1000);
    },
    handleSearchInput() {
      this.loadItems({ page: 1, itemsPerPage: this.itemsPerPage });
    },
  },
};
</script>

<style>
.v-data-table {
  width: 100%;
  margin-top: 20px;
  font-size: 14px;
}

.v-data-table thead th {
  background-color: #f5f5f5;
  color: #333;
  font-weight: bold;
}

.v-data-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.v-data-table tbody tr:hover {
  background-color: #f0f0f0;
}

.v-data-table tbody td {
  padding: 8px;
}

.v-data-table tbody td .v-icon {
  cursor: pointer;
  margin-right: 5px;
}
</style>
