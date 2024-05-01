<template>
  <div>
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
              <v-card-title>Filter Yoga</v-card-title>
              <v-divider></v-divider>

              <v-card-title>Yoga Category</v-card-title>
              <v-select
                v-model="selectedCategory"
                :items="category"
                hint="Core yoga / Seated yoga"
                label="Category"
                multiple
                persistent-hint
              ></v-select>

              <v-divider></v-divider>
              <div
                class="container d-flex justify-center align-item-center pb-5"
              >
                <v-btn
                  color="primary darken-2"
                  class="me-4 tonal"
                  @click="applyFilters"
                >
                  Apply
                </v-btn>
                <v-btn color="error darken-2" @click="handleReset">
                  Clear
                </v-btn>
              </div>
            </v-card>
          </div>
        </div>
      </form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFilters: {
        // Initialize with default filter values if needed
      },
      selectedCategory: [],

      category: [
        "Core Yoga",
        "Chest Opening Yoga ",
        "Seated Yoga",
        "Strengthening Yoga",
        "Standing Yoga",
        "Restorative Yoga",
        "Arm Balance Yoga",
        "Inversion Yoga",
        "Backbend Yoga",
        "Forward Bend Yoga ",
        "Hip Opening Yoga",
      ],
    };
  },
  computed: {},
  methods: {
    applyFilters() {
      const filteredFilters = {};

      if (this.selectedCategory.length > 0) {
        filteredFilters.category = this.selectedCategory;
      }
    
      if (Object.keys(filteredFilters).length > 0) {
        this.$emit("filters-applied", filteredFilters);
      } else {
        console.log("No filters selected.");
      }
    },
    handleReset() {
      // Reset all filter values to defaults
      this.selectedCategory = [];
    },
  },
};
</script>

<style></style>
