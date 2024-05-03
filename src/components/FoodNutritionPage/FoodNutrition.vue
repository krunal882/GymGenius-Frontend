<template>
  <div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="../../assets/img/exercise-header.png"
          class="d-block w-100 carousel-image"
          alt="..."
        />
      </div>
    </div>
    <div class="flex-row">
      <FoodFilter @filters-applied="applyFilters" />
      <div class="flex-column mt-10">
        <NutritionPreview
          v-if="!exploreClicked"
          :foodItem="foodItem"
          @explore="handleExploreClick"
        />
        <NutritionDetail
          v-else
          @explore="handleExploreClick"
          :foodItem="selectedFoodItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FoodFilter from "./FoodFilter.vue";
import NutritionDetail from "./NutritionDetail.vue";
import NutritionPreview from "./NutritionPreview.vue";

export default {
  data() {
    return {
      exploreClicked: false,
      selectedFoodItem: null,
      filteredFoodItem: null,
    };
  },
  methods: {
    applyFilters(filteredFilters) {
      // Your filtering logic here
      this.fetchFoodItemWithFilters(filteredFilters);
    },
    async fetchFoodItemWithFilters(filteredFilters) {
      try {
        // Dispatch the fetchExercises action with the filtered filters
        await this.$store.dispatch("fetchFoodItem", filteredFilters);
      } catch (error) {
        console.error("Error fetching food-item with filters:", error);
      }
    },
    handleExploreClick(foodItem) {
      this.selectedFoodItem = foodItem;
      this.exploreClicked = !this.exploreClicked;
    },
  },
  computed: {
    foodItem() {
      return this.$store.state.foodItemModule.foodItem;
    },
  },

  components: {
    FoodFilter,
    NutritionDetail,
    NutritionPreview,
  },
  mounted() {
    this.$store.dispatch("fetchFoodItem"); // Fetch exercises data when the component is mounted
  },
};
</script>

<style scoped>
.custom-button-style {
  background-color: blue;
  color: white;
}

.carousel-image {
  border-radius: 10px; /* Add rounded corners to the carousel image */
}

.iframe-style {
  height: 100%;
  min-height: 700px;
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
