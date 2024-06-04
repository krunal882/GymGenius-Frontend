<!-- this component is for admin to edit yoga information , it provides the dialog with input fields to enter information-->
<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    @click:outside="handleClickOutside"
  >
    <v-card>
      <v-card-title> Edit Yoga-pose </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <div class="d-flex flex-wrap">
            <v-col
              cols="12"
              md="6"
              class="d-flex flex-wrap justify-center align-center"
            >
              <!-- component for uploading the image and showing existing image -->
              <v-img
                v-if="yoga.url_png"
                :src="yoga.url_png"
                width="200"
                height="200"
                class="image-preview"
              ></v-img>
              <div v-else class="image-placeholder"></div>
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                label="Upload New Image"
                prepend-icon="mdi-camera"
                variant="filled"
                @change="onFileChange"
                accept="image/*"
              ></v-file-input>
            </v-col>
          </div>
          <div class="d-flex flex-wrap">
            <!-- category name field -->
            <v-text-field
              v-model="yoga.category_name"
              label="category"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- yoga english name field -->
            <v-text-field
              :rules="Rules"
              v-model="yoga.english_name"
              label="english_name"
              variant="outlined"
              required
              class="mb-4"
            ></v-text-field>
          </div>
          <!-- yoga category description field -->
          <v-textarea
            :rules="Rules"
            v-model="yoga.category_description"
            label="category_description"
            variant="outlined"
            required
            class="mb-4"
          ></v-textarea>
          <div class="d-flex">
            <!-- yoga sanskrit name field -->
            <v-text-field
              v-model="yoga.sanskrit_name"
              label="sanskrit name"
              required
              variant="outlined"
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- yoga sanskrit adapted  name field -->
            <v-text-field
              v-model="yoga.sanskrit_name_adapted"
              label="sanskrit name adapted"
              required
              variant="outlined"
              class="mb-4"
            ></v-text-field>
          </div>
          <!-- yoga translation name field -->
          <v-text-field
            v-model="yoga.translation_name"
            label="translation_name"
            required
            variant="outlined"
            class="mb-4"
          ></v-text-field>
          <!-- yoga pose description field -->
          <v-textarea
            :rules="Rules"
            v-model="yoga.pose_description"
            label="pose description"
            variant="outlined"
            required
            class="mr-4 mb-4"
          ></v-textarea>
          <!-- yoga pose benefits field -->
          <v-textarea
            :rules="Rules"
            v-model="yoga.pose_benefits"
            label="pose benefits"
            variant="outlined"
            required
            class="mr-4 mb-4"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- button to close the dialog and edit yoga -->
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save(yoga)"
          ><v-progress-circular
            v-if="loading"
            indeterminate
            color="white"
            size="20"
          ></v-progress-circular>
          <span v-if="!loading">Save</span></v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    yogaData: Object,
    dialogOpen: Boolean,
  },
  // data includes rules for input fields,image and yoga
  data() {
    return {
      dialog: false,
      valid: true,
      loading: false,
      yoga: {
        category_name: "",
        category_description: "",
        english_name: "",
        sanskrit_name_adapted: "",
        sanskrit_name: "",
        translation_name: "",
        pose_description: "",
        pose_benefits: "",
        url_png: "",
      },
      Rules: [
        (v) => !!v || "Field is Required",
        (v) => (v.trim && !!v.trim()) || "Field cannot contain only spaces",
      ],
    };
  },
  // watcher for dialog
  watch: {
    dialogOpen(value) {
      this.dialog = value;
      if (value && this.yogaData) {
        this.initializeFormFields();
      }
    },
  },
  methods: {
    //to handle selected image
    onFileChange(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.yoga.url_png = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    //to close the dialog
    closeDialog() {
      this.$emit("close-dialog");
    },
    //to handle and close dialog on outside click
    handleClickOutside() {
      if (this.dialog) {
        this.closeDialog();
      }
    },
    initializeFormFields() {
      this.yoga = { ...this.yogaData };
    },
    //to upload image in cloud storage and call action from vuex store
    async save(yoga) {
      this.loading = true;
      const upload_preset = process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET;
      const cloud_name = process.env.VUE_APP_CLOUDINARY_CLOUD_NAME;
      const uploadData = new FormData();
      uploadData.append("file", this.yoga.url_png);
      if (upload_preset && cloud_name) {
        uploadData.append("upload_preset", upload_preset);
        uploadData.append("cloud_name", cloud_name);
      }
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        uploadData
      );
      yoga.url_png = data.url;
      await this.$store.dispatch("editYoga", { yoga });
      this.loading = false;
      this.closeDialog();
    },
  },
};
</script>
<style scoped>
.image-placeholder {
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
}
.image-preview {
  object-fit: contain;
}
</style>
