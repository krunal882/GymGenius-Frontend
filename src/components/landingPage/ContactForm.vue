<template>
  <container class="bg-light py-3 py-md-5">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
          <h3 class="fs-6 text-secondary mb-2 text-uppercase text-center">
            Get in Touch
          </h3>
          <h2 class="display-5 mb-4 mb-md-5 text-center">
            We're always on the lookout to work with new clients.
          </h2>
          <hr class="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row gy-3 gy-md-4 gy-lg-0 align-items-xl-center">
        <div class="col-12 col-lg-6">
          <img
            class="img-fluid rounded image-hover-effect"
            loading="lazy"
            src="../../assets/contact_form.png"
            alt="Get in Touch"
          />
        </div>
        <v-col cols="12" lg="6">
          <v-row justify="center">
            <v-col cols="12" xl="11">
              <v-card class="bg-white border rounded shadow-sm">
                <v-form @submit.prevent="submitForm">
                  <v-card-text class="p-4 p-xl-5">
                    <v-row class="gy-4 gy-xl-5">
                      <v-col cols="12">
                        <v-text-field
                          v-model="fullName"
                          label="Full Name"
                          :rules="fullNameRules"
                          variant="outlined"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="email"
                          label="Email"
                          variant="outlined"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="phoneNumber"
                          label="Phone Number"
                          variant="outlined"
                          type="tel"
                          :rules="phoneNumberRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="subject"
                          label="Subject"
                          variant="outlined"
                          :rules="subjectRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="message"
                          label="Message"
                          rows="3"
                          variant="outlined"
                          :rules="messageRules"
                          required
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-btn color="primary" class="btn-lg" type="submit">
                          Get in touch
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </div>
    </div>
  </container>
</template>

<script>
export default {
  data() {
    return {
      fullName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
      fullNameRules: [
        (v) => !!v || "Full name is required",
        (v) =>
          (v && v.length <= 100) || "Name must be less than 100 characters",
      ],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Invalid email",
      ],
      phoneNumberRules: [
        (v) => !!v || "Phone number is required",
        (v) => (v && /^\d{10}$/g.test(v)) || "Invalid phone number",
      ],
      subjectRules: [
        (v) => !!v || "Subject is required",
        (v) =>
          (v && v.length <= 50) || "Subject must be less than 50 characters",
      ],
      messageRules: [
        (v) => !!v || "Message is required",
        (v) =>
          (v && v.length <= 500) || "Message must be less than 500 characters",
      ],
    };
  },
  methods: {
    submitForm() {},
  },
};
</script>

<style scoped>
.image-hover-effect:hover {
  transform: scale(0.9);
}
</style>
