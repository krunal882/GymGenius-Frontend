<template>
  <v-container fluid>
    <v-row v-if="loading">
      <v-col v-for="n in skeletonCount" :key="n" cols="12" sm="6" md="4" lg="4">
        <v-skeleton-loader
          class="mx-auto border"
          type="image, article, chip@2"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else class="d-flex flex-wrap">
      <v-col
        v-for="exercise in exercises"
        :key="exercise.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card width="100%" class="text-black my-4 mx-2 image-hover-effect">
          <v-img
            :src="getExerciseImagePath(exercise.name, exercise.cloudImg)"
            style="height: 300px"
            @click="exploreClicked(exercise)"
          >
            <div class="overlay"></div>
            <div class="caption">{{ exercise.name }}</div>
          </v-img>
          <v-card-text>
            <div class="subtitle-row">
              <v-card-subtitle>Level: {{ exercise.level }}</v-card-subtitle>
              <v-card-subtitle>Force: {{ exercise.force }}</v-card-subtitle>
            </div>
            <div class="mt-3 d-flex">
              Primary Muscle:
              <ul>
                <li v-for="muscle in exercise.primaryMuscles" :key="muscle">
                  {{ muscle }}
                </li>
              </ul>
            </div>
            <div>Equipment needed : {{ exercise.equipment }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="orange" @click="exploreClicked(exercise)"
              >Explore</v-btn
            >
            <v-btn color="orange" @click="bookmark(exercise)">Bookmark</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
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
  computed: {
    skeletonCount() {
      return this.loading ? 6 : 0;
    },
  },
  methods: {
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
    exploreClicked(exercise) {
      this.$emit("explore", exercise);
    },
    bookmark(exercise) {
      const userId = this.$store.state.userModule.userId;
      const exerciseId = exercise._id;
      this.$store.dispatch("bookmarkItem", {
        userId,
        itemId: exerciseId,
        itemType: "exercise",
      });
    },
    loadData() {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
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
};
</script>

<style scoped>
.subtitle-row {
  display: flex;
  justify-content: space-between;
}

.image-hover-effect:hover {
  transform: scale(1.1);
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
