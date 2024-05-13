<template>
  <div style="height: 800">
    <v-img :src="poster" alt="diet plan poster" class="stretch-image" />
  </div>
  <div class="flex-row">
    <DietFilter @filters-applied="applyFilters" />
    <div class="flex-column mt-10">
      <DietPreview
        v-if="!exploreClicked"
        :dietPlan="dietPlan"
        @explore="handleExploreClick"
      />
      <DietDisplay
        v-else
        @explore="handleExploreClick"
        :dietPlan="selectedDietPlan"
        :meals="selectedDietPlan.meals"
      />
    </div>
  </div>
</template>

<script>
import dietPoster from "../../assets/img/diet-plan-poster2.png";
import DietFilter from "./DietFilter.vue";
import DietDisplay from "./DietDisplay.vue";
import DietPreview from "./DietPreview.vue";
export default {
  data() {
    return {
      poster: dietPoster,
      exploreClicked: false,
      selectedDietPlan: null,
      filteredDietPlan: null,
    };
  },
  components: {
    DietFilter,
    DietDisplay,
    DietPreview,
  },
  methods: {
    applyFilters(filteredFilters) {
      this.fetchDietPlanWithFilters(filteredFilters);
    },
    async fetchDietPlanWithFilters(filteredFilters) {
      try {
        await this.$store.dispatch("fetchDietPlan", filteredFilters);
      } catch (error) {
        console.error("Error fetching DietPlans with filters:", error);
      }
    },
    handleExploreClick(dietPlan) {
      this.selectedDietPlan = dietPlan;
      this.exploreClicked = !this.exploreClicked;
    },
  },
  computed: {
    dietPlan() {
      return this.$store.state.dietPlanModule.dietPlan;
    },
  },

  mounted() {
    this.$store.dispatch("fetchDietPlan"); // Fetch exercises data when the component is mounted
  },
};
</script>

<style scoped>
.stretch-image {
  max-height: 680px; /* Adjust as needed */
}

.flex-row {
  display: flex;
  align-items: flex-start;
}

.flex-column {
  display: flex;
  flex-direction: column;
}
</style>
