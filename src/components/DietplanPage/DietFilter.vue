<template>
  <v-container
    class="ml-10"
    style="width: 332px; margin-right: 0px; margin-top: 25px"
  >
    <form @submit.prevent="submit">
      <div class="row">
        <div
          class="col-md-3 col-sm-3 col-xs-12"
          style="width: 300px; margin-right: 0px"
        >
          <v-card outlined>
            <v-card-title>Filter DietPlan</v-card-title>
            <v-divider></v-divider>

            <v-card-title>Diet Plan Type</v-card-title>
            <v-select
              v-model="selectedCategory"
              :items="type"
              hint="Veg / Non-veg / Mixed"
              label="Diet Type"
              persistent-hint
            ></v-select>

            <v-select
              v-model="selectedItem"
              :items="purpose"
              hint="Weight loss / Muscle Gain"
              label="Purpose"
              multiple
              persistent-hint
            ></v-select>

            <v-divider></v-divider>

            <v-divider></v-divider>
            <div class="container d-flex justify-center align-item-center pb-5">
              <v-btn
                color="primary darken-2"
                class="me-4 tonal"
                @click="applyFilters"
              >
                Apply
              </v-btn>
              <v-btn color="error darken-2" @click="handleReset"> Clear </v-btn>
            </div>
          </v-card>
        </div>
      </div>
    </form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: [],
      selectedCategory: null,
      type: ["Vegetarian", "Mixed", "Non-Vegetarian"],
      purpose: ["Weight Loss", "Muscle Gain", "Weight Gain"],
      time: ["Breakfast", "Lunch", "Dinner"],
    };
  },
  computed: {},

  methods: {
    applyFilters() {
      const filteredFilters = {};

      if (this.selectedCategory && this.selectedCategory.length > 0) {
        filteredFilters.category = this.selectedCategory;
      }

      if (this.selectedItem && this.selectedItem.length > 0) {
        filteredFilters.purpose = this.selectedItem;
      }

      if (Object.keys(filteredFilters).length > 0) {
        this.$emit("filters-applied", filteredFilters);
      } else {
        console.log("No filters selected.");
      }
    },
    handleReset() {
      // Reset all filter values to defaults
      this.selectedCategory = null;
      this.selectedItem = [];
    },
  },
};
</script>

<style></style>
