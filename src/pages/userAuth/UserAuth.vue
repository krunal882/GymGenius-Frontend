<template enter-class="auth">
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Login in to Your Account</h4>
                    <h6 class="text-center grey--text">
                      Log in to your account so you can continue
                      <br />with your fitness journey
                    </h6>
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
                          type="password"
                          :rules="passwordRules"
                        />
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox
                              v-model="rememberMe"
                              label="Remember Me"
                              class="mt-n1"
                              color="blue"
                            />
                          </v-col>
                          <v-col cols="12" sm="5">
                            <span class="caption text-blue"
                              ><router-link to="/forgotPassword"
                                >Forgot password ?</router-link
                              ></span
                            >
                          </v-col>
                        </v-row>
                        <v-btn color="blue" dark block tile @click="login"
                          >Log in</v-btn
                        >

                        <h5 class="text-center grey--text mt-4 mb-3">
                          Or Log in using
                        </h5>
                        <div
                          class="d-flex justify-space-between align-center mx-10 mb-16"
                        >
                          <v-btn
                            depressed
                            outlined
                            color="white"
                            @click="
                              openPopup('https://www.google.com', 'Google')
                            "
                          >
                            <v-icon color="red" size="30px"
                              >mdi mdi-google</v-icon
                            >
                          </v-btn>
                          <v-btn
                            depressed
                            outlined
                            color="white"
                            @click="
                              openPopup('https://www.facebook.com', 'Facebook')
                            "
                          >
                            <v-icon color="blue" size="30px"
                              >mdi mdi-facebook</v-icon
                            >
                          </v-btn>
                          <v-btn
                            depressed
                            outlined
                            color="white"
                            @click="
                              openPopup('https://www.twitter.com', 'Twitter')
                            "
                          >
                            <v-icon color="light-blue lighten-3" size="30px"
                              >mdi mdi-twitter</v-icon
                            >
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
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
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Sign Up for an Account</h4>
                    <h6 class="text-center grey--text">
                      Let's get you all set up so you can start your
                      <br />
                      Fitness journey
                    </h6>
                    <v-row align="center" justify="center">
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
                    </v-row>
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
                      v-model="signUpPassword"
                      label="Password"
                      outlined
                      dense
                      color="blue"
                      autocomplete="false"
                      type="password"
                      :rules="passwordRules"
                    />
                    <v-row>
                      <v-col cols="12" sm="7">
                        <v-checkbox
                          v-model="acceptTerms"
                          label="I Accept AAE"
                          class="mt-n1"
                          color="blue"
                        />
                      </v-col>
                      <v-col cols="12" sm="5">
                        <span class="caption blue--text ml-n4"
                          >Terms &Conditions</span
                        >
                      </v-col>
                    </v-row>
                    <v-btn color="blue" dark block tile @click="signUp"
                      >Sign up</v-btn
                    >

                    <h5 class="text-center grey--text mt-4 mb-3">
                      Or Sign up using
                    </h5>
                    <div
                      class="d-flex justify-space-between align-center mx-10 mb-11"
                    >
                      <v-btn
                        depressed
                        outlined
                        color="white"
                        @click="openPopup('https://www.google.com', 'Google')"
                      >
                        <v-icon color="red" size="30px">mdi mdi-google</v-icon>
                      </v-btn>
                      <v-btn
                        depressed
                        outlined
                        color="white"
                        @click="
                          openPopup('https://www.facebook.com', 'Facebook')
                        "
                      >
                        <v-icon color="blue" size="30px"
                          >mdi mdi-facebook</v-icon
                        >
                      </v-btn>
                      <v-btn
                        depressed
                        outlined
                        color="white"
                        @click="openPopup('https://www.twitter.com', 'Twitter')"
                      >
                        <v-icon color="light-blue lighten-3" size="30px"
                          >mdi mdi-twitter</v-icon
                        >
                      </v-btn>
                    </div>
                  </v-card-text>
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
export default {
  data() {
    return {
      step: 1,
      loginEmail: "",
      loginPassword: "",
      rememberMe: false,
      fullName: "",
      signUpEmail: "",
      signUpPassword: "",
      acceptTerms: false,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
      ],
      nameRules: [(v) => !!v || "Name is required"],
    };
  },
  methods: {
    openPopup(url, provider) {
      const width = 600;
      const height = 400;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      const options = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`;
      window.open(url, `${provider}Window`, options);
    },

    login() {
      // Perform login authentication
    },
    signUp() {
      // Perform sign up action
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
