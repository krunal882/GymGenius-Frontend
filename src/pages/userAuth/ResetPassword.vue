<!-- reset password page -->
<template>
  <v-card elevation="1" class="forgot-password-card">
    <div class="text-center">
      <h1 class="mb-2">Reset Password</h1>
    </div>
    <!-- poster image -->
    <img
      src="../../assets/img/authentication/forgotPassword.png"
      alt="Forgot password image"
      class="forgot-password-image"
    />
    <!-- input fields for the password -->
    <v-form>
      <v-text-field
        v-model="password"
        autocomplete="false"
        label="Enter new Password"
        name="password"
        prepend-inner-icon="mdi-key"
        :append-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="togglePasswordVisibility"
        :type="passwordVisible ? 'text' : 'password'"
        class="rounded-0"
        outlined
        :rules="passwordRules"
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        autocomplete="false"
        label="Confirm new Password"
        name="confirmPassword"
        prepend-inner-icon="mdi-key"
        :append-icon="confirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="toggleConfirmPasswordVisibility"
        :type="confirmPasswordVisible ? 'text' : 'password'"
        class="rounded-0"
        outlined
        :rules="confirmPasswordRules"
      ></v-text-field>
      <v-btn
        class="rounded-0"
        color="black"
        x-large
        block
        dark
        @click="resetPassword"
        >Reset Password</v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
export default {
  // rules for the input fields
  data() {
    return {
      password: "",
      confirmPassword: "",
      rememberMe: false,
      acceptTerms: false,
      passwordVisible: false,
      confirmPasswordVisible: false,
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm password is required",
        (v) => v === this.password || "Passwords do not match",
      ],
      nameRules: [(v) => !!v || "Name is required"],
    };
  },
  methods: {
    // to send req for reset-password
    resetPassword() {
      const resetToken = this.$route.params.token;
      this.$store.dispatch("resetPassword", {
        newPassword: this.password,
        newConfirmPassword: this.confirmPassword,
        resetPasswordToken: resetToken,
      });
    },
    // to toggle password visibility to user
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    },
  },
};
</script>

<style scoped>
.forgot-password-card {
  max-width: 400px;
  margin: auto;
  margin-top: 80px;
  padding: 20px;
  border: 1px solid black;
}

.forgot-password-image {
  display: block;
  margin: 20px auto;
  max-width: 300px;
  height: 350px;
}

.v-text-field.rounded-0 {
  border-radius: 0;
}
</style>
