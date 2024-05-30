<!-- this component gives the preview of the exercise that contains some info about exercise in card form -->
<!-- it also includes explore button to see full details and bookmark button for bookmarking -->
<template>
  <v-container fluid>
    <!-- skeleton loader for the card  -->
    <v-row v-if="loading">
      <v-col
        v-for="n in this.exercises?.length"
        :key="n"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-skeleton-loader
          class="mx-auto border"
          type="image, article, chip@2"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <!-- exercise preview card -->
    <v-row v-else class="d-flex flex-wrap">
      <v-col
        v-for="exercise in exercises"
        :key="exercise.id"
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
              <v-card-subtitle>Level: {{ exercise.level }}</v-card-subtitle>
              <v-card-subtitle>Force: {{ exercise.force }}</v-card-subtitle>
            </div>
            <div class="mt-3 d-flex">
              <span class="muscle-label">Primary Muscle:</span>
              <span> {{ exercise.primaryMuscles[0] }}</span>
            </div>
            <div>
              <span class="muscle-label">Equipment needed:</span>
              <span v-if="exercise.equipment">{{ exercise.equipment }}</span>
              <span v-else>body only</span>
            </div>
          </v-card-text>
          <!-- buttons for explore and bookmark-undoBookmark -->
          <v-card-actions class="justify-space-between">
            <v-btn color="orange" @click="exploreClicked(exercise)"
              >Explore</v-btn
            >
            <v-btn color="orange" @click="toggleBookmark(exercise, 'exercise')">
              {{ isBookmarked(exercise) ? "Undo Bookmark" : "Bookmark" }}
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
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    //to get image form the local or stored on cloud
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
    //to emit an event to navigate to detail page
    exploreClicked(exercise) {
      this.$emit("explore", { item: exercise, route: "exerciseDetail" });
    },
    //it provides the timer for skeleton loader
    loadData() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
  //watcher for the exercise changes
  watch: {
    exercises: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.loading = true;
          this.loadData();
        }
      },
      immediate: true,
    },
  },
  created() {
    this.loadData();
  },
  computed: {
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
