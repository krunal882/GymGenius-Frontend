<template>
  <v-dialog
    v-model="dialog"
    max-width="1500"
    @click:outside="handleClickOutside"
  >
    <v-card>
      <v-card-title> Add FoodItem </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <AdminImgUpload @img-selected="handleImageSelected" />

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
        <v-btn color="blue darken-1" @click="add(foodItem)">Add</v-btn>
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
      dialog: false,
      foodItem: {
        name: "",
        category: "",
        health_benefits: "",
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
        recipes_and_serving_ideas: [
          {
            name: "",
            ingredients: "",
            instructions: "",
          },
        ],
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
    },
  },

  methods: {
    handleImageSelected(image) {
      this.image = image;
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    handleClickOutside() {
      if (this.dialog) {
        this.closeDialog();
      }
    },

    cancel() {
      this.dialog = true;
      this.$refs.form.reset();
    },
    async add(foodItem) {
      const upload_preset = "gymgenius";
      const cloud_name = "dflto7hyt";
      const uploadData = new FormData();
      uploadData.append("file", this.image);
      if (upload_preset && cloud_name) {
        uploadData.append("upload_preset", upload_preset);
        uploadData.append("api", "538769229598131");
        uploadData.append("cloud_name", cloud_name);
      }
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        uploadData
      );
      foodItem.cloudImg = data.url;
      await this.$store.dispatch("addFoodItem", { foodItem });
      this.closeDialog();
    },
  },
};
</script>
