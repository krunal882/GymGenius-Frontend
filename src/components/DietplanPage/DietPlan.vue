<!-- this component is the parent component for the dietPlan page , it includes the search field , filter , preview card components -->
<template>
  <div>
    <!-- hero header image -->
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="../../assets/img/diet-plan.jpg"
          class="d-block w-100 carousel-image"
          height="550px"
          alt="..."
        />
      </div>
    </div>
    <!-- search field and filter component -->
    <div class="d-flex flex-wrap justify-content-center">
      <UserSearch @search="handleSearch" @clearSearch="clearField" />
      <DietFilter @filters-applied="applyFilters" />
    </div>

    <!-- preview card component with the infinity scroll applied (with pagination) -->
    <div class="justify-content-center">
      <v-infinite-scroll @load="loadMoreProducts" infinite-distance="10">
        <DietPreview
          :dietPlan="dietPlan"
          :loading="loading"
          @explore="exploreClicked"
        />
        <template v-slot:empty>
          <v-alert type="warning">No more Diet-plans!</v-alert>
        </template>
      </v-infinite-scroll>
    </div>
  </div>
</template>

<script>
import dietPoster from "../../assets/img/diet-plan-poster2.png";
import DietFilter from "./DietFilter.vue";
import DietPreview from "./DietPreview.vue";
import UserSearch from "../common-components/UserSearch.vue";
export default {
  data() {
    return {
      poster: dietPoster,
      selectedDietPlan: null,
      filteredDietPlan: null,
      searchTimeout: null,
      limit: 10,
      page: 1,
      loading: false,
      searchTerm: "",
      filterTerm: "",
      allLoaded: false,
      localDiet: [],
    };
  },
  components: {
    DietFilter,
    DietPreview,
    UserSearch,
  },
  methods: {
    //this method redirect to the dietPlan detail page
    async exploreClicked(diet) {
      this.$router.push({
        name: "dietDetail",
        params: { id: diet.item._id },
      });
    },
    //this method is for the search functionality , handles search from the search-field component
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
      this.page = 1;
      this.allLoaded = false;
      this.localExercises = [];
      this.fetchDietPlanWithFilters();
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
      this.localExercises = [];
      this.fetchDietPlanWithFilters();
    },
    //fetchDietPlanWithFilters takes the filters and search text and call the action from the store
    async fetchDietPlanWithFilters() {
      this.loading = true;
      try {
        const filter = {};
        if (this.searchTerm) {
          filter.name = this.searchTerm;
        }
        if (this.filterTerm) {
          Object.assign(filter, this.filterTerm);
        }
        const response = await this.$store.dispatch("fetchDietPlan", {
          filteredFilters: filter,
          limit: this.limit,
          page: this.page,
        });
        //checks page , if first page then  set data otherwise append data to existing
        if (this.page === 1) {
          this.localDiet = response;
        } else {
          this.localDiet = [...this.localDiet, ...response];
        }
        //condition to check if all items are loaded or not
        this.allLoaded = response.length < this.limit;
        this.page += 1;
      } catch (error) {
        console.error("Error fetching DietPlans with filters:", error);
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
        const response = await this.$store.dispatch("fetchDietPlan", {
          filteredFilters: filter,
          limit: this.limit,
          page: this.page,
        });
        if (response.length === 0) {
          this.allLoaded = true;
        } else {
          this.localDiet = [...this.localDiet, ...response];
          this.page += 1;
        }

        done(this.allLoaded ? "empty" : null);
      } catch (error) {
        console.error("Error loading more products:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    //to get already stored dietPlan
    dietPlan: {
      get() {
        return this.localDiet;
      },
      set(value) {
        this.localDiet = value;
      },
    },
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
