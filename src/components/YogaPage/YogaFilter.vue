<template>
  <div class="d-flex justify-content-center align-items-center">
    <v-container class="ml-10" style="width: 152px; padding-bottom: 15px">
      <div class="d-flex align-items-center">
        <v-chip color="blue">
          <v-icon
            class="menu-icon"
            @click="toggleFilter"
            style="color: black; font-size: 24px"
            >mdi-menu</v-icon
          >
          <span class="ml-1" style="color: black"> Filters</span>
        </v-chip>
      </div>
      <transition name="filter" :duration="{ enter: 1000, leave: 500 }">
        <form
          v-if="showFilter"
          @submit.prevent="submit"
          class="row filter-section"
        >
          <div class="row">
            <div
              class="col-md-3 col-sm-3 col-xs-12"
              style="
                width: 300px;
                margin-right: 0px;
                position: relative;
                z-index: 100;
              "
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
      selectedFilters: {},
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
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    applyFilters() {
      const filteredFilters = {};

      if (this.selectedCategory.length > 0) {
        filteredFilters.category = this.selectedCategory;
      }

      if (Object.keys(filteredFilters).length > 0) {
        this.$emit("filters-applied", filteredFilters);
      } else {
        useToast().error("No filters selected");
      }
      this.showFilter = !this.showFilter;
    },
    handleReset() {
      this.selectedCategory = [];
    },
  },
};
</script>

<style scoped>
.menu-icon {
  cursor: pointer;
}
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
