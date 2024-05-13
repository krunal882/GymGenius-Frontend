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
    <v-row justify="center" dense>
      <v-col class="mt-5 d-flex" cols="4">
        <v-text-field
          v-model="selectedItem"
          class="mx-auto"
          dense
          placeholder="Type exercise name here"
          append-outer-icon="mdi-magnify"
          style="max-width: 350px"
          variant="outlined"
          rounded
        >
          <template v-slot:append>
            <v-btn @click="search" color="success">Search</v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>

    <div class="flex-row mt-0">
      <ExerciseFilter @filters-applied="applyFilters" />
      <div class="flex-column">
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
  </div>
</template>

<script>
import ExerciseFilter from "./ExerciseFilter.vue";
import ExerciseDetail from "./ExerciseDetail.vue";
import ExercisePreview from "./ExercisePreview.vue";

export default {
  data() {
    return {
      selectedItem: null,
      exploreClicked: false,
      selectedExercise: null,
      filteredExercises: null,
    };
  },
  methods: {
    search() {
      this.fetchExercisesWithFilters({ name: this.selectedItem });
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

.carousel-image {
  border-radius: 10px;
}

.iframe-style {
  height: 100%;
  min-height: 700px;
}
</style>
