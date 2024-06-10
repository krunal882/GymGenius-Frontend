<!-- this component is for admin to show exercise and provide options to edit , explore and delete -->
<template>
  <v-container fluid>
    <!-- Cards for Exercise Info -->
    <v-row class="d-flex flex-wrap">
      <v-col
        v-for="exercise in exercises"
        :key="exercise.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card width="90%" class="mt-2 mb-2 mx-auto image-hover-effect">
          <!-- exercise images -->
          <v-img
            class="align-end text-white"
            height="300px"
            :src="getExerciseImagePath(exercise.name, exercise.cloudImg)"
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
              Primary Muscle:
              <ul>
                <li v-for="muscle in exercise.primaryMuscles" :key="muscle">
                  {{ muscle }}
                </li>
              </ul>
            </div>
            <div>
              <span class="muscle-label">Equipment needed:</span>
              <span v-if="exercise.equipment">{{ exercise.equipment }}</span>
              <span v-else>body only</span>
            </div>
          </v-card-text>
          <!-- buttons for explore , remove and edit -->
          <v-card-actions style="justify-content: space-between">
            <v-btn color="orange" @click="exploreClicked(exercise)"
              >Explore</v-btn
            >
            <v-btn color="primary" @click="editClick(exercise)">
              <v-icon left>mdi-pencil</v-icon> Edit</v-btn
            >
            <v-btn color="error" @click="deleteClick(exercise)">
              <v-icon left>mdi-delete</v-icon> Delete</v-btn
            >
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

  methods: {
    //to emit an event to navigate to detail page
    async exploreClicked(exercise) {
      this.$router.push({
        name: "exerciseDetail",
        params: { id: exercise._id },
      });
    },
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
    //to emit an event to navigate to edit page
    editClick(exercise) {
      this.$emit("edit-exercise", exercise);
    },
    //to emit an event to delete the exercise
    deleteClick(exercise) {
      this.$emit("remove-exercise", exercise);
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
