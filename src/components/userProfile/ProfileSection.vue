<template>
  <div class="text-center container">
    <v-avatar
      class="mb-4"
      color="grey-darken-1"
      size="200"
      style="border: 6px solid #64dd17"
    ></v-avatar>

    <v-divider></v-divider>
    <div>
      <v-row class="text-center">
        <v-col cols="12" sm="3">
          <v-text-field
            label="name"
            :model-value="user.name"
            variant="outlined"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            label="email"
            :model-value="user.email"
            variant="outlined"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            label="phone"
            :model-value="user.number"
            variant="outlined"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            label="age"
            :model-value="user.age"
            variant="outlined"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator>
        <v-btn color="primary" dark v-on:click="dialog = !dialog">Edit</v-btn>
      </template>

      <v-card>
        <v-card-title>Edit Details</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedUser.name"
            :rules="nameRules"
            label="Name"
            variant="outlined"
            required
          ></v-text-field>
          <v-text-field
            v-model="editedUser.email"
            :rules="emailRules"
            label="Email"
            variant="outlined"
            required
          ></v-text-field>
          <v-text-field
            v-model="editedUser.number"
            :rules="phoneRules"
            label="Phone"
            variant="outlined"
            required
            maxlength="10"
          ></v-text-field>

          <v-text-field
            label="Age"
            variant="outlined"
            v-model="editedUser.age"
            required
          ></v-text-field>

          <!-- Form for editing user details -->
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :disabled="isSaveDisabled" @click="saveChanges"
            >Save</v-btn
          >
          <v-btn @click="dialog = !dialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "John Doe",
        email: "john@example.com",
        age: 30,
        number: 9265635978,
      },
      editedUser: {
        name: "",
        email: "",
        age: null,
        number: "",
      },
      dialog: false,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      phoneRules: [
        (v) => !!v || "Phone number is required",
        (v) => /^[0-9]{10}$/.test(v) || "Phone number must be 10 digits",
      ],
      ageRules: [
        (v) => !!v || "Age is required",
        (v) => (v && v >= 18 && v <= 120) || "Age must be between 12 and 120",
      ],
    };
  },
  methods: {
    saveChanges() {
      // Here you can implement logic to save the edited user details
      // For example, you can update the user object with editedUser values
      this.user.name = this.editedUser.name;
      this.user.email = this.editedUser.email;
      this.user.age = this.editedUser.age;
      this.user.number = this.editedUser.number;

      // Close the dialog
      this.dialog = false;
    },
  },
  computed: {
    isSaveDisabled() {
      // Check if any field in the editedUser object is empty
      return Object.values(this.editedUser).some((value) => !value);
    },
  },
};
</script>

<style></style>
