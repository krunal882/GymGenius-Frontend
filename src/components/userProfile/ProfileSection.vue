<!-- this component is for displaying user information -->
<template>
  <div class="text-center container">
    <v-avatar
      class="mb-4"
      color="grey-darken-1"
      size="200"
      style="border: 6px solid #64dd17"
    >
      <!-- user profile image -->
      <img
        :src="userAvatarUrl"
        alt="User Avatar"
        v-if="userAvatarUrl"
        :style="{ height: '200px', width: '200px' }"
      />
      <v-icon v-else size="200px">mdi-account-circle</v-icon>
    </v-avatar>

    <!-- to change the user profile -->
    <v-badge color="primary darken-2" overlap @click="openImageUploadDialog">
      <template v-slot:badge>
        <v-progress-circular
          v-if="isLoading"
          indeterminate
          color="white"
          size="20"
        ></v-progress-circular>
        <v-icon
          v-else
          color="white"
          size="50"
          style="font-size: large; cursor: pointer"
          >mdi-pencil</v-icon
        >
      </template>
    </v-badge>
    <v-divider class="mb-10"></v-divider>
    <!-- user information fields -->
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
        <!-- dialog for the change in user information -->
        <v-card-title>Edit Details</v-card-title>
        <v-alert
          v-if="!isEmailValid"
          type="error"
          dismissible
          outlined
          dense
          class="mb-4"
        >
          This email already exists. Please choose another one.
        </v-alert>
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
        <!-- buttons to perform action -->
        <v-card-actions>
          <v-btn
            color="primary"
            :disabled="isSaveDisabled || loading"
            @click="saveChanges"
          >
            <v-progress-circular
              v-if="loading"
              indeterminate
              size="20"
            ></v-progress-circular>
            <span v-if="!loading"> Save</span>
          </v-btn>
          <v-btn @click="dialog = !dialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- password field component -->
    <PasswordDialog ref="passwordDialog" />
    <v-divider class="mb-10"></v-divider>
    <div class="d-flex flex-wrap justify-space-between">
      <!-- account delete option -->
      <div class="d-flex flex-wrap">
        <h6 class="mt-2">Want to delete your account ?</h6>
        <v-btn
          class="ml-10"
          color="error"
          @click="openDeleteDialog"
          :disabled="deleteLoading"
        >
          <span>DELETE</span></v-btn
        >
      </div>
      <!-- Confirmation dialog for deleting the account -->
      <v-dialog v-model="deleteDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Confirm Delete</v-card-title>
          <v-card-text
            >Are you sure you want to delete your account?</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="error" @click="confirmDelete">
              <v-progress-circular
                v-if="deleteLoading"
                indeterminate
                size="20"
              ></v-progress-circular>
              <span v-if="!deleteLoading"> Confirm </span></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- password change option -->
      <div class="d-flex flex-wrap">
        <h6 class="mt-2">Want to change your password ?</h6>
        <v-btn class="ml-10" color="success" @click="openPasswordDialog"
          >CHANGE</v-btn
        >
      </div>
    </div>
    <v-divider class="mb-10"></v-divider>
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="uploadImage"
    />
  </div>
</template>

<script>
import PasswordDialog from "./PasswordDialog.vue";
import Cookies from "js-cookie";
import axios from "axios";
export default {
  components: {
    PasswordDialog,
  },
  //data contains user input fields and the rules
  data() {
    return {
      isLoading: false,
      loading: false,
      deleteLoading: false,
      deleteDialog: false,
      changeLoading: false,
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
      userAvatarUrl: this.$store.state.userModule.userAvatarUrl,
      profileImg: ``,
      debounceTimer: null,
      isEmailValid: true,
    };
  },
  //watcher for the user info and profile image
  watch: {
    "editedUser.email"(newEmail) {
      if (newEmail) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
          this.checkEmailExistence(newEmail);
        }, 1000);
      }
    },
    "$store.state.userModule.userAvatarUrl"(newUrl) {
      this.userAvatarUrl = newUrl;
    },
    "$store.state.userModule.email"(newEmail) {
      this.user.email = newEmail;
    },
    "$store.state.userModule.name"(newName) {
      this.user.name = newName;
    },
    "$store.state.userModule.age"(newAge) {
      this.user.age = newAge;
    },
    "$store.state.userModule.number"(newNum) {
      this.user.number = newNum;
    },
  },
  methods: {
    // to check if there exist same email
    async checkEmailExistence(email) {
      const config = () => {
        const token = Cookies.get("token");
        return {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      };

      const response = await axios.get(
        `http://localhost:3000/auth/filtered?email=${email}`,
        config()
      );
      this.isEmailValid = response.data.length === 0;
    },
    //to save the user information
    async saveChanges() {
      this.loading = true;
      const { name, email, age, number } = this.editedUser;
      const userId = this.$store.state.userModule.userId;
      await this.$store.dispatch("userUpdate", {
        updatedUser: {
          _id: userId,
          name,
          email,
          age: +age,
          number: number,
        },
      });
      this.loading = false;
      this.dialog = false;
    },
    // to delete account make an request to vuex store
    async deleteAccount() {
      this.deleteLoading = true;
      const id = this.$store.state.userModule.userId;
      const role = this.$store.state.userModule.role;
      await this.$store.dispatch("userDelete", { id, role }).then(() => {
        if (this.$store.state.adminModule.userDeleted === true) {
          this.$router.replace("/");
        }
      });
      this.deleteLoading = false;
    },
    // to open the password dialog
    openPasswordDialog() {
      this.$refs.passwordDialog.dialog = true;
    },
    // to open  image upload diagram
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
    // to upload the image
    async uploadImage(event) {
      this.isLoading = true;

      const file = event.target.files[0];
      if (!file) {
        this.loading = false;
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        console.error(
          "Invalid file type. Only JPEG, PNG, and GIF are allowed."
        );
        this.loading = false;
        return;
      }

      const maxSizeInMB = 5;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        console.error("File size exceeds the 5MB limit.");
        this.loading = false;
        return;
      }

      const upload_preset = process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET;
      const cloud_name = process.env.VUE_APP_CLOUDINARY_CLOUD_NAME;
      const uploadData = new FormData();
      uploadData.append("file", file);
      if (upload_preset && cloud_name) {
        uploadData.append("upload_preset", upload_preset);
        uploadData.append("cloud_name", cloud_name);
      }
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        uploadData
      );
      this.saveAvatarUrl(data.url);
      this.isLoading = false;
    },
    saveAvatarUrl(imgUrl) {
      const userId = this.$store.state.userModule.userId;
      this.$store.dispatch("addImage", { userId, imgUrl });
    },
    // New methods for delete confirmation dialog
    openDeleteDialog() {
      this.deleteDialog = true;
    },
    async confirmDelete() {
      await this.deleteAccount();
      this.deleteDialog = false;
    },
  },
  computed: {
    // to make button disabled
    isSaveDisabled() {
      return (
        Object.values(this.editedUser).some((value) => !value) ||
        !this.isEmailValid
      );
    },
  },
  // to fetch user information from the store
  mounted() {
    this.user.name = this.$store.state.userModule.name;
    this.user.email = this.$store.state.userModule.email;
    this.user.age = this.$store.state.userModule.age;
    this.user.number = this.$store.state.userModule.number;
  },
};
</script>
