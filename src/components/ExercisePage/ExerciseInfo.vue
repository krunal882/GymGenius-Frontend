<!-- this component is the parent component for the exercise page , it includes the search field , filter , preview card components -->
<template>
  <div>
    <!-- hero header image -->
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="../../assets/img/exercise-header.png"
          class="d-block w-100 carousel-image"
          alt="..."
        />
      </div>
    </div>
    <!-- search field and filter component -->
    <div class="d-flex flex-wrap justify-content-center">
      <UserSearch @search="handleSearch" @clearSearch="clearField" />
      <ExerciseFilter @filters-applied="applyFilters" />
    </div>
    <!-- preview card component with the infinity scroll applied (with pagination) -->
    <div class="justify-content-center">
      <v-infinite-scroll @load="loadMoreProducts" infinite-distance="10">
        <ExercisePreview :exercises="exercises" @explore="exploreClicked" />
        <template v-slot:empty>
          <v-alert type="warning">No more products!</v-alert>
        </template>
      </v-infinite-scroll>
    </div>
  </div>
</template>

<script>
import ExerciseFilter from "./ExerciseFilter.vue";
import ExercisePreview from "./ExercisePreview.vue";
import UserSearch from "../common-components/UserSearch.vue";

export default {
  data() {
    return {
      selectedItem: null,
      selectedExercise: null,
      limit: 10,
      page: 1,
      loading: false,
      searchTerm: "",
      filterTerm: "",
      allLoaded: false,
      localExercises: [],
    };
  },
  methods: {
    //this method redirect to the exercise detail page
    async exploreClicked(exercise) {
      this.$router.push({
        name: "exerciseDetail",
        params: { id: exercise.item._id },
      });
    },
    //this method is for the search functionality , handles search from the search-field component
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
      this.page = 1;
      this.allLoaded = false;
      this.localExercises = [];
      this.fetchExercisesWithFilters();
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
      this.fetchExercisesWithFilters();
    },
    //fetchExercisesWithFilters takes the filters and search text and call the action from the store
    async fetchExercisesWithFilters() {
      this.loading = true;
      try {
        const filter = {};
        if (this.searchTerm) {
          filter.name = this.searchTerm;
        }
        if (this.filterTerm) {
          Object.assign(filter, this.filterTerm);
        }
        const response = await this.$store.dispatch("fetchExercises", {
          filteredFilters: filter,
          limit: this.limit,
          page: this.page,
        });
        //checks page , if first page then  set data otherwise append data to existing
        if (this.page === 1) {
          this.localExercises = response;
        } else {
          this.localExercises = [...this.localExercises, ...response];
        }
        //condition to check if all items are loaded or not
        this.allLoaded = response.length < this.limit;
        this.page += 1;
      } catch (error) {
        console.error("Error fetching exercises with filters:", error);
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

        const response = await this.$store.dispatch("fetchExercises", {
          filteredFilters: filter,
          limit: this.limit,
          page: this.page,
        });
        if (response.length === 0) {
          this.allLoaded = true;
        } else {
          this.localExercises = [...this.localExercises, ...response];
          this.page += 1;
        }
        done(this.allLoaded ? "empty" : null);
      } catch (error) {
        console.error("Error loading more exercises:", error);
        done("error");
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    //to get already stored exercises
    exercises: {
      get() {
        return this.localExercises;
      },
      set(value) {
        this.localExercises = value;
      },
    },
  },
  //to watch the change in the value of exercise and reflect changes
  watch: {
    "$store.state.exercisesModule.exercises": {
      handler(newVal) {
        this.localExercises = newVal;
      },
      immediate: true,
    },
  },
  components: {
    ExerciseFilter,
    ExercisePreview,
    UserSearch,
  },
  //to load exercise on page mount
  mounted() {
    this.fetchExercisesWithFilters();
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
</style>
