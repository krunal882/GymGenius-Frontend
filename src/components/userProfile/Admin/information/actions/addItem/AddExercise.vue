<!-- this component is for admin to add new exercise information , it provides the dialog with input fields to enter information-->
<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    @click:outside="handleClickOutside"
  >
    <v-card>
      <v-card-title> Add Exercise </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- component for uploading the image -->
          <AdminImgUpload @img-selected="handleImageSelected" />
          <!-- name field -->
          <div class="d-flex flex-wrap">
            <v-text-field
              :rules="Rules"
              v-model="exercise.name"
              label="Name"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- category field -->
            <v-text-field
              :rules="Rules"
              v-model="exercise.category"
              label="Category"
              variant="outlined"
              required
              class="mb-4"
            ></v-text-field>
          </div>
          <!-- force field -->
          <div class="d-flex">
            <v-select
              v-model="exercise.force"
              :items="forceTypes"
              label="Force"
              required
              variant="outlined"
              class="mr-4 mb-4"
            ></v-select>
            <!-- dropdown for exercise level -->
            <v-select
              v-model="exercise.level"
              :items="levelTypes"
              label="Level"
              required
              variant="outlined"
              class="mb-4"
            ></v-select>
          </div>
          <!-- exercise mechanic -->
          <div class="d-flex">
            <v-text-field
              :rules="Rules"
              v-model="exercise.mechanic"
              label="Mechanic"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- exercise equipment needed -->
            <v-text-field
              :rules="Rules"
              v-model="exercise.equipment"
              variant="outlined"
              label="Equipment"
              required
              class="mb-4"
            ></v-text-field>
          </div>
          <div class="d-flex flex-wrap justify-space-between">
            <!-- primary muscles field -->
            <v-text-field
              :rules="Rules"
              v-model="exercise.primaryMuscles"
              label="Primary Muscles"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- secondary Muscles input field -->
            <v-text-field
              v-model="exercise.secondaryMuscles"
              label="Secondary Muscles"
              variant="outlined"
              class="mb-4"
            ></v-text-field>
          </div>
          <!-- instruction field -->
          <v-textarea
            :rules="Rules"
            v-model="exercise.instructions"
            label="Instructions"
            variant="outlined"
            required
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- button to close the dialog and add exercise -->
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="add(exercise)">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import AdminImgUpload from "@/components/common-components/AdminImgUpload.vue";
export default {
  props: {
    dialogOpen: Boolean,
  },
  components: {
    AdminImgUpload,
  },
  data() {
    return {
      image: null,
      forceTypes: ["push", "pull", "static"],
      levelTypes: ["beginner", "intermediate", "expert"],
      dialog: false,
      valid: true,
      exercise: {
        name: "",
        force: "Force",
        level: "beginner",
        mechanic: "",
        equipment: "",
        primaryMuscles: [],
        secondaryMuscles: [],
        instructions: [],
        category: "",
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
    },
  },
  methods: {
    //to handle selected image
    handleImageSelected(image) {
      this.image = image;
    },
    //to close the dialog
    closeDialog() {
      this.$emit("close-dialog");
      this.resetForm();
    },
    //to handle and close dialog on outside click
    handleClickOutside() {
      if (this.dialog) {
        this.closeDialog();
      }
    },
    resetForm() {
      this.exercise = {
        name: "",
        force: "Force",
        level: "beginner",
        mechanic: "",
        equipment: "",
        primaryMuscles: [],
        secondaryMuscles: [],
        instructions: [],
        category: "",
      };
      this.$refs.form.resetValidation();
    },
    //to upload image in cloud storage and call action from vuex store
    async add(exercise) {
      const upload_preset = process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET;
      const cloud_name = process.env.VUE_APP_CLOUDINARY_CLOUD_NAME;
      const uploadData = new FormData();
      uploadData.append("file", this.image);
      if (upload_preset && cloud_name) {
        uploadData.append("upload_preset", upload_preset);
        uploadData.append("cloud_name", cloud_name);
      }
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        uploadData
      );
      exercise.cloudImg = data.url;
      await this.$store.dispatch("addExercise", { exercise });
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
