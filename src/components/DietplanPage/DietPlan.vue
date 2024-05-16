<template>
  <div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="../../assets/img/diet-banner.jpg"
          class="d-block w-100 carousel-image"
          alt="..."
        />
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-center">
      <UserSearch @search="handleSearch" />
      <DietFilter @filters-applied="applyFilters" />
    </div>

    <div class="d-flex flex-wrap justify-content-center">
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
import UserSearch from "../common-components/UserSearch.vue";
export default {
  data() {
    return {
      poster: dietPoster,
      exploreClicked: false,
      selectedDietPlan: null,
      filteredDietPlan: null,
      searchTimeout: null,
    };
  },
  components: {
    DietFilter,
    DietDisplay,
    DietPreview,
    UserSearch,
  },
  methods: {
    handleSearch(searchTerm) {
      if (searchTerm) {
        this.fetchDietPlanWithFilters({ name: searchTerm });
      }
    },
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
    this.$store.dispatch("fetchDietPlan");
  },
};
</script>

<style scoped>
.stretch-image {
  max-height: 680px;
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
