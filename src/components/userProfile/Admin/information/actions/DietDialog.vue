<!-- this component is for admin to edit diet plan information , it provides the dialog with input fields to enter information-->
<template>
  <v-dialog
    v-model="dialog"
    max-width="1500"
    @click:outside="handleClickOutside"
  >
    <v-card>
      <v-card-title> Edit DietPlan </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <div class="d-flex flex-wrap">
            <v-col
              cols="12"
              md="6"
              class="d-flex flex-wrap justify-center align-center"
            >
              <!-- component for uploading the image and showing existing image -->

              <v-img
                v-if="imagePath"
                :src="imagePath(dietPlan.src, dietPlan.cloudImg)"
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
              v-model="dietPlan.plan_name"
              label="diet plan name"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- diet type field -->
            <v-text-field
              :rules="Rules"
              v-model="dietPlan.diet_type"
              label="diet plan type"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
          </div>
          <div class="d-flex flex-wrap">
            <!-- purpose field -->
            <v-text-field
              :rules="Rules"
              v-model="dietPlan.purpose"
              label="diet-plan purpose"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- total days field -->
            <v-text-field
              :rules="Rules"
              v-model="dietPlan.total_days"
              label="total days of plan"
              type="number"
              min="1"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
          </div>
          <h4>Meals</h4>
          <!-- field to enter meal information -->
          <div
            class="custom-border p-4 mb-4"
            v-for="(item, index) in dietPlan.meals"
            :key="index"
          >
            <div class="d-flex flex-wrap">
              <!-- to select day -->
              <v-text-field
                :rules="Rules"
                v-model="item.day"
                label="Day"
                variant="outlined"
                required
                class="mr-4 mb-4"
              ></v-text-field>
              <!-- to select meal-type -->
              <v-text-field
                :rules="Rules"
                v-model="item.meal_type"
                label="Meal Type"
                variant="outlined"
                required
                class="mr-4 mb-4"
              ></v-text-field>
            </div>
            <h4>Food Item</h4>
            <div v-for="(food, index) in item.foods" :key="index">
              <!-- to add food item -->
              <div class="d-flex flex-wrap">
                <v-text-field
                  :rules="Rules"
                  v-model="food.name"
                  label="Food Item name"
                  variant="outlined"
                  required
                  class="mr-4 mb-4"
                ></v-text-field>
                <!-- quantity -->
                <v-text-field
                  :rules="Rules"
                  v-model="food.quantity"
                  label="Quantity"
                  variant="outlined"
                  required
                  class="mr-4 mb-4"
                ></v-text-field>
                <!-- calories -->
                <v-text-field
                  v-model="food.calories"
                  label="Calories"
                  type="number"
                  min="0"
                  variant="outlined"
                  required
                  class="mb-4 mr-4"
                ></v-text-field>
                <!-- carbohydrates -->
                <v-text-field
                  v-model="food.carbohydrates"
                  label="carbohydrates (g)"
                  type="number"
                  min="0"
                  variant="outlined"
                  required
                  class="mb-4 mr-4"
                ></v-text-field>
              </div>
              <div class="d-flex flex-wrap">
                <!-- protein -->
                <v-text-field
                  v-model="food.protein"
                  label="protein"
                  type="number"
                  min="0"
                  variant="outlined"
                  required
                  class="mb-4 mr-4"
                ></v-text-field>
                <!-- fat -->
                <v-text-field
                  v-model="food.fat"
                  label="fat"
                  type="number"
                  min="0"
                  variant="outlined"
                  required
                  class="mb-4 mr-4"
                ></v-text-field>
                <!-- fiber -->
                <v-text-field
                  v-model="food.fiber"
                  label="fiber"
                  type="number"
                  min="0"
                  variant="outlined"
                  required
                  class="mb-4 mr-4"
                ></v-text-field>
              </div>
            </div>
          </div>
        </v-form>
      </v-card-text>
      <!-- button to close the dialog and edit dietPlan -->
      <v-card-actions>
        <v-btn color="blue darken-1" @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" @click="save(dietPlan)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";
export default {
  props: {
    dietPlanData: Object,
    dialogOpen: Boolean,
  },
  // data includes rules for input fields,image and days
  data() {
    return {
      dialog: false,
      dietPlan: {
        plan_name: "",
        diet_type: "",
        purpose: "",
        total_days: null,
        cloudImg: "",
        meals: [
          {
            day: "",
            meal_type: "",
            foods: [
              {
                name: "",
                quantity: "",
                calories: "",
                protein: "",
                fat: "",
                carbohydrates: "",
                fiber: "",
              },
            ],
          },
        ],
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
      if (value && this.dietPlanData) {
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
    imagePath(dietName, cloudImg) {
      if (cloudImg === undefined) {
        return `../../../../../assets/img/dietPlan/${dietName}`;
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
      this.dietPlan = { ...this.dietPlanData };
    },
    //to upload image in cloud storage and call action from vuex store
    async save(dietPlan) {
      const upload_preset = process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET;
      const cloud_name = process.env.VUE_APP_CLOUDINARY_CLOUD_NAME;
      const uploadData = new FormData();
      uploadData.append("file", this.dietPlan.cloudImg);
      if (upload_preset && cloud_name) {
        uploadData.append("upload_preset", upload_preset);
        uploadData.append("cloud_name", cloud_name);
      }
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        uploadData
      );
      dietPlan.cloudImg = data.url;

      const id = dietPlan._id;
      dietPlan.total_days = +dietPlan.total_days;
      await this.$store.dispatch("editDietPlan", { id, dietPlan });
      this.closeDialog();
    },
  },
};
</script>
<style scoped>
.custom-border {
  border: 1px solid #333;
  padding: 1rem;
}
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
