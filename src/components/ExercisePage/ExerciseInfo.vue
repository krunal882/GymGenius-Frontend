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
    <div class="flex-row">
      <ExerciseFilter @filters-applied="applyFilters" />
      <div class="flex-column mt-10">
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
    <!-- Iframe (hidden by default) -->
  </div>
</template>

<script>
import ExerciseFilter from "./ExerciseFilter.vue";
import ExerciseDetail from "./ExerciseDetail.vue";
import ExercisePreview from "./ExercisePreview.vue";

export default {
  data() {
    return {
      exploreClicked: false,
      selectedExercise: null,
      filteredExercises: null,
    };
  },
  methods: {
    applyFilters(filteredFilters) {
      // Your filtering logic here
      this.fetchExercisesWithFilters(filteredFilters);
    },
    async fetchExercisesWithFilters(filteredFilters) {
      try {
        // Dispatch the fetchExercises action with the filtered filters
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
  },
  mounted() {
    this.$store.dispatch("fetchExercises"); // Fetch exercises data when the component is mounted
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
</style>