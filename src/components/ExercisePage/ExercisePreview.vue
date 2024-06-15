<template>
  <v-container fluid>
    <!-- skeleton loader for the card  -->
    <!-- <v-row v-if="loading">
      <v-col v-for="n in 12" :key="n" cols="12" sm="6" md="4" lg="4">
        <v-skeleton-loader
          class="mx-auto border"
          type="image, article, chip@2"
        ></v-skeleton-loader>
      </v-col>
    </v-row> -->
    <!-- exercise preview card -->
    <v-row class="d-flex flex-wrap">
      <v-col
        v-for="exercise in exercises"
        :key="exercise._id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card width="90%" class="mx-auto mt-2 mb-2 image-hover-effect">
          <!-- exercise images -->
          <v-img
            class="align-end text-white"
            :src="getExerciseImagePath(exercise.name, exercise.cloudImg)"
            style="height: 300px"
            @click="exploreClicked(exercise)"
          >
            <v-card-title class="caption">{{ exercise.name }}</v-card-title>
          </v-img>
          <!-- exercise information -->
          <v-card-text>
            <div class="subtitle-row">
              <v-card-subtitle
                >Level:
                {{ capitalizeFirstLetter(exercise.level) }}</v-card-subtitle
              >
              <v-card-subtitle
                >Force:
                {{ capitalizeFirstLetter(exercise.force) }}</v-card-subtitle
              >
            </div>
            <div class="mt-3 d-flex">
              <span class="muscle-label">Primary Muscle:</span>
              <span>{{
                capitalizeFirstLetter(exercise.primaryMuscles[0])
              }}</span>
            </div>
            <div>
              <span class="muscle-label">Equipment Needed:</span>
              <span v-if="exercise.equipment">{{
                capitalizeFirstLetter(exercise.equipment)
              }}</span>
              <span v-else>body only</span>
            </div>
          </v-card-text>
          <!-- buttons for explore and bookmark-undoBookmark -->
          <v-card-actions class="justify-space-between">
            <v-btn color="orange" @click="exploreClicked(exercise)"
              >Explore</v-btn
            >
            <v-btn
              color="orange"
              @click="toggleBookmark(exercise, 'exercise')"
              :disabled="loadingExercises[exercise._id]"
            >
              <v-progress-circular
                v-if="loadingExercises[exercise._id]"
                indeterminate
                size="20"
                aria-label="Loading exercise data"
              ></v-progress-circular>
              <span v-if="!loadingExercises[exercise._id]">
                {{ isBookmarked(exercise) ? "Undo Bookmark" : "Bookmark" }}
              </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bookmarkMixin from "./../../mixins/bookmarkMixin.js";
export default {
  mixins: [bookmarkMixin],
  props: {
    exercises: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loadingExercises: {}, // To track loading state for each exercise
      pageLoaded: false, // Track if the page has been loaded before
    };
  },
  methods: {
    //for first latter capitalization
    capitalizeFirstLetter(string) {
      if (!string) return "";
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    // to get image from the local or stored on cloud
    getExerciseImagePath(exerciseName, cloudImg) {
      if (cloudImg === undefined) {
        const formattedName = exerciseName
          .replace(/ /g, "_")
          .replace(/\//g, "_");
        const imgPath = `../../../assets/img/workout-exercise/${formattedName}/images/${exerciseName}0.jpg`;
        return imgPath;
      } else {
        return cloudImg;
      }
    },
    // to emit an event to navigate to detail page
    exploreClicked(exercise) {
      this.$emit("explore", { item: exercise, route: "exerciseDetail" });
    },
    // Override toggleBookmark to handle loading state
    async toggleBookmark(exercise, itemType) {
      const exerciseId = exercise._id;
      this.loadingExercises[exerciseId] = true;

      try {
        await this.bookmarkOrUndo(exercise, itemType);
      } finally {
        this.loadingExercises[exerciseId] = false;
      }
    },
  },
  computed: {
    // to check if exercise is bookmarked or not
    bookmarked() {
      return this.$store.state.bookmarkModule.exercise;
    },
  },
};
</script>

<style scoped>
.subtitle-row {
  display: flex;
  justify-content: space-between;
}

.image-hover-effect:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.image-hover-effect {
  cursor: pointer;
}

.muscle-label {
  font-weight: 500;
  margin-right: 10px;
}

.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px;
}
</style>
