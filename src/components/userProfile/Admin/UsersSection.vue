<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h3>Your Users</h3>
      </v-col>
      <v-col cols="6" class="text-right">
        <v-btn color="success" @click="addUser">Add User</v-btn>
      </v-col>
    </v-row>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :items="users"
      :loading="loading"
      :headers="headers"
      @update:options="loadItems"
    >
      <template v-slot:headers="{ column }">
        {{ column }}
      </template>
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ index + 1 }}</td>
          <td>{{ item._id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.number }}</td>
          <td>{{ item.role }}</td>
          <td>
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
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator>
        <v-btn color="primary" dark>Edit</v-btn>
      </template>

      <v-card>
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
            :items="['user', 'owner ']"
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            :disabled="validationErrors"
            @click="saveChanges(editedUser._id)"
            >Save</v-btn
          >
          <v-btn @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      editedUser: {},
      validationErrors: false,
      itemsPerPage: 10,
      page: 1,
      headers: [
        { text: "No", align: "start", sortable: false },
        { text: "ID", align: "start", sortable: false },
        { text: "Name", align: "start", sortable: false },
        { text: "Email", align: "start", sortable: false },
        { text: "Age", align: "start", sortable: false },
        { text: "Phone", align: "start", sortable: false },
        { text: "Role", align: "start", sortable: false },
        { text: "Actions", align: "start", sortable: false },
      ],
    };
  },
  computed: {
    users() {
      return this.$store.state.adminModule.userInfo || [];
    },
  },
  methods: {
    ...mapActions(["getAllUser", "userUpdate", "userSignup"]),
    async loadItems({ page, itemsPerPage }) {
      this.loading = true;
      try {
        await this.getAllUser({ page, limit: itemsPerPage });
        this.loading = false;
      } catch (error) {
        console.error("Error loading items:", error);
        this.loading = false;
      }
    },
    validateFields() {
      const { name, email, number, age, role } = this.editedUser;
      this.validationErrors =
        !name ||
        !email ||
        !/.+@.+\..+/.test(email) ||
        !number ||
        !/^\d{10}$/.test(number) ||
        !age ||
        !/^\d+$/.test(age) ||
        !role;
    },
    editItem(item) {
      this.openDialog(item);
    },
    deleteItem(item) {
      console.log("Delete item:", item);
    },
    openDialog(item) {
      this.editedUser = { ...item };
      this.dialog = true;
    },
    saveChanges(id) {
      const email = this.editedUser.email;
      const name = this.editedUser.name;
      const age = this.editedUser.age;
      const number = this.editedUser.number;
      const role = this.editedUser.role;
      const updatedUser = {
        _id: id,
        name,
        email,
        age,
        number,
        role,
      };
      this.$store.dispatch("userUpdate", {
        email,
        name,
        age,
        number,
        role,
        id,
      });
      this.updateUserLocally(updatedUser);

      this.dialog = false;
    },
    addUser() {},
    updateUserLocally(updatedUser) {
      const index = this.users.findIndex(
        (user) => user._id === updatedUser._id
      );
      if (index !== -1) {
        this.$set(this.users, index, updatedUser);
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
