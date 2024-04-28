<template>
  <v-container>
    <v-row>
      <v-col v-for="exercise in exercises" :key="exercise.id" cols="4">
        <v-card width="300" height="auto" class="text-black my-4 mx-2">
          <div>
            <v-img
              :src="getExerciseImagePath(exercise.name)"
              style="height: 200px; width: 100%; object-fit: cover"
              ><div
                style="
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  background-color: rgba(0, 0, 0, 0.6);
                  color: white;
                  padding: 8px;
                "
              >
                {{ exercise.name }}
              </div></v-img
            >
          </div>
          <div class="content">
            <div class="subtitle-row">
              <v-card-subtitle>Level: {{ exercise.level }}</v-card-subtitle>
              <v-card-subtitle>Force: {{ exercise.force }}</v-card-subtitle>
            </div>
            <v-card-text>
              <div class="d-flex">
                Primary Muscle:
                <ul v-for="muscle in exercise.primaryMuscles" :key="muscle">
                  {{
                    muscle
                  }}
                </ul>
              </div>

              <div>Equipment needed: {{ exercise.equipment }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange" @click="exploreClicked(exercise)"
                >Explore</v-btn
              >
            </v-card-actions>
          </div>
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
  methods: {
    getExerciseImagePath(exerciseName) {
      const formatedName = exerciseName.replace(/ /g, "_").replace(/\//g, "_");

      const imgPath = `../../../assets/img/workout-exercise/${formatedName}/images/${exerciseName}0.jpg`;

      return imgPath;
    },
    exploreClicked(exercise) {
      this.$emit("explore", exercise);
    },
  },
};

window.onload = function () {
  window.scrollTo(0, 0); // Scroll to the top-left corner of the page
};
</script>

<style scoped>
.row-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.content {
  flex: 1;
  padding: 16px;
}

.subtitle-row {
  display: flex;
  justify-content: space-between;
}
</style>
