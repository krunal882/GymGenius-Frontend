<template>
  <div>
    <!-- Button to toggle the iframe -->

    <!-- <iframe
      v-if="showIframe"
      src="https://www.chatbase.co/chatbot-iframe/_goC7mZy5K-mr7xGihzhw"
      title="Chatbot"
      width="30%"
      class="iframe-style"
      frameborder="0"
    ></iframe> -->
    <!-- Carousel -->

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
      <UserSearch @search="handleSearch" />
      <ExerciseFilter @filters-applied="applyFilters" />
    </div>
    <div class="d-flex flex-wrap justify-content-center">
      <ExercisePreview
        v-if="!exploreClicked"
        :exercises="exercises"
        @explore="handleExploreClick"
      />
      <ExerciseDetail
        v-else
        @explore="handleExploreClick"
        :exercise="selectedExercise"
      />
    </div>
  </div>
</template>

<script>
import ExerciseFilter from "./ExerciseFilter.vue";
import ExerciseDetail from "./ExerciseDetail.vue";
import ExercisePreview from "./ExercisePreview.vue";
import UserSearch from "../common-components/UserSearch.vue";

export default {
  data() {
    return {
      selectedItem: null,
      exploreClicked: false,
      selectedExercise: null,
      filteredExercises: null,
      searchTimeout: null,
    };
  },
  methods: {
    handleSearch(searchTerm) {
      if (searchTerm) {
        this.fetchExercisesWithFilters({ name: searchTerm });
      }
    },
    applyFilters(filteredFilters) {
      this.fetchExercisesWithFilters(filteredFilters);
    },
    async fetchExercisesWithFilters(filteredFilters) {
      try {
        await this.$store.dispatch("fetchExercises", filteredFilters);
      } catch (error) {
        console.error("Error fetching exercises with filters:", error);
      }
    },
    handleExploreClick(exercise) {
      this.selectedExercise = exercise;
      this.exploreClicked = !this.exploreClicked;
    },
  },
  computed: {
    exercises() {
      return this.$store.state.exercisesModule.exercises;
    },
  },

  components: {
    ExerciseFilter,
    ExercisePreview,
    ExerciseDetail,
    UserSearch,
  },
  mounted() {
    this.$store.dispatch("fetchExercises");
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
