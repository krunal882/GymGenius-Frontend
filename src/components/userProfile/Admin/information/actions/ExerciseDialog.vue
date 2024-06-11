<!-- this component is for admin to edit exercise information , it provides the dialog with input fields to enter information-->
<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    @click:outside="handleClickOutside"
  >
    <v-card>
      <v-card-title> Edit Exercise </v-card-title>
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
                v-if="imagePath"
                :src="imagePath(exercise.name, exercise.cloudImg)"
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
            <!-- name field -->
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
          <div class="d-flex">
            <!--dropdown for force field -->
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
          <div class="d-flex">
            <!-- exercise mechanic -->
            <v-text-field
              v-model="exercise.mechanic"
              label="Mechanic"
              variant="outlined"
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
      <!-- button to close the dialog and add exercise -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="save(exercise)"
          :disabled="loading"
          ><v-progress-circular
            v-if="loading"
            indeterminate
            size="20"
          ></v-progress-circular>
          <span v-if="!loading">Save</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    exerciseData: Object,
    dialogOpen: Boolean,
  },
  // data includes rules for input fields,image and exercise
  data() {
    return {
      forceTypes: ["push", "pull", "static"],
      levelTypes: ["beginner", "intermediate", "expert"],
      dialog: false,
      valid: true,
      loading: false,
      exercise: {
        name: "",
        force: "Force",
        level: "beginner",
        mechanic: "",
        equipment: "",
        primaryMuscles: "",
        secondaryMuscles: "",
        instructions: "",
        category: "",
        cloudImg: null,
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
      if (value && this.exerciseData) {
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
          this.exercise.cloudImg = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    //to fetch existing image or stored in cloud
    imagePath(exerciseName, cloudImg) {
      if (cloudImg === undefined) {
        const formattedName = exerciseName
          .replace(/ /g, "_")
          .replace(/\//g, "_");
        const imgPath = `../../../../../assets/img/workout-exercise/${formattedName}/images/${exerciseName}0.jpg`;
        return imgPath;
      } else {
        return cloudImg;
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
      this.exercise = { ...this.exerciseData };
    },
    //to upload image in cloud storage and call action from vuex store
    async save(exercise) {
      this.loading = true;
      const upload_preset = process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET;
      const cloud_name = process.env.VUE_APP_CLOUDINARY_CLOUD_NAME;
      const uploadData = new FormData();
      if (this.exercise.cloudImg != null) {
        if (upload_preset && cloud_name) {
          uploadData.append("upload_preset", upload_preset);
          uploadData.append("cloud_name", cloud_name);
        }
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          uploadData
        );
        exercise.cloudImg = data.url;
      }
      exercise.primaryMuscles = exercise.primaryMuscles
        .split(",")
        .map((item) => item.trim());
      exercise.secondaryMuscles = exercise.secondaryMuscles
        .split(",")
        .map((item) => item.trim());
      exercise.instructions = exercise.instructions
        .split(".")
        .map((item) => item.trim());
      await this.$store.dispatch("editExercise", { exercise });
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
