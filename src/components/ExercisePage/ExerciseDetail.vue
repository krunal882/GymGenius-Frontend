<!-- this component is for displaying the exercises to users -->
<!--it also provides buttons for the bookmarking and for navigating to previous page -->
<template>
  <v-container v-if="exercise">
    <v-card>
      <v-card :class="{ 'd-flex': isWideScreen }" width="auto">
        <div style="flex: 1; padding-right: 16px; position: relative">
          <!-- carousal to display exercise images -->
          <v-card class="mx-auto" elevation="24" width="auto">
            <v-carousel
              :continuous="false"
              :show-arrows="false"
              delimiter-icon="mdi-square"
              height="auto"
              hide-delimiter-background
            >
              <v-carousel-item v-for="(image, i) in images" :key="i">
                <v-sheet height="375px" tile>
                  <div class="d-flex fill-height justify-center align-center">
                    <v-img :src="image" center></v-img>
                  </div>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </div>

        <hr
          style="
            height: 100%;
            border: none;
            border-right: 1px solid #ccc;
            margin: 0;
          "
        />
        <!-- exercises details -->
        <div style="flex: 1; padding: 16px; overflow: auto">
          <v-card-title class="pt-4 text-center"
            >Exercise Name: {{ exercise.name }}</v-card-title
          >
          <div class="d-flex">
            <v-card-text v-if="exercise.level" class="pt-4"
              ><span class="details"> Level:</span>
              <span class="details-info">
                {{
                  exercise.level.charAt(0).toUpperCase() +
                  exercise.level.slice(1)
                }}</span
              ></v-card-text
            >
            <v-card-text v-if="exercise.category"
              ><span class="details"> Category :</span>
              <span class="details-info">{{
                exercise.category.charAt(0).toUpperCase() +
                exercise.category.slice(1)
              }}</span></v-card-text
            >
          </div>
          <div class="d-flex">
            <v-card-text v-if="exercise.force" class="pt-4 flex-grow-1"
              ><span class="details"> Force : </span>
              <span class="details-info">{{
                exercise.force.charAt(0).toUpperCase() + exercise.force.slice(1)
              }}</span></v-card-text
            >
            <v-card-text v-if="exercise.mechanic" class="pt-4 flex-grow-1"
              ><span class="details"> Mechanic: </span
              >{{
                exercise.mechanic.charAt(0).toUpperCase() +
                exercise.mechanic.slice(1)
              }}</v-card-text
            >
          </div>
          <v-card-text v-if="exercise.primaryMuscles?.length > 0">
            <div class="d-flex">
              <span class="details"> Primary Muscle: </span>
              <ul v-for="muscle in exercise.primaryMuscles" :key="muscle">
                {{
                  muscle.charAt(0).toUpperCase() + muscle.slice(1)
                }}
              </ul>
            </div></v-card-text
          >
          <v-card-text v-if="exercise.secondaryMuscles?.length > 0">
            <div class="d-flex flex-wrap">
              <span class="details"> Secondary Muscle target:</span>
              <ul v-for="muscle in exercise.secondaryMuscles" :key="muscle">
                {{
                  muscle.charAt(0).toUpperCase() + muscle.slice(1)
                }}
              </ul>
            </div></v-card-text
          >
          <v-card-text v-if="exercise.equipment"
            ><span class="details"> Equipment Need: </span
            ><span class="details-info">{{
              exercise.equipment.charAt(0).toUpperCase() +
              exercise.equipment.slice(1)
            }}</span></v-card-text
          >
          <!-- action buttons for the bookmark/undoBookmark and navigation to previous page -->
          <v-card-actions style="justify-content: space-between">
            <v-btn color="orange" @click="back">Go Back</v-btn>
            <v-btn color="orange" @click="toggleBookmark(exercise, 'exercise')">
              {{ isBookmarked(exercise) ? "Undo Bookmark" : "Bookmark" }}
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
      <div
        style="
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.8);
          padding: 16px;
        "
      >
        <v-card-title class="pt-4"> Instructions :</v-card-title>
        <v-card-text class="pose-description">
          <ul>
            <li
              v-for="(instruction, index) in exercise.instructions"
              :key="index"
            >
              <p>{{ instruction }}</p>
            </li>
          </ul>
        </v-card-text>
      </div>
    </v-card>
  </v-container>
</template>
<script>
import bookmarkMixin from "./../../mixins/bookmarkMixin.js";
export default {
  mixins: [bookmarkMixin],
  data() {
    return {
      images: [""],
      exercise: null,
      isWideScreen: true,
    };
  },
  methods: {
    //this method fetches the dietPlan by id by calling action in the store
    async fetchExercise(id) {
      try {
        await this.$store.dispatch("fetchExercises", { id });
      } catch (error) {
        console.log(error);
      }
      this.exercise = this.$store.state.exercisesModule.exerciseDetail[0];
    },
    //it navigates to the previous page
    back() {
      this.$router.go(-1);
    },
    //it handles the screen sizing
    handleResize() {
      this.isWideScreen = window.innerWidth > 790;
    },
    //this method loades the image sof exercise form local or from the cloud
    async loadImages(exerciseName, cloudImg) {
      if (cloudImg === undefined) {
        const formatedName = exerciseName
          .replace(/ /g, "_")
          .replace(/\//g, "_");
        try {
          const image1 = await import(
            `../../assets/img/workout-exercise/${formatedName}/images/${exerciseName}0.jpg`
          );
          const image2 = await import(
            `../../assets/img/workout-exercise/${formatedName}/images/${exerciseName}1.jpg`
          );
          const imageURL1 = image1.default.replace(/%20/g, " ");
          const imageURL2 = image2.default.replace(/%20/g, " ");
          this.images = [imageURL1, imageURL2];
        } catch (error) {
          console.error("Error loading images:", error);
        }
      } else {
        this.images = [cloudImg];
      }
    },
  },
  computed: {
    //it returns the bookmarked exercises of the user
    bookmarked() {
      return this.$store.state.bookmarkModule.exercise;
    },
  },
  //created lifecycle hook fetch the exercise using the id in route
  async created() {
    const { id } = this.$route.params;
    await this.fetchExercise(id);

    this.loadImages(this.exercise.name, this.exercise.cloudImg);
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.details {
  font-weight: 500;
  font-size: 17px;
}

.details-info {
  margin-left: 7px;
}
</style>
