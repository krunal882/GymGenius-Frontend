<template>
  <div class="text-center container">
    <v-avatar
      class="mb-4"
      color="grey-darken-1"
      size="200"
      style="border: 6px solid #64dd17"
    >
      <img :src="userAvatarUrl" alt="User Avatar" v-if="userAvatarUrl" />
      <v-icon v-else size="200px">mdi-account-circle</v-icon>
    </v-avatar>

    <v-badge color="primary darken-2" overlap @click="openImageUploadDialog">
      <template v-slot:badge>
        <v-icon color="white" size="50" style="font-size: large"
          >mdi-pencil</v-icon
        >
      </template>
    </v-badge>
    <v-divider class="mb-10"></v-divider>
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
            :rules="ageRules"
            v-model.number="editedUser.age"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :disabled="isSaveDisabled" @click="saveChanges"
            >Save</v-btn
          >
          <v-btn @click="dialog = !dialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-divider class="mb-10"></v-divider>
    <div class="d-flex flex-wrap just">
      <h6 class="mt-2">Want to delete your account ?</h6>
      <v-btn class="ml-10" color="error" @click="deleteAccount">DELETE</v-btn>
    </div>
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="uploadImage"
    />
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        age: "",
        number: 0,
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
      userAvatarUrl: null,
    };
  },
  methods: {
    saveChanges() {
      this.user.name = this.editedUser.name;
      this.user.email = this.editedUser.email;
      this.user.age = this.editedUser.age;
      this.user.number = this.editedUser.number;
      this.$store.dispatch("userUpdate", {
        email: this.editedUser.email,
        name: this.editedUser.name,
        age: +this.editedUser.age,
        id: this.$store.state.userModule.userId,
        number: +this.editedUser.number,
      });

      this.dialog = false;
    },
    deleteAccount() {
      const id = this.$store.state.userModule.userId;
      const role = this.$store.state.userModule.role;
      this.$store.dispatch("userDelete", { id, role, master: "" }).then(() => {
        if (this.$store.state.userModule.userDeleted) {
          this.$router.replace("/");
        }
      });
    },
    openImageUploadDialog() {
      this.$refs.fileInput.click();
    },
    createAxiosConfig() {
      const token = Cookies.get("token");
      return {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },
    uploadImage(event) {
      const config = this.createAxiosConfig();
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(
          "http://localhost:3000/auth/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            responseType: "blob",
          },
          config
        )
        .then((response) => {
          const blobUrl = URL.createObjectURL(response.data);
          this.userAvatarUrl = blobUrl;
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    },
  },
  computed: {
    isSaveDisabled() {
      return Object.values(this.editedUser).some((value) => !value);
    },
  },
  mounted() {
    this.user.name = this.$store.state.userModule.name;
    this.user.email = this.$store.state.userModule.email;
    this.user.age = this.$store.state.userModule.age;
    this.user.number = this.$store.state.userModule.number;
  },
};
</script>

<style></style>
