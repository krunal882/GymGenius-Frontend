<!-- forgot password page -->
<template>
  <v-card elevation="1" class="forgot-password-card" style="">
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
      <v-btn class="rounded-0" color="black" x-large block dark @click="reset"
        >Reset Password</v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      resetEmail: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    reset() {
      const email = this.resetEmail;
      this.$store.dispatch("forgotPassword", { email: this.resetEmail });
      this.$store.dispatch("forgotPassword", {
        email: email,
        password: this.loginPassword,
      });
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
