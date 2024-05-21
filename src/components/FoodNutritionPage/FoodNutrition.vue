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
      <v-infinite-scroll @load="loadMoreProducts" infinite-distance="10">
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
        <template v-slot:empty>
          <v-alert type="warning">No more products!</v-alert>
        </template>
      </v-infinite-scroll>
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
      limit: 10,
      page: 1,
      loading: false,
      searchTerm: "",
      filterTerm: "",
      allLoaded: false,
      localFoodItem: [],
    };
  },
  methods: {
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
      this.page = 1;
      this.allLoaded = false;
      this.localFoodItem = [];
      this.fetchFoodItemWithFilters();
    },
    applyFilters(filteredFilters) {
      this.filterTerm = filteredFilters;
      this.page = 1;
      this.allLoaded = false;
      this.localFoodItem = [];
      this.fetchFoodItemWithFilters();
    },
    async fetchFoodItemWithFilters() {
      this.loading = true;
      try {
        const filter = {};
        if (this.searchTerm) {
          filter.name = this.searchTerm;
        }
        if (this.filterTerm) {
          Object.assign(filter, this.filterTerm);
        }
        const response = await this.$store.dispatch("fetchFoodItem", {
          filteredFilters: filter,
          limit: this.limit,
          page: this.page,
        });
        if (this.page === 1) {
          this.localFoodItem = response;
        } else {
          this.localFoodItem = [...this.localFoodItem, ...response];
        }
        this.allLoaded = response.length < this.limit;
        this.page += 1;
      } catch (error) {
        console.error("Error fetching food-item with filters:", error);
      } finally {
        this.loading = false;
      }
    },
    handleExploreClick(foodItem) {
      this.selectedFoodItem = foodItem;
      this.exploreClicked = !this.exploreClicked;
    },
    async loadMoreProducts({ done }) {
      if (this.allLoaded || this.loading) {
        done("empty");
        return;
      }

      this.loading = true;
      try {
        let filter = {};
        if (this.searchTerm) {
          filter.name = this.searchTerm;
        }
        if (this.filterTerm) {
          filter = { ...filter, ...this.filterTerm };
        }

        const response = await this.$store.dispatch("fetchFoodItem", {
          filteredFilters: filter,
          limit: this.limit,
          page: this.page,
        });

        if (response.length === 0) {
          this.allLoaded = true;
        } else {
          this.localFoodItem = [...this.localFoodItem, ...response];
          this.page += 1;
        }

        done(this.allLoaded ? "empty" : null);
      } catch (error) {
        console.error("Error loading more food-item :", error);
        done("error");
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    foodItem: {
      get() {
        return this.localFoodItem;
      },
      set(value) {
        this.localFoodItem = value;
      },
    },
  },
  watch: {
    "$store.state.foodItemModule.foodItem": {
      handler(newVal) {
        this.localFoodItem = newVal;
      },
      immediate: true,
    },
  },

  components: {
    FoodFilter,
    NutritionDetail,
    NutritionPreview,
    UserSearch,
  },
  mounted() {
    this.fetchFoodItemWithFilters();
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
