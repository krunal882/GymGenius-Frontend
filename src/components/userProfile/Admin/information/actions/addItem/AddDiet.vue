<template>
  <v-dialog v-model="dialog" max-width="1500">
    <v-card>
      <v-card-title> Edit DietPlan </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <div class="d-flex flex-wrap">
            <v-text-field
              v-model="dietPlan.plan_name"
              label="Name"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              v-model="dietPlan.diet_type"
              label="Category"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              v-model="dietPlan.purpose"
              label="Force"
              required
              variant="outlined"
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              v-model="dietPlan.total_days"
              label="Level"
              required
              variant="outlined"
              class="mb-4"
            ></v-text-field>
          </div>
          <div v-for="(meals, index) in dietPlan.meals" :key="'meal-' + index">
            <h4>Meals</h4>
            <div class="d-flex flex-wrap">
              <v-select
                :items="Days"
                v-model="meals.day"
                label="Day"
                required
                variant="outlined"
                class="mr-4 mb-4"
              ></v-select>
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
              <div class="d-flex flex-wrap">
                <v-text-field
                  v-model="foods.name"
                  label="item name"
                  variant="outlined"
                  required
                  class="mr-4 mb-4"
                ></v-text-field>
                <v-text-field
                  v-model="foods.quantity"
                  label="Quantity"
                  variant="outlined"
                  required
                  class="mr-4 mb-4"
                ></v-text-field>
              </div>
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
                <v-text-field
                  v-model="foods.protein"
                  label="Protein (g)"
                  type="number"
                  variant="outlined"
                  required
                  min="0"
                  class="mr-4 mb-4"
                ></v-text-field>
                <v-text-field
                  v-model="foods.carbohydrates"
                  label="Carbohydrates (g)"
                  type="number"
                  variant="outlined"
                  required
                  min="0"
                  class="mr-4 mb-4"
                ></v-text-field>
                <v-text-field
                  v-model="foods.fat"
                  label="Fat (g)"
                  type="number"
                  variant="outlined"
                  min="0"
                  required
                  class="mr-4 mb-4"
                ></v-text-field>
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
          <div class="d-flex flex-wrap">
            <v-btn color="primary" @click="addRow">Add More</v-btn>
            <div class="ml-4"></div>
            <v-btn color="error" @click="removeRow">Remove Item</v-btn>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="add(dietPlan)">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialogOpen: Boolean,
  },
  data() {
    return {
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
      time: ["Breakfast", "Lunch", "Dinnner"],
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
  watch: {
    dialogOpen(value) {
      this.dialog = value;
    },
  },
  methods: {
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
    removeRow() {
      if (this.dietPlan.meals.length > 1) {
        this.dietPlan.meals.pop();
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

    cancel() {
      this.dialog = true;
      this.$refs.form.reset();
    },
    async add(dietPlan) {
      await this.$store.dispatch("addDietPlan", { dietPlan });
    },
  },
};
</script>
