<template>
  <v-dialog
    v-model="dialog"
    max-width="1500"
    @click:outside="handleClickOutside"
  >
    <v-card>
      <v-card-title> Edit FoodItem </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <div class="d-flex flex-wrap">
            <v-col
              cols="12"
              md="6"
              class="d-flex flex-wrap justify-center align-center"
            >
              <v-img
                v-if="imgPath"
                :src="imgPath(foodItem.name, foodItem.cloudImg)"
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
            <v-text-field
              :rules="Rules"
              v-model="foodItem.name"
              label="Name"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              :rules="Rules"
              v-model="foodItem.category"
              label="Category"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
          </div>
          <h4>Nutritions</h4>
          <div class="d-flex flex-wrap">
            <v-text-field
              v-model="foodItem.nutritions.calories"
              label="Calories"
              type="number"
              variant="outlined"
              min="0"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              v-model="foodItem.nutritions.protein"
              label="Protein (g)"
              type="number"
              variant="outlined"
              required
              min="0"
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              v-model="foodItem.nutritions.carbohydrates"
              label="Carbohydrates (g)"
              type="number"
              variant="outlined"
              required
              min="0"
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              v-model="foodItem.nutritions.fat"
              label="Fat (g)"
              type="number"
              variant="outlined"
              min="0"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              v-model="foodItem.nutritions.fiber"
              label="Fiber (g)"
              type="number"
              min="0"
              variant="outlined"
              required
              class="mb-4 mr-4"
            ></v-text-field>
            <v-text-field
              v-model="foodItem.nutritions.magnesium"
              label="magnesium (mg)"
              type="number"
              min="0"
              variant="outlined"
              required
              class="mb-4 mr-4"
            ></v-text-field>
            <v-text-field
              v-model="foodItem.nutritions.phosphorus"
              label="phosphorus (mg)"
              type="number"
              min="0"
              variant="outlined"
              required
              class="mb-4 mr-4"
            ></v-text-field>
            <v-text-field
              v-model="foodItem.nutritions.vitamin_B6"
              label="vitamin_B6 (mg)"
              type="number"
              min="0"
              variant="outlined"
              required
              class="mb-4 mr-4"
            ></v-text-field>
          </div>

          <h4>Health benefits</h4>

          <div class="d-flex flex-wrap">
            <v-textarea
              :rules="Rules"
              v-model="foodItem.health_benefits"
              label=""
              variant="outlined"
              required
            ></v-textarea>
          </div>
          <h4>culinary uses</h4>

          <div class="d-flex flex-wrap">
            <v-textarea
              :rules="Rules"
              v-model="foodItem.culinary_uses"
              label="uses"
              variant="outlined"
              required
            ></v-textarea>
          </div>
          <h4>varieties</h4>
          <div class="d-flex flex-wrap">
            <v-textarea
              v-model="foodItem.varieties"
              label=""
              variant="outlined"
              required
            ></v-textarea>
          </div>
          <h4>fun facts & trivia</h4>
          <div class="d-flex flex-wrap">
            <v-textarea
              :rules="Rules"
              v-model="foodItem.fun_facts_and_trivia"
              label=""
              variant="outlined"
              required
            ></v-textarea>
          </div>
          <h4>recipes and serving ideas</h4>
          <div
            v-for="(item, index) in foodItem.recipes_and_serving_ideas"
            :key="index"
          >
            <v-text-field
              :rules="Rules"
              v-model="item.name"
              label="recipe Name"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <div class="d-flex flex-wrap">
              <v-textarea
                :rules="Rules"
                v-model="item.ingredients"
                label="ingredients"
                variant="outlined"
                required
              ></v-textarea>
            </div>
            <div class="d-flex flex-wrap">
              <v-textarea
                :rules="Rules"
                v-model="item.instructions"
                label="instructions"
                variant="outlined"
                required
              ></v-textarea>
            </div>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" @click="save(foodItem)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";
export default {
  props: {
    foodItemData: Object,
    dialogOpen: Boolean,
  },
  data() {
    return {
      dialog: false,
      foodItem: {
        name: "",
        category: "",
        health_benefits: "",
        cloudImg: "",
        nutritions: {
          calories: "",
          protein: "",
          fat: "",
          carbohydrates: "",
          fiber: "",
          magnesium: "",
          phosphorus: "",
          vitamin_B6: "",
        },
        culinary_uses: "",
        varieties: "",
        fun_facts_and_trivia: "",
        recipes_and_serving_ideas: {
          name: "",
          ingredients: "",
          instructions: "",
        },
      },
      Rules: [
        (v) => !!v || "Field is Required",
        (v) => (v.trim && !!v.trim()) || "Field cannot contain only spaces",
      ],
    };
  },
  watch: {
    dialogOpen(value) {
      this.dialog = value;
      if (value && this.foodItemData) {
        this.initializeFormFields();
      }
    },
  },

  methods: {
    onFileChange(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.foodItem.cloudImg = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    imgPath(foodItemName, cloudImg) {
      if (cloudImg === undefined) {
        const imgPath = `../../../../../assets/img/foodItem/${foodItemName}.jpg`;
        return imgPath;
      } else {
        return cloudImg;
      }
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    handleClickOutside() {
      if (this.dialog) {
        this.closeDialog();
      }
    },
    initializeFormFields() {
      this.foodItem = { ...this.foodItemData };
    },
    cancel() {
      this.dialog = true;
      this.$refs.form.reset();
    },
    async save(foodItem) {
      const upload_preset = process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET;
      const cloud_name = process.env.VUE_APP_CLOUDINARY_CLOUD_NAME;
      const uploadData = new FormData();
      uploadData.append("file", this.foodItem.cloudImg);
      if (upload_preset && cloud_name) {
        uploadData.append("upload_preset", upload_preset);
        uploadData.append("cloud_name", cloud_name);
      }
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        uploadData
      );
      foodItem.cloudImg = data.url;
      await this.$store.dispatch("editFoodItem", { foodItem });
      this.closeDialog();
    },
  },
};
</script>
