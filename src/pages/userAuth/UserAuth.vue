<!-- login and signUp page -->
<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window v-model="step">
            <!-- Login Step -->
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-form ref="loginForm" v-model="loginFormValid">
                    <v-card-text class="mt-12">
                      <h4 class="text-center">Login to Your Account</h4>
                      <h6 class="text-center grey--text">
                        Log in to your account so you can continue<br />with
                        your fitness journey
                      </h6>

                      <!-- input fields for the login -->

                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <v-text-field
                            v-model="loginEmail"
                            prepend-inner-icon="mdi-email"
                            label="Email"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            class="mt-16"
                            :rules="emailRules"
                          />
                          <v-text-field
                            v-model="loginPassword"
                            prepend-inner-icon="mdi-key"
                            label="Password"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            :type="loginPasswordVisible ? 'text' : 'password'"
                            :append-inner-icon="
                              loginPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
                            "
                            @click:append-inner="toggleLoginPasswordVisibility"
                            :rules="passwordRules"
                          />
                          <v-row>
                            <v-col class="mb-2">
                              <span class="caption text-blue">
                                <router-link to="/forgotPassword"
                                  >Forgot password ?</router-link
                                >
                              </span>
                            </v-col>
                          </v-row>
                          <v-btn
                            color="blue"
                            dark
                            block
                            tile
                            @click="login"
                            :disabled="!loginFormValid || loading"
                          >
                            <v-progress-circular
                              v-if="loading"
                              indeterminate
                              color="white"
                              size="20"
                            ></v-progress-circular>
                            <span v-if="!loading"> Log in </span></v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-form>
                </v-col>
                <v-col class="main" cols="12" md="6">
                  <div style="text-align: center; padding: 220px 0">
                    <v-card-text class="text-white mt-6">
                      <h2 class="text-center">Don't Have an Account Yet?</h2>
                      <h4 class="text-center mt-6">
                        Let's get you all set up so you can start your fitness
                        journey
                      </h4>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step++">SIGN UP</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <!-- Sign Up Step -->
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6" class="main">
                  <div style="text-align: center; padding: 220px 0">
                    <v-card-text class="text-white mt-6">
                      <h2 class="text-center">Already Signed up?</h2>
                      <h4 class="text-center mt-6">
                        Log in to your account so you can continue with your
                        fitness journey
                      </h4>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step--">Log in</v-btn>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <v-form ref="signUpForm" v-model="signUpFormValid">
                    <v-card-text class="mt-12">
                      <h4 class="text-center">Sign Up for an Account</h4>
                      <h6 class="text-center grey--text">
                        Let's get you all set up so you can start your<br />Fitness
                        journey
                      </h6>

                      <!-- input fields for the signup process -->

                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <v-text-field
                            v-model="fullName"
                            label="Full Name"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            class="mt-4"
                            :rules="nameRules"
                          />
                          <v-text-field
                            v-model="signUpEmail"
                            label="Email"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            :rules="emailRules"
                          />
                          <v-text-field
                            v-model="age"
                            label="Age"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            :rules="ageRules"
                            type="number"
                          />
                          <v-text-field
                            v-model="number"
                            label="Number"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            :rules="numberRules"
                          />
                          <v-text-field
                            v-model="signUpPassword"
                            label="Password"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            :type="signUpPasswordVisible ? 'text' : 'password'"
                            :append-inner-icon="
                              signUpPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
                            "
                            @click:append-inner="toggleSignUpPasswordVisibility"
                            :rules="passwordRules"
                          />
                          <v-text-field
                            v-model="confirmPassword"
                            label="Confirm Password"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            :type="confirmPasswordVisible ? 'text' : 'password'"
                            :append-inner-icon="
                              confirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
                            "
                            @click:append-inner="
                              toggleConfirmPasswordVisibility
                            "
                            :rules="confirmPasswordRules"
                          />
                          <v-btn
                            color="blue"
                            dark
                            block
                            tile
                            @click="signUp"
                            :disabled="!signUpFormValid || loading"
                          >
                            <v-progress-circular
                              v-if="loading"
                              indeterminate
                              color="white"
                              size="20"
                            ></v-progress-circular>
                            <span v-if="!loading">Sign up</span></v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-form>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    // input fields value holder and rules for the input data
    return {
      step: 1,
      loginEmail: "",
      age: null,
      number: null,
      loginPassword: "",
      loginPasswordVisible: false,
      signUpPasswordVisible: false,
      confirmPasswordVisible: false,
      confirmPassword: "",
      rememberMe: false,
      fullName: "",
      signUpEmail: "",
      signUpPassword: "",
      acceptTerms: false,
      loading: false,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        (v) => !/\s/.test(v) || "Spaces are not allowed",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
        (v) =>
          /[A-Z]/.test(v) ||
          "Password must contain at least one uppercase letter",
        (v) => !/\s/.test(v) || "Spaces are not allowed",
      ],
      nameRules: [(v) => !!v || "Name is required"],
      ageRules: [
        (v) => v !== null || "Age is required",
        (v) => /^[1-9][0-9]*$/.test(v) || "Age must be a number",
        (v) => v >= 12 || "Age must be at least 12 years",
        (v) => !/\s/.test(v) || "Spaces are not allowed",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm Password is required",
        (v) => v === this.signUpPassword || "Passwords do not match",
        (v) => !/\s/.test(v) || "Spaces are not allowed",
      ],
      numberRules: [
        (v) => !!v || "Number is required",
        (v) => /^[0-9]+$/.test(v) || "Number must contain only digits",
        (v) => v.length === 10 || "Number must be 10 digits",
        (v) => !/\s/.test(v) || "Spaces are not allowed",
      ],
      loginFormValid: false,
      signUpFormValid: false,
    };
  },
  methods: {
    // to login request
    async login() {
      this.loading = true;
      if (this.$refs.loginForm.validate()) {
        await this.$store.dispatch("userLogin", {
          email: this.loginEmail,
          password: this.loginPassword,
        });
        const token = Cookies.get("token");
        if (token && token !== undefined) {
          this.$router.replace("/GymGenius");
        }
      }
      this.loading = false;
    },

    // to signup request
    async signUp() {
      this.loading = true;
      if (this.$refs.signUpForm.validate()) {
        await this.$store.dispatch("userSignup", {
          email: this.signUpEmail,
          password: this.signUpPassword,
          name: this.fullName,
          age: +this.age,
          number: this.number,
          confirmPassword: this.confirmPassword,
        });
        const token = Cookies.get("token");
        if (token && token !== undefined) {
          this.$router.replace("/GymGenius");
        }
      }
      this.loading = false;
    },

    // to toggle password visibility
    toggleLoginPasswordVisibility() {
      this.loginPasswordVisible = !this.loginPasswordVisible;
    },
    toggleSignUpPasswordVisibility() {
      this.signUpPasswordVisible = !this.signUpPasswordVisible;
    },
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    },
  },
};
</script>

<style scoped>
.main {
  background-image: url("@/assets/contact_form.png");
  background-size: cover;
}
.auth {
  background-image: url("@/assets/img/hero-bg.png");
  background-size: cover;
}
</style>
