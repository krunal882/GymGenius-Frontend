<!-- this filter component provides the filter functionality for the products -->
<!-- it provides filter for the high-to-low , low-to-high and price of product -->
<template>
  <div class="d-flex justify-content-center align-items-center">
    <v-container class="ml-1" style="width: 332px; padding-bottom: 15px">
      <div class="d-flex align-items-center">
        <!-- icon for the filter outline -->
        <v-chip color="blue">
          <v-icon
            class="menu-icon"
            @click="toggleFilter"
            style="color: black; font-size: 24px"
            >mdi-menu</v-icon
          >
          <span
            class="ml-1 menu-icon"
            style="color: black"
            @click="toggleFilter"
          >
            Filters</span
          >
        </v-chip>
      </div>

      <transition name="filter" :duration="{ enter: 1000, leave: 500 }">
        <div v-if="showFilter" class="row filter-section">
          <div
            class="col-md-3 col-sm-3 col-xs-12"
            style="
              width: 300px;
              margin-right: 0px;
              position: relative;
              z-index: 100;
            "
          >
            <!-- different options for the filter -->
            <v-card outlined>
              <v-card-title>Price Filters</v-card-title>
              <v-divider></v-divider>

              <v-radio-group v-model="sortingOption" class="m-2">
                <v-radio
                  value="HighToLow"
                  label="High-to-Low"
                  color="primary"
                  class="py-2"
                ></v-radio>
                <v-radio
                  value="LowToHigh"
                  label="Low-to-High"
                  color="primary"
                  class="py-2"
                ></v-radio>
              </v-radio-group>

              <v-divider></v-divider>
              <v-card-title>Price</v-card-title>
              <v-range-slider
                style="width: 250px"
                v-model="range"
                :max="max"
                :min="min"
                :height="10"
                class="align-center p-2"
                dense
                step="1"
              ></v-range-slider>
              <v-row class="pa-2" dense>
                <v-col cols="12" sm="5">
                  <v-text-field
                    v-model="minValue"
                    label="Min"
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <p class="pt-2 text-center">TO</p>
                </v-col>
                <v-col cols="12" sm="5">
                  <v-text-field
                    v-model="maxValue"
                    label="Max"
                    outlined
                    dens
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-divider></v-divider>
              <!-- buttons to apply or clear filters -->
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
      </transition>
    </v-container>
  </div>
</template>

<script>
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
export default {
  data() {
    return {
      showFilter: false,
      range: [0, 20000],
      min: 0,
      max: 20000,
      items: [],
      sortingOption: "",
    };
  },
  computed: {
    // to set values of the slider
    minValue() {
      return this.range[0].toFixed(0);
    },
    maxValue() {
      return this.range[1].toFixed(0);
    },
  },
  methods: {
    // to set visibility of the filter option
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    // to apply selected filters and emit an event
    applyFilters() {
      let filteredFilters = {};

      if (this.sortingOption === "HighToLow") {
        filteredFilters.HighToLow = true;
      } else if (this.sortingOption === "LowToHigh") {
        filteredFilters.LowToHigh = false;
      }

      if (this.range[0] !== this.min || this.range[1] !== this.max) {
        filteredFilters.minPrice = this.range[0];
        filteredFilters.maxPrice = this.range[1];
      }
      const category = this.$route.matched[1].name;
      filteredFilters.category = category;
      if (Object.keys(filteredFilters).length > 0) {
        this.$emit("filters-applied", filteredFilters);
      } else {
        useToast().error("No filters selected");
      }
      this.showFilter = !this.showFilter;
    },
    //to handle the reset of filters
    handleReset() {
      this.range = [0, 20000];

      this.sortingOption = "";
    },
  },
};
</script>

<style scoped>
.filter-section {
  position: absolute;
  z-index: 100;
}

.filter-enter-active,
.filter-leave-active {
  transition: opacity 0.3s ease;
}
.filter-enter,
.filter-leave-to {
  opacity: 0;
}
</style>
