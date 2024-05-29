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
      <UserSearch @search="handleSearch" @clearSearch="clearField" />
      <DietFilter @filters-applied="applyFilters" />
    </div>

    <div class="justify-content-center">
      <v-infinite-scroll @load="loadMoreProducts" infinite-distance="10">
        <DietPreview :dietPlan="dietPlan" @explore="exploreClicked" />
        <template v-slot:empty>
          <v-alert type="warning">No more products!</v-alert>
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
    async exploreClicked(diet) {
      this.$router.push({
        name: "dietDetail",
        params: { id: diet._id },
      });
    },
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
      this.page = 1;
      this.allLoaded = false;
      this.localExercises = [];
      this.fetchDietPlanWithFilters();
    },
    clearField() {
      this.searchTerm = "";
    },
    applyFilters(filteredFilters) {
      this.filterTerm = filteredFilters;
      this.page = 1;
      this.allLoaded = false;
      this.localExercises = [];
      this.fetchDietPlanWithFilters();
    },
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
        if (this.page === 1) {
          this.localDiet = response;
        } else {
          this.localDiet = [...this.localDiet, ...response];
        }
        this.allLoaded = response.length < this.limit;
        this.page += 1;
      } catch (error) {
        console.error("Error fetching DietPlans with filters:", error);
      } finally {
        this.loading = false;
      }
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
    dietPlan: {
      get() {
        return this.localDiet;
      },
      set(value) {
        this.localDiet = value;
      },
    },
  },
  watch: {
    "$store.state.dietPlanModule.dietPlan": {
      handler(newVal) {
        this.localDiet = newVal;
      },
      immediate: true,
    },
  },

  mounted() {
    this.fetchDietPlanWithFilters();
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
