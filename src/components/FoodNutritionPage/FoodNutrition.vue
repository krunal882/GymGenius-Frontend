<template>
  <div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="../../assets/img/nutritions.jpg"
          class="d-block w-100 carousel-image"
          alt="..."
        />
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-center">
      <UserSearch @search="handleSearch" />
      <FoodFilter @filters-applied="applyFilters" />
    </div>
    <div class="d-flex flex-wrap justify-content-center">
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
</template>

<script>
import FoodFilter from "./FoodFilter.vue";
import NutritionDetail from "./NutritionDetail.vue";
import NutritionPreview from "./NutritionPreview.vue";
import UserSearch from "../common-components/UserSearch.vue";

export default {
  data() {
    return {
      selectedItem: null,
      exploreClicked: false,
      selectedFoodItem: null,
      filteredFoodItem: null,
    };
  },
  methods: {
    handleSearch(searchTerm) {
      if (searchTerm) {
        this.fetchFoodItemWithFilters({ name: searchTerm });
      }
    },
    applyFilters(filteredFilters) {
      this.fetchFoodItemWithFilters(filteredFilters);
    },
    async fetchFoodItemWithFilters(filteredFilters) {
      try {
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
    UserSearch,
  },
  mounted() {
    this.$store.dispatch("fetchFoodItem");
  },
};
</script>

<style scoped>
.custom-button-style {
  background-color: blue;
  color: white;
}

.carousel-image {
  border-radius: 10px;
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
