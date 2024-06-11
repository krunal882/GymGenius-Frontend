<!-- this component is for admin to add/create new user information , it provides the dialog with input fields to enter information-->
<template>
  <v-dialog v-model="localDialog" max-width="500px">
    <v-card>
      <v-card-title>Add User</v-card-title>
      <v-card-text>
        <!-- name field -->
        <v-text-field
          v-model="user.name"
          :rules="[(v) => !!v || 'Name is required']"
          label="Name"
          variant="outlined"
          required
        ></v-text-field>
        <!-- email field -->
        <v-text-field
          v-model="user.email"
          :rules="[
            (v) => !!v || 'Email is required',
            (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
          ]"
          label="Email"
          variant="outlined"
          required
        ></v-text-field>
        <div class="d-flex flex-wrap">
          <!-- number field -->
          <v-text-field
            v-model="user.number"
            :rules="[
              (v) => !!v || 'Phone number is required',
              (v) => /^\d{10}$/.test(v) || 'Phone number must be 10 digits',
            ]"
            label="Phone"
            variant="outlined"
            required
            maxlength="10"
            class="mr-4"
          ></v-text-field>
          <!-- age field -->
          <v-text-field
            label="Age"
            variant="outlined"
            v-model.number="user.age"
            :rules="[
              (v) => !!v || 'Age is required',
              (v) => /^\d+$/.test(v) || 'Age must be a number',
            ]"
            required
          ></v-text-field>
        </div>

        <div class="d-flex flex-wrap">
          <!-- role field -->
          <v-select
            label="Role"
            v-model="user.role"
            :items="['user', 'owner']"
            required
            class="mr-4"
          ></v-select>
          <!-- state field -->
          <v-select
            label="State"
            v-model="user.state"
            :items="['active', 'inactive']"
            required
          ></v-select>
        </div>
        <!-- password field -->
        <v-text-field
          v-model="user.password"
          label="Password"
          outlined
          dense
          color="blue"
          autocomplete="false"
          :type="signUpPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="signUpPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="toggleSignUpPasswordVisibility"
          :rules="[
            (v) => !!v || 'Password is required',
            (v) =>
              (v && v.length >= 8) || 'Password must be at least 8 characters',
            (v) =>
              /[A-Z]/.test(v) ||
              'Password must contain at least one uppercase letter',
          ]"
        />
        <!-- confirm password field -->
        <v-text-field
          v-model="user.confirmPassword"
          label="Confirm Password"
          outlined
          dense
          color="blue"
          autocomplete="false"
          :type="confirmPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="
            confirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
          "
          @click:append-inner="toggleConfirmPasswordVisibility"
          :rules="confirmPasswordRules"
        />
      </v-card-text>
      <v-card-actions>
        <!-- button for adding user -->
        <v-btn
          color="primary"
          :disabled="validationErrors || !passwordsMatch || loading"
          @click="addUser(user._id)"
          ><v-progress-circular
            v-if="loading"
            indeterminate
            size="20"
          ></v-progress-circular>
          <span v-if="!loading">Add</span></v-btn
        >
        <v-btn @click="localDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    addDialog: {
      type: Boolean,
    },
  },
  data() {
    //to handle state of dialog and password visibility
    return {
      localDialog: this.addDialog,
      user: {},
      signUpPasswordVisible: false,
      confirmPasswordVisible: false,
      loading: false,
    };
  },
  // watcher for dialog
  watch: {
    addDialog(val) {
      this.localDialog = val;
    },
    localDialog(val) {
      this.$emit("update:addDialog", val);
    },
  },
  computed: {
    //to check validation of input fields
    validationErrors() {
      return (
        !this.user.name ||
        !this.user.email ||
        !this.user.number ||
        !this.user.age
      );
    },
    //to check the password and confirmPassword
    passwordsMatch() {
      return this.user.password === this.user.confirmPassword;
    },
    //rules for the password
    passwordRules() {
      return [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
        (v) =>
          /[A-Z]/.test(v) ||
          "Password must contain at least one uppercase letter",
      ];
    },
    confirmPasswordRules() {
      return [
        (v) => !!v || "Confirm Password is required",
        (v) => v === this.user.password || "Passwords do not match",
      ];
    },
  },
  methods: {
    //method that call action from vuex store
    addUser() {
      this.loading = true;
      const user = this.user;
      this.$store.dispatch("userAdd", { user });
      this.loading = false;
      this.localDialog = false;
    },
    //password visibility
    toggleSignUpPasswordVisibility() {
      this.signUpPasswordVisible = !this.signUpPasswordVisible;
    },
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    },
  },
};
</script>
