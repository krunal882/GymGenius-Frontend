<!-- this component is for displaying the bookmarked exercises of the user -->
<template>
  <v-container fluid>
    <v-row v-if="bookmarkedExercises.length != 0" class="d-flex flex-wrap">
      <v-col
        v-for="item in bookmarkedExercises"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card width="90%" class="mx-auto mt-5 image-hover-effect">
          <!-- exercise image -->
          <v-img
            class="align-end text-white"
            :src="getExerciseImagePath(item.name, item.cloudImg)"
            style="height: 300px; cursor: pointer"
            @click="exploreClicked(item)"
            ><v-card-title class="caption">
              {{ item.name }}
            </v-card-title></v-img
          >
          <!-- exercise information -->
          <v-card-text>
            <div class="subtitle-row">
              <v-card-subtitle>Level: {{ item.level }} </v-card-subtitle>
              <v-card-subtitle>Force: {{ item.force }}</v-card-subtitle>
            </div>
            <v-card-text>
              <div class="mt-3 d-flex">
                <span class="muscle-label">Primary Muscle:</span>
                <span> {{ item.primaryMuscles[0] }}</span>
              </div>

              <div>
                <span class="muscle-label">Equipment needed:</span>
                <span v-if="item.equipment">{{ item.equipment }}</span>
                <span v-else>body only</span>
              </div>
            </v-card-text>
            <!-- buttons for explore and bookmark/undoBookmark -->
            <v-card-actions style="justify-content: space-between">
              <v-btn color="orange" @click="exploreClicked(item)"
                >Explore</v-btn
              >
              <v-btn
                color="orange"
                @click="undoBookmark(item)"
                :disabled="loading[item._id]"
              >
                <v-progress-circular
                  v-if="loading[item._id]"
                  indeterminate
                  size="20"
                ></v-progress-circular>
                <span v-if="!loading[item._id]">Undo Bookmark</span></v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- message to display if there is no items -->
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
  data() {
    return {
      loading: {},
    };
  },
  computed: {
    // to fetch bookmarked item from store
    bookmarkedExercises() {
      return this.$store.state.bookmarkModule.exercise;
    },
  },

  methods: {
    //for navigate to detail page
    exploreClicked(exercise) {
      this.$emit("explore", { item: exercise, route: "exerciseDetail" });
    },
    //to fetch exercise image
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
    //to undo bookmark
    async undoBookmark(exercise) {
      const exerciseId = exercise._id;
      this.loading[exerciseId] = true;
      const userId = this.$store.state.userModule.userId;

      try {
        await this.$store.dispatch("undoBookmark", {
          userId,
          itemId: exerciseId,
          itemType: "exercise",
        });
      } finally {
        this.loading[exerciseId] = false;
      }
    },
  },
};
</script>

<style scoped>
.image-hover-effect:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
.subtitle-row {
  display: flex;
  justify-content: space-between;
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
