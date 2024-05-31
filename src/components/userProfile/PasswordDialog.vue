<!-- this is child component for the password change functionality  -->
<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <!-- change password dialog with two input fields -->
      <v-card-title>Change Password</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="oldPassword"
          :rules="oldPasswordRules"
          label="Old Password"
          type="password"
          variant="outlined"
          required
        ></v-text-field>
        <v-text-field
          v-model="newPassword"
          :rules="newPasswordRules"
          label="New Password"
          type="password"
          variant="outlined"
          required
        ></v-text-field>
      </v-card-text>
      <!-- save button to save new password -->
      <v-card-actions>
        <v-btn
          color="primary"
          :disabled="isSaveDisabled"
          @click="changePassword"
          >Save</v-btn
        >
        <!-- cancel button to cancel changes  -->
        <v-btn @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // it contains the rules for the password fields and holds data
  data() {
    return {
      dialog: false,
      oldPassword: "",
      newPassword: "",
      oldPasswordRules: [(v) => !!v || "Old password is required"],
      newPasswordRules: [
        (v) => !!v || "New password is required",
        (v) =>
          v !== this.oldPassword ||
          "New password must be different from the old password",
        (v) =>
          /[A-Z]/.test(v) ||
          "Password must contain at least one uppercase letter",
        (v) => /^\S*$/.test(v) || "Password must not contain spaces",
        (v) => v.length >= 6 || "Password must be at least 6 characters long",
      ],
    };
  },
  computed: {
    // to check input validation and disable button
    isSaveDisabled() {
      return (
        this.oldPassword === "" ||
        this.newPassword === "" ||
        this.oldPassword === this.newPassword ||
        !/[A-Z]/.test(this.newPassword) ||
        /\s/.test(this.newPassword) ||
        this.newPassword.length < 6
      );
    },
  },
  methods: {
    //to save new password
    changePassword() {
      if (this.isSaveDisabled) return;
      const userId = this.$store.state.userModule.userId;
      this.$store.dispatch("changePassword", {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        userId,
      });
      this.dialog = false;
    },
  },
};
</script>

<style scoped></style>
