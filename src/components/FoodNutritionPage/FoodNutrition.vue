<!-- this component is the parent component for the food-nutrition page , it includes the search field , filter , preview card components -->
<template>
  <div>
    <!-- hero header image -->
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../../assets/img/nutritions.jpg" class="w-100" alt="..." />
      </div>
    </div>
    <!-- search field and filter component -->
    <div class="d-flex flex-wrap justify-content-center">
      <UserSearch @search="handleSearch" @clearSearch="clearField" />
      <FoodFilter @filters-applied="applyFilters" />
    </div>
    <!-- preview card component with the infinity scroll applied (with pagination) -->
    <div class="justify-content-center">
      <v-infinite-scroll @load="loadMoreProducts" infinite-distance="10">
        <NutritionPreview :foodItem="foodItem" @explore="exploreClicked" />
        <template v-slot:empty>
          <v-alert type="warning">No more food-items!</v-alert>
        </template>
      </v-infinite-scroll>
    </div>
  </div>
</template>

<script>
import FoodFilter from "./FoodFilter.vue";
import NutritionPreview from "./NutritionPreview.vue";
import UserSearch from "../common-components/UserSearch.vue";

export default {
  data() {
    return {
      selectedItem: null,
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
    //this method redirect to the food-item detail page
    async exploreClicked(foodItem) {
      this.$router.push({
        name: "foodDetail",
        params: { id: foodItem.item._id },
      });
    },
    //this method is for the search functionality , handles search from the search-field component
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
      this.page = 1;
      this.allLoaded = false;
      this.localFoodItem = [];
      this.fetchFoodItemWithFilters();
    },
    //this method is for clearing the stored search-field input
    clearField() {
      this.searchTerm = "";
    },
    //this method handles the applied filters coming from the filter component
    applyFilters(filteredFilters) {
      this.filterTerm = filteredFilters;
      this.page = 1;
      this.allLoaded = false;
      this.localFoodItem = [];
      this.fetchFoodItemWithFilters();
    },
    //fetchFoodItemWithFilters takes the filters and search text and call the action from the store
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
        //checks page , if first page then  set data otherwise append data to existing
        if (this.page === 1) {
          this.localFoodItem = response;
        } else {
          this.localFoodItem = [...this.localFoodItem, ...response];
        }
        //condition to check if all items are loaded or not

        this.allLoaded = response.length < this.limit;
        this.page += 1;
      } catch (error) {
        console.error("Error fetching food-item with filters:", error);
      } finally {
        //after fetching item , made loading false

        this.loading = false;
      }
    },
    //method is to send req and load more data
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
    //to get already stored food-item
    foodItem: {
      get() {
        return this.localFoodItem;
      },
      set(value) {
        this.localFoodItem = value;
      },
    },
  },

  components: {
    FoodFilter,
    NutritionPreview,
    UserSearch,
  },
};
</script>

<style scoped>
.custom-button-style {
  background-color: blue;
  color: white;
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
