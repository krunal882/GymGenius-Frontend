<template>
  <v-card class="" width="auto" style="display: flex">
    <div style="flex: 1; padding-right: 16px; position: relative">
      <v-card class="mx-auto" elevation="24" width="auto">
        <v-carousel
          :continuous="false"
          :show-arrows="false"
          delimiter-icon="mdi-square"
          height="auto"
          hide-delimiter-background
        >
          <v-carousel-item v-for="(image, i) in images" :key="i">
            <v-sheet height="100%" tile>
              <div class="d-flex fill-height justify-center align-center">
                <v-img :src="image" cover center></v-img>
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
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
    </div>

    <hr
      style="
        height: 100%;
        border: none;
        border-right: 1px solid #ccc;
        margin: 0;
      "
    />

    <div style="flex: 1; padding: 16px; overflow: auto">
      <v-card-title class="pt-4">Name: {{ exercise.name }}</v-card-title>
      <v-card-text class="pt-4">Level: {{ exercise.level }}</v-card-text>
      <div class="d-flex">
        <v-card-text class="pt-4 flex-grow-1"
          >Force : {{ exercise.force }}</v-card-text
        >
        <v-card-text class="pt-4 flex-grow-1"
          >Mechanic: {{ exercise.mechanic }}</v-card-text
        >
      </div>
      <v-card-text>
        <div class="d-flex">
          Primary Muscle:
          <ul v-for="muscle in exercise.primaryMuscles" :key="muscle">
            {{
              muscle
            }}
          </ul>
        </div></v-card-text
      >
      <v-card-text
        >secondary Muscle target:
        <ul v-for="muscle in exercise.secondaryMuscles" :key="muscle">
          {{
            muscle
          }}
        </ul></v-card-text
      >
      <v-card-text>Equipment Need: {{ exercise.equipment }}</v-card-text>
      <v-card-text>Category : {{ exercise.category }}</v-card-text>

      <v-card-actions style="justify-content: space-between">
        <v-btn color="orange" @click="exploreClicked">Go Back</v-btn>
        <v-btn color="orange" @click="bookmark(exercise)">Bookmark</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    exercise: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      images: [""],
    };
  },
  methods: {
    exploreClicked() {
      this.$emit("explore");
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
        this.images = cloudImg;
      }
    },
  },
  created() {
    this.loadImages(this.exercise.name, this.exercise.cloudImg);
  },
};
</script>
