<!-- this component is for displaying the yogas to users -->
<!--it also provides buttons for the bookmarking and for navigating to previous page -->
<template>
  <v-container>
    <v-card v-if="yoga" :class="{ 'd-flex': isWideScreen }" width="auto">
      <!-- carousal to display yoga images -->
      <div style="flex: 1; padding-right: 16px; position: relative">
        <v-img height="300" :src="yoga.url_png" alt="yoga pose image"> </v-img>
        <div
          style="
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 16px;
          "
        >
          <!-- yoga details -->
          <v-card-title class="pt-4"> Pose Benefits:</v-card-title>
          <v-card-text>{{ yoga.pose_benefits }}</v-card-text>
          <v-card-title class="pose-description">
            Category Description:
          </v-card-title>
          <v-card-text>{{ yoga.category_description }}</v-card-text>
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
        <v-card-title class="pt-4"
          >Category: {{ yoga.category_name }}</v-card-title
        >
        <div class="d-flex">
          <v-card-text class="pt-4 flex-grow-1"
            ><span class="label"> English Name:</span>
            {{ yoga.english_name }}</v-card-text
          >
          <v-card-text class="pt-4 flex-grow-1"
            ><span class="label"> Sanskrit Name: </span
            >{{ yoga.sanskrit_name }}</v-card-text
          >
        </div>
        <v-card-text
          ><span class="label"> Translation of Name: </span>
          {{ yoga.translation_name }}</v-card-text
        >
        <v-card-title class="pt-4">Pose Description:</v-card-title>
        <v-card-text class="pose-description">
          {{ yoga.pose_description }}
        </v-card-text>
        <!-- action buttons for the bookmark/undoBookmark and navigation to previous page -->
        <v-card-actions>
          <v-btn color="orange" @click="back">Go Back</v-btn>
          <v-btn
            color="orange"
            @click="toggleBookmark(yoga, 'yoga')"
            :disabled="loadingYoga[yoga._id]"
          >
            <v-progress-circular
              v-if="loadingYoga[yoga._id]"
              indeterminate
              size="20"
            ></v-progress-circular>
            <span v-if="!loadingYoga[yoga._id]">
              {{ isBookmarked(yoga) ? "Undo Bookmark" : "Bookmark" }}
            </span>
          </v-btn>
          <v-btn color="orange" @click="downloadPDF">Download PDF</v-btn>
        </v-card-actions>
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
      images: [],
      yoga: null,
      isWideScreen: true,
      loadingYoga: {}, // To track loading state for each yoga
    };
  },
  methods: {
    //this method fetches the yoga by id by calling action in the store
    async fetchYoga(id) {
      try {
        await this.$store.dispatch("fetchYoga", { id });
      } catch (error) {
        console.log(error);
      }
      this.yoga = this.$store.state.yogaModule.yogaDetail[0];
    },
    //it navigates to the previous page
    back() {
      this.$router.go(-1);
    },
    //it handles the screen sizing
    handleResize() {
      this.isWideScreen = window.innerWidth > 790;
    },

    loadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = url;
      });
    },
    // Override toggleBookmark to handle loading state
    async toggleBookmark(yoga, itemType) {
      const yogaId = yoga._id;
      this.loadingYoga[yogaId] = true;

      try {
        await this.bookmarkOrUndo(yoga, itemType);
      } finally {
        this.loadingYoga[yogaId] = false;
      }
    },
    // This method generates a PDF with the yoga details and an image
    async downloadPDF() {
      const pdf = new jsPDF("p", "mm", "a4");
      const margin = 10;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yOffset = margin;

      if (this.yoga) {
        // Add Yoga Name
        pdf.setFontSize(22);
        pdf.text(this.yoga.english_name, margin, yOffset);
        yOffset += 10;

        // Add Yoga Image
        if (this.yoga.url_png) {
          const img = await this.loadImage(this.yoga.url_png);
          const imgProps = pdf.getImageProperties(img);
          const imgWidth = pageWidth - 2 * margin;
          const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

          if (yOffset + imgHeight > pageHeight - margin) {
            pdf.addPage();
            yOffset = margin;
          }

          pdf.addImage(img, "PNG", margin, yOffset, imgWidth, imgHeight);
          yOffset += imgHeight + 10;
        }

        // Add Yoga Details
        const details = [
          `Category: ${this.yoga.category_name}`,
          `Sanskrit Name: ${this.yoga.sanskrit_name}`,
          `Translation of Name: ${this.yoga.translation_name}`,
          `Pose Benefits: ${this.yoga.pose_benefits}`,
          `Category Description: ${this.yoga.category_description}`,
        ];

        pdf.setFontSize(12);
        details.forEach((detail) => {
          pdf.text(detail, margin, yOffset);
          yOffset += 7;
        });

        // Add Pose Description
        pdf.setFontSize(16);
        pdf.text("Pose Description:", margin, yOffset);
        yOffset += 10;

        pdf.setFontSize(12);
        const descriptionLines = pdf.splitTextToSize(
          this.yoga.pose_description,
          pageWidth - 2 * margin
        );
        pdf.text(descriptionLines, margin, yOffset);
        yOffset += descriptionLines.length * 7;
      }

      pdf.save(`${this.yoga.english_name}.pdf`);
    },
  },
  computed: {
    //it returns the bookmarked yoga of the user
    bookmarked() {
      return this.$store.state.bookmarkModule.yoga;
    },
  },
  //created lifecycle hook fetch the yoga using the id in route
  async created() {
    const { id } = this.$route.params;
    await this.fetchYoga(id);
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
.label {
  font-weight: 500;
}
</style>
