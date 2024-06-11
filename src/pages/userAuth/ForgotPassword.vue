<!-- forgot password page -->
<template>
  <v-card elevation="1" class="forgot-password-card">
    <div class="text-center">
      <h1 class="mb-2">Forgot Password</h1>
      <p>
        We will send a password reset link to the email address associated with
        your account.
      </p>
    </div>
    <img
      src="../../assets/img/authentication/forgotPassword.png"
      alt="Forgot password image"
      class="forgot-password-image"
    />
    <v-form>
      <v-text-field
        v-model="resetEmail"
        label="Enter your email address"
        autocomplete="false"
        name="email"
        prepend-inner-icon="mdi-email"
        type="email"
        class="rounded-0"
        outlined
        :rules="emailRules"
      ></v-text-field>
      <v-btn
        class="rounded-0"
        color="black"
        x-large
        block
        dark
        @click="reset"
        :disabled="loading"
      >
        <template v-if="loading">
          <v-progress-circular
            indeterminate
            color="white"
            size="20"
          ></v-progress-circular>
        </template>
        <template v-else> Reset Password </template>
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      resetEmail: "",
      loading: false,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    async reset() {
      this.loading = true;
      try {
        await this.$store.dispatch("forgotPassword", {
          email: this.resetEmail,
        });
      } catch (error) {
        console.error("Error sending reset email:", error);
      } finally {
        this.loading = false;
      }
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
  height: 300px;
}

.v-text-field.rounded-0 {
  border-radius: 0;
}
</style>
