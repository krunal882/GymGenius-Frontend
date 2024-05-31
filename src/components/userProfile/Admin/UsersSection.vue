<!-- this component is parent component of users for the admin actions -->
<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h3>Your Users</h3>
      </v-col>
      <!-- button for adding user -->
      <v-col cols="6" class="text-right">
        <v-btn color="success" @click="addUser()">Add User</v-btn>
      </v-col>
    </v-row>
    <!-- data table for displaying user info -->
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :items-length="totalItems"
      :items="users"
      :loading="loading"
      :headers="headers"
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
          <v-text-field
            v-model="editedUser.name"
            :rules="[(v) => !!v || 'Name is required']"
            label="Name"
            variant="outlined"
            required
          ></v-text-field>
          <v-text-field
            v-model="editedUser.email"
            :rules="[
              (v) => !!v || 'Email is required',
              (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
            ]"
            label="Email"
            variant="outlined"
            required
          ></v-text-field>
          <v-text-field
            v-model="editedUser.number"
            :rules="[
              (v) => !!v || 'Phone number is required',
              (v) => /^\d{10}$/.test(v) || 'Phone number must be 10 digits',
            ]"
            label="Phone"
            variant="outlined"
            required
            maxlength="10"
          ></v-text-field>
          <v-text-field
            label="Age"
            variant="outlined"
            v-model.number="editedUser.age"
            :rules="[
              (v) => !!v || 'Age is required',
              (v) => /^\d+$/.test(v) || 'Age must be a number',
            ]"
            required
          ></v-text-field>
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
        await this.$store.dispatch("getAllUser", { page, limit: itemsPerPage });
        this.loading = false;
        this.page = page;
      } catch (error) {
        console.error("Error loading items:", error);
        this.loading = false;
      }
    },
    //to open the edit dialog
    editItem(item) {
      this.openDialog(item);
    },
    // to open delete dialog
    openDeleteDialog(user) {
      this.userToDelete = user._id;
      this.deleteDialog = true;
    },
    //to close delete dialog
    closeDeleteDialog() {
      this.deleteDialog = false;
      this.userToDelete = null;
    },
    //to open add dialog
    addUser() {
      this.addDialog = true;
    },
    //to open edit dialog
    openDialog(item) {
      this.editedUser = { ...item };
      this.dialog = true;
    },
    //to close dialog
    closeDialog() {
      this.dialog = false;
    },
    //to update user information
    saveChanges({ _id, email, name, age, number, role, state }) {
      const updatedUser = { _id, email, name, age, number, role, state };
      this.$store.dispatch("userUpdate", { updatedUser });
      this.updateUserLocally(updatedUser);
      this.dialog = false;
    },
    //update user locally
    updateUserLocally(updatedUser) {
      const index = this.users.findIndex(
        (user) => user._id === updatedUser._id
      );
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
    },
  },
  created() {
    this.loadItems({ page: this.page, itemsPerPage: this.itemsPerPage });
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
