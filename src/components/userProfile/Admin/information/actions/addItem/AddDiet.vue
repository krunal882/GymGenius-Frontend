<!-- this component is for admin to add new diet plan information , it provides the dialog with input fields to enter information-->
<template>
  <v-dialog v-model="dialog" max-width="1500">
    <v-card>
      <v-card-title> Add DietPlan </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <!-- component for uploading the image -->
          <AdminImgUpload @img-selected="handleImageSelected" />
          <!-- name field -->
          <div class="d-flex flex-wrap">
            <v-text-field
              v-model="dietPlan.plan_name"
              label="Name"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- diet type field -->
            <v-text-field
              v-model="dietPlan.diet_type"
              label="Diet type"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- purpose field -->
            <v-text-field
              v-model="dietPlan.purpose"
              label="Purpose"
              required
              variant="outlined"
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- total days field -->
            <v-text-field
              v-model="dietPlan.total_days"
              label="Total Days "
              required
              variant="outlined"
              type="number"
              class="mb-4"
            ></v-text-field>
          </div>
          <!-- field to enter meal information -->
          <div v-for="(meals, index) in dietPlan.meals" :key="'meal-' + index">
            <h4>Meals</h4>
            <div class="d-flex flex-wrap">
              <!-- to select day -->
              <v-select
                :items="Days"
                v-model="meals.day"
                label="Day"
                required
                variant="outlined"
                class="mr-4 mb-4"
              ></v-select>
              <!-- to select meal-type -->
              <v-select
                :items="time"
                v-model="meals.meal_type"
                label="meal time"
                variant="outlined"
                required
                class="mr-4 mb-4"
              ></v-select>
            </div>
            <div
              v-for="(foods, foodIndex) in meals.foods"
              :key="'food-' + foodIndex"
            >
              <h4>Food Item</h4>
              <!-- to add food item -->
              <div class="d-flex flex-wrap">
                <v-text-field
                  v-model="foods.name"
                  label="item name"
                  variant="outlined"
                  required
                  class="mr-4 mb-4"
                ></v-text-field>
                <!-- quantity -->
                <v-text-field
                  v-model="foods.quantity"
                  label="Quantity"
                  variant="outlined"
                  required
                  class="mr-4 mb-4"
                ></v-text-field>
              </div>
              <!-- calories -->
              <div class="d-flex flex-wrap">
                <v-text-field
                  v-model="foods.calories"
                  label="Calories"
                  type="number"
                  variant="outlined"
                  min="0"
                  required
                  class="mr-4 mb-4"
                ></v-text-field>
                <!-- protein -->
                <v-text-field
                  v-model="foods.protein"
                  label="Protein (g)"
                  type="number"
                  variant="outlined"
                  required
                  min="0"
                  class="mr-4 mb-4"
                ></v-text-field>
                <!-- carbohydrates -->
                <v-text-field
                  v-model="foods.carbohydrates"
                  label="Carbohydrates (g)"
                  type="number"
                  variant="outlined"
                  required
                  min="0"
                  class="mr-4 mb-4"
                ></v-text-field>
                <!-- fat -->
                <v-text-field
                  v-model="foods.fat"
                  label="Fat (g)"
                  type="number"
                  variant="outlined"
                  min="0"
                  required
                  class="mr-4 mb-4"
                ></v-text-field>
                <!-- fiber -->
                <v-text-field
                  v-model="foods.fiber"
                  label="Fiber (g)"
                  type="number"
                  min="0"
                  variant="outlined"
                  required
                  class="mb-4"
                ></v-text-field>
              </div>
            </div>
          </div>
          <!-- buttons for adding and removing the field -->
          <div class="d-flex flex-wrap">
            <v-btn color="primary" @click="addRow">Add More</v-btn>
            <div class="ml-4"></div>
            <v-btn color="error" @click="removeRow">Remove Item</v-btn>
          </div>
        </v-form>
      </v-card-text>
      <!-- button to close the dialog and add dietPlan -->
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="add(dietPlan)">Add</v-btn>
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
    // data includes rules for input fields and days
    return {
      image: null,
      dialog: false,
      rows: 1,
      Days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      time: ["Breakfast", "Lunch", "Dinner"],
      dietPlan: {
        plan_name: "",
        diet_type: "",
        purpose: "",
        total_days: null,
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
    },
  },
  methods: {
    //to handle selected image
    handleImageSelected(image) {
      this.image = image;
    },
    //to add extra row for foodItem
    addRow() {
      this.dietPlan.meals.push({
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
      });
    },
    //to remove extra row for foodItem
    removeRow() {
      if (this.dietPlan.meals.length > 1) {
        this.dietPlan.meals.pop();
      }
    },
    //to close the dialog
    closeDialog() {
      this.dialog = false;
      this.$emit("close-dialog");
    },
    //to handle and close dialog on outside click
    handleClickOutside() {
      if (this.dialog) {
        this.closeDialog();
      }
    },
    //to upload image in cloud storage and call action from vuex store
    async add(dietPlan) {
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
      dietPlan.cloudImg = data.url;
      await this.$store.dispatch("addDietPlan", { dietPlan });
      this.closeDialog();
    },
  },
};
</script>
