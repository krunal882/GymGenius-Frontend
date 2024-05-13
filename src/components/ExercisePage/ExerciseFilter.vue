<template>
  <v-container
    class="ml-10"
    style="width: 332px; margin-right: 0px; margin-top: 25px"
  >
    <v-icon
      class="menu-icon"
      @click="toggleFilter"
      style="color: black; font-size: 24px"
      >mdi-menu</v-icon
    >

    <form v-if="showFilter" @submit.prevent="submit">
      <div class="row">
        <div
          class="col-md-3 col-sm-3 col-xs-12"
          style="width: 300px; margin-right: 0px"
        >
          <v-card outlined>
            <v-card-title>Filter Exercise</v-card-title>
            <v-divider></v-divider>

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
              label="Force Type"
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
  computed: {},
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter; // Toggle filter visibility
    },
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
        console.log("No filters selected.");
      }
    },
    handleReset() {
      this.selectedCategory = null;
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
</style>
