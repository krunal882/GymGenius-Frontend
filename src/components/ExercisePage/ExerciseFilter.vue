<!-- this filter component provides the filter functionality for the exercise -->
<!-- it provides filter for the equipment , force , muscle , level of exercise , category -->
<template>
  <div class="d-flex justify-content-center align-items-center">
    <v-container class="ml-10" style="width: 152px; padding-bottom: 15px">
      <div class="d-flex align-items-center">
        <!-- icon for the filter outline -->
        <v-chip color="blue">
          <v-icon
            class="menu-icon"
            @click="toggleFilter"
            style="color: black; font-size: 24px"
            >mdi-menu
          </v-icon>
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
        <form
          v-if="showFilter"
          @submit.prevent="submit"
          class="row filter-section"
        >
          <div>
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
                <div class="scrollable-content">
                  <v-card-title>Equipment Needed</v-card-title>
                  <v-select
                    v-model="selectedEquipment"
                    :items="equipment"
                    hint="Dumbbell / Cable"
                    label="Equipment"
                    multiple
                    persistent-hint
                  ></v-select>

                  <v-divider></v-divider>
                  <v-card-title>Force Type</v-card-title>
                  <v-select
                    v-model="selectedForce"
                    :items="force"
                    hint="Push / Pull / Static"
                    label="Force Type"
                    multiple
                    persistent-hint
                  ></v-select>

                  <v-divider></v-divider>
                  <v-card-title>Muscle Target</v-card-title>
                  <v-select
                    v-model="selectedMuscle"
                    :items="muscle"
                    hint="Shoulders / Chest / Back"
                    label="Muscle Target"
                    persistent-hint
                    multiple
                  ></v-select>

                  <v-divider></v-divider>

                  <v-card-title>Exercise Level</v-card-title>
                  <v-divider></v-divider>

                  <v-select
                    v-model="selectedLevel"
                    :items="level"
                    hint="Beginner / Intermediate / Expert"
                    label="Exercise Level"
                    persistent-hint
                    multiple
                  ></v-select>

                  <v-divider></v-divider>
                  <v-card-title>Exercise Category</v-card-title>
                  <v-divider></v-divider>
                  <v-select
                    v-model="selectedCategory"
                    :items="category"
                    hint="Strength / Cardio / Weightlifting"
                    label="Exercise Category"
                    multiple
                    persistent-hint
                  ></v-select>

                  <v-divider></v-divider>
                </div>
                <div
                  class="container d-flex justify-center align-item-center pt-5 pb-5"
                >
                  <!-- buttons to apply or clear filters -->
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
      selectedForce: [],
      selectedLevel: [],
      selectedEquipment: [],
      selectedMuscle: [],
      selectedCategory: [],
      force: ["push", "pull", "static"],
      equipment: [
        "body only",
        "foam roll",
        "kettlebells",
        "dumbbell",
        "cable",
        "barbell",
        "medicine ball",
        "bands",
        "exercise ball",
        "e-z curl bar",
      ],
      muscle: [
        "abdominals",
        "hamstrings",
        "forearms",
        "quadriceps",
        "biceps",
        "adductors",
        "shoulders",
        "triceps",
        "lats",
        "chest",
        "abductors",
        "middle back",
        "calves",
        "traps",
        "lower back",
        "glutes",
        "neck",
      ],
      level: ["beginner", "intermediate", "expert"],
      category: [
        "strength",
        "stretching",
        "strongman",
        "cardio",
        "olympic weightlifting",
        "plyometrics",
        "powerlifting",
      ],
    };
  },
  methods: {
    //it manage the state to show and hide filter box
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    //this method is for emit event with applied filters data
    applyFilters() {
      const filteredFilters = {};

      if (this.selectedForce.length > 0) {
        filteredFilters.force = this.selectedForce;
      }

      if (this.selectedCategory.length > 0) {
        filteredFilters.category = this.selectedCategory;
      }

      if (this.selectedLevel.length > 0) {
        filteredFilters.level = this.selectedLevel;
      }

      if (this.selectedEquipment.length > 0) {
        filteredFilters.equipment = this.selectedEquipment;
      }

      if (this.selectedMuscle.length > 0) {
        filteredFilters.muscle = this.selectedMuscle;
      }
      if (Object.keys(filteredFilters).length > 0) {
        this.$emit("filters-applied", filteredFilters);
      } else {
        //if filter not selected then tost notification will be showed
        useToast().error("No filters selected");
      }
      this.showFilter = !this.showFilter;
    },
    //this method clears the selected filters
    handleReset() {
      this.selectedForce = [];
      this.selectedLevel = [];
      this.selectedEquipment = [];
      this.selectedMuscle = [];
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

.scrollable-content {
  max-height: 350px;
  overflow-y: auto;
  padding-right: 25px;
  padding-left: 25px;
}
</style>
