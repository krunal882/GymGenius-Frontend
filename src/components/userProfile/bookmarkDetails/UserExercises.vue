<template>
  <v-container fluid>
    <v-row v-if="bookmarkedExercises.length != 0">
      <v-col
        v-for="item in bookmarkedExercises"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card
          width="90%"
          height="auto"
          class="text-black my-4 mx-2 image-hover-effect"
        >
          <div>
            <v-img
              :src="getExerciseImagePath(item.name)"
              style="height: 300px"
              @click="exploreClicked(item)"
              ><div class="caption">
                {{ item.name }}
              </div></v-img
            >
          </div>
          <div class="content">
            <div class="subtitle-row">
              <v-card-subtitle>Level: {{ item.level }} </v-card-subtitle>
            </div>
            <v-card-text>
              <div class="d-flex">
                Primary Muscle:
                <ul v-for="muscle in item.primaryMuscles" :key="muscle">
                  {{
                    muscle
                  }}
                </ul>
              </div>

              <div>Equipment needed: {{ item.equipment }}</div>
            </v-card-text>
            <v-card-actions style="justify-content: space-between">
              <v-btn color="orange" @click="exploreClicked(item)"
                >Explore</v-btn
              >
              <v-btn color="orange" @click="undoBookmark(item)"
                >Undo Bookmark</v-btn
              >
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div v-else>
      <v-alert :value="true" color="info" icon="mdi-information">
        You do not have any bookmarked exercises. <br />
        Start exploring and bookmarking exercises to create your personalized
        workout routines!
      </v-alert>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    bookmarkedExercises() {
      return this.$store.state.bookmarkModule.exercise;
    },
  },

  methods: {
    exploreClicked(exercise) {
      this.$emit("explore", { item: exercise, route: "exerciseDetail" });
    },
    getExerciseImagePath(exerciseName) {
      const formatedName = exerciseName.replace(/ /g, "_").replace(/\//g, "_");

      const imgPath = `../../../assets/img/workout-exercise/${formatedName}/images/${exerciseName}0.jpg`;

      return imgPath;
    },
    undoBookmark(exercise) {
      const userId = this.$store.state.userModule.userId;

      const exerciseId = exercise._id;
      this.$store.dispatch("undoBookmark", {
        userId,
        itemId: exerciseId,
        itemType: "exercise",
      });
    },
  },
};
</script>

<style scoped>
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
