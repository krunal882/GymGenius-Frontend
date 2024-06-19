<template>
  <v-container>
    <v-card v-if="exercise">
      <v-card :class="{ 'd-flex': isWideScreen }" width="auto">
        <div style="flex: 1; padding-right: 16px; position: relative">
          <!-- Skeleton loader for the image -->
          <v-row v-if="loadingImage">
            <v-col>
              <v-skeleton-loader type="image@2"></v-skeleton-loader>
            </v-col>
          </v-row>
          <!-- carousal to display exercise images -->
          <v-card
            v-if="!loadingImage"
            class="mx-auto"
            elevation="24"
            width="auto"
          >
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
                    <v-img :src="image" center alt="exercise image"></v-img>
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
        <div
          ref="exerciseDetails"
          style="flex: 1; padding: 16px; overflow: auto"
        >
          <v-card-title class="pt-4 text-center"
            >Exercise Name: {{ exercise.name }}</v-card-title
          >
          <div class="d-flex">
            <v-card-text v-if="exercise.level" class="pt-4"
              ><span class="details"> Level:</span>
              <span class="details-info">
                {{ capitalizeFirstLetter(exercise.level) }}</span
              ></v-card-text
            >
            <v-card-text v-if="exercise.category"
              ><span class="details"> Category :</span>
              <span class="details-info">{{
                capitalizeFirstLetter(exercise.category)
              }}</span></v-card-text
            >
          </div>
          <div class="d-flex">
            <v-card-text v-if="exercise.force" class="pt-4 flex-grow-1"
              ><span class="details"> Force : </span>
              <span class="details-info">{{
                capitalizeFirstLetter(exercise.force)
              }}</span></v-card-text
            >
            <v-card-text v-if="exercise.mechanic" class="pt-4 flex-grow-1"
              ><span class="details"> Mechanic: </span
              >{{ capitalizeFirstLetter(exercise.mechanic) }}</v-card-text
            >
          </div>
          <v-card-text v-if="exercise.primaryMuscles?.length > 0">
            <div class="d-flex">
              <span class="details"> Primary Muscle: </span>
              <ul
                style="
                  list-style-type: none;
                  padding-left: 15px;
                  padding-top: 3px;
                "
              >
                <li v-for="muscle in exercise.primaryMuscles" :key="muscle">
                  {{ capitalizeFirstLetter(muscle) }}
                </li>
              </ul>
            </div></v-card-text
          >
          <v-card-text v-if="exercise.secondaryMuscles?.length > 0">
            <div class="d-flex flex-wrap">
              <span class="details"> Secondary Muscle target:</span>
              <ul
                style="
                  list-style-type: none;
                  padding-left: 15px;
                  padding-top: 3px;
                  display: flex;
                "
              >
                <li
                  v-for="muscle in exercise.secondaryMuscles"
                  :key="muscle"
                  style="margin-right: 8px"
                >
                  {{ capitalizeFirstLetter(muscle) }}
                </li>
              </ul>
            </div></v-card-text
          >
          <v-card-text v-if="exercise.equipment"
            ><span class="details"> Equipment Need: </span
            ><span class="details-info">{{
              capitalizeFirstLetter(exercise.equipment)
            }}</span></v-card-text
          >
          <!-- action buttons for the bookmark/undoBookmark and navigation to previous page -->
          <v-card-actions style="justify-content: space-between">
            <v-btn color="orange" @click="back">Go Back</v-btn>
            <v-btn
              color="orange"
              @click="toggleBookmark(exercise, 'exercise')"
              :disabled="loadingBookmark"
            >
              <v-progress-circular
                v-if="loadingBookmark"
                indeterminate
                size="20"
              ></v-progress-circular>
              <span v-if="!loadingBookmark">
                {{ isBookmarked(exercise) ? "Undo Bookmark" : "Bookmark" }}
              </span>
            </v-btn>
            <v-btn
              color="orange"
              @click="downloadPDF"
              :disabled="loadingDownload"
            >
              <v-progress-circular
                v-if="loadingDownload"
                indeterminate
                size="20"
              ></v-progress-circular>
              <span v-if="!loadingDownload">Download PDF</span>
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
    <div v-else class="main-loader"></div>
  </v-container>
</template>

<script>
import jsPDF from "jspdf";
import bookmarkMixin from "./../../mixins/bookmarkMixin.js";

export default {
  mixins: [bookmarkMixin],
  data() {
    return {
      images: [""],
      exercise: null,
      isWideScreen: true,
      loadingImage: false,
      loadingBookmark: false,
      loadingDownload: false,
    };
  },
  methods: {
    //for first latter capitalization
    capitalizeFirstLetter(string) {
      if (!string) return "";
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    async fetchExercise(id) {
      try {
        await this.$store.dispatch("fetchExercises", { id });
      } catch (error) {
        console.log(error);
      }
      this.exercise = this.$store.state.exercisesModule.exerciseDetail[0];
    },
    back() {
      this.$router.go(-1);
    },
    handleResize() {
      this.isWideScreen = window.innerWidth > 790;
    },
    async loadImages(exerciseName, cloudImg) {
      this.loadingImage = true;
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
      this.loadingImage = false;
    },
    async downloadPDF() {
      this.loadingDownload = true;
      try {
        const pdf = new jsPDF("p", "mm", "a4");
        const margin = 10;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        let yOffset = margin;

        // Add Exercise Name
        pdf.setFontSize(22);
        pdf.text(this.exercise.name, margin, yOffset);
        yOffset += 10;

        // Add Exercise Details
        const details = [
          `Level: ${this.exercise.level}`,
          `Category: ${this.exercise.category}`,
          `Force: ${this.exercise.force}`,
          `Mechanic: ${this.exercise.mechanic}`,
          `Primary Muscles: ${this.exercise.primaryMuscles.join(", ")}`,
          `Secondary Muscles: ${this.exercise.secondaryMuscles.join(", ")}`,
          `Equipment: ${this.exercise.equipment}`,
        ];

        pdf.setFontSize(12);
        details.forEach((detail) => {
          pdf.text(detail, margin, yOffset);
          yOffset += 7;
        });

        // Add Instructions
        pdf.setFontSize(16);
        pdf.text("Instructions:", margin, yOffset);
        yOffset += 10;

        pdf.setFontSize(12);
        this.exercise.instructions.forEach((instruction, index) => {
          const text = `${index + 1}. ${instruction}`;
          const textLines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
          pdf.text(textLines, margin, yOffset);
          yOffset += textLines.length * 7;

          if (yOffset + 7 > pageHeight - margin) {
            pdf.addPage();
            yOffset = margin;
          }
        });

        // Add Images
        for (let image of this.images) {
          const img = await this.loadImage(image);
          const imgProps = pdf.getImageProperties(img);
          const imgWidth = pageWidth - 2 * margin;
          const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

          if (yOffset + imgHeight > pageHeight - margin) {
            pdf.addPage();
            yOffset = margin;
          }

          pdf.addImage(img, "JPEG", margin, yOffset, imgWidth, imgHeight);
          yOffset += imgHeight + margin;
        }

        pdf.save(`${this.exercise.name}.pdf`);
      } finally {
        this.loadingDownload = false;
      }
    },
    loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      });
    },
    async toggleBookmark(exercise, itemType) {
      this.loadingBookmark = true;
      try {
        await this.bookmarkOrUndo(exercise, itemType);
      } finally {
        this.loadingBookmark = false;
      }
    },
  },
  computed: {
    bookmarked() {
      return this.$store.state.bookmarkModule.exercise;
    },
  },
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
