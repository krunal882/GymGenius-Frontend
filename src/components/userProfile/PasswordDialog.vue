<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
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
      <v-card-actions>
        <v-btn
          color="primary"
          :disabled="isSaveDisabled"
          @click="changePassword"
          >Save</v-btn
        >
        <v-btn @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
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
