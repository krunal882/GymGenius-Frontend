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
            <v-text-field
              :rules="Rules"
              v-model="dietPlan.plan_name"
              label="diet plan name"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
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
            <v-text-field
              :rules="Rules"
              v-model="dietPlan.purpose"
              label="diet-plan purpose"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
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
          <div
            class="custom-border p-4 mb-4"
            v-for="(item, index) in dietPlan.meals"
            :key="index"
          >
            <div class="d-flex flex-wrap">
              <v-text-field
                :rules="Rules"
                v-model="item.day"
                label="Day"
                variant="outlined"
                required
                class="mr-4 mb-4"
              ></v-text-field>
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
              <div class="d-flex flex-wrap">
                <v-text-field
                  :rules="Rules"
                  v-model="food.name"
                  label="Food Item name"
                  variant="outlined"
                  required
                  class="mr-4 mb-4"
                ></v-text-field>
                <v-text-field
                  :rules="Rules"
                  v-model="food.quantity"
                  label="Quantity"
                  variant="outlined"
                  required
                  class="mr-4 mb-4"
                ></v-text-field>
                <v-text-field
                  v-model="food.calories"
                  label="Calories"
                  type="number"
                  min="0"
                  variant="outlined"
                  required
                  class="mb-4 mr-4"
                ></v-text-field>
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
                <v-text-field
                  v-model="food.protein"
                  label="protein"
                  type="number"
                  min="0"
                  variant="outlined"
                  required
                  class="mb-4 mr-4"
                ></v-text-field>
                <v-text-field
                  v-model="food.fat"
                  label="fat"
                  type="number"
                  min="0"
                  variant="outlined"
                  required
                  class="mb-4 mr-4"
                ></v-text-field>
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
      <v-card-actions>
        <v-btn color="blue darken-1" @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" @click="save(dietPlan)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dietPlanData: Object,
    dialogOpen: Boolean,
  },
  data() {
    return {
      dialog: false,
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
      if (value && this.dietPlanData) {
        this.initializeFormFields();
      }
    },
  },

  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    handleClickOutside() {
      if (this.dialog) {
        this.closeDialog();
      }
    },
    initializeFormFields() {
      this.dietPlan = { ...this.dietPlanData };
      console.log(this.dietPlan);
    },
    cancel() {
      this.dialog = true;
      this.$refs.form.reset();
    },
    async save(dietPlan) {
      const id = dietPlan._id;
      dietPlan.total_days = +dietPlan.total_days;
      await this.$store.dispatch("editDietPlan", { id, dietPlan });
    },
  },
};
</script>
<style scoped>
.custom-border {
  border: 1px solid #333;
  padding: 1rem;
}
</style>
