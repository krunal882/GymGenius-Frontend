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
    <div class="d-flex flex-wrap justify-content-center">
      <UserSearch @search="handleSearch" @clearSearch="clearField" />
      <ExerciseFilter @filters-applied="applyFilters" />
    </div>
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
    async exploreClicked(exercise) {
      this.$router.push({
        name: "exerciseDetail",
        params: { id: exercise._id },
      });
    },
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
      this.page = 1;
      this.allLoaded = false;
      this.localExercises = [];
      this.fetchExercisesWithFilters();
    },
    clearField() {
      this.searchTerm = "";
    },
    applyFilters(filteredFilters) {
      this.filterTerm = filteredFilters;
      this.page = 1;
      this.allLoaded = false;
      this.localExercises = [];
      this.fetchExercisesWithFilters();
    },
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
        if (this.page === 1) {
          this.localExercises = response;
        } else {
          this.localExercises = [...this.localExercises, ...response];
        }
        this.allLoaded = response.length < this.limit;
        this.page += 1;
      } catch (error) {
        console.error("Error fetching exercises with filters:", error);
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
    exercises: {
      get() {
        return this.localExercises;
      },
      set(value) {
        this.localExercises = value;
      },
    },
  },
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
