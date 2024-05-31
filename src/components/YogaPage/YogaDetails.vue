<!-- this component is for displaying the yogas to users -->
<!--it also provides buttons for the bookmarking and for navigating to previous page -->
<template>
  <v-container v-if="yoga">
    <v-card :class="{ 'd-flex': isWideScreen }" width="auto">
      <!-- carousal to display yoga images -->
      <div style="flex: 1; padding-right: 16px; position: relative">
        <v-img height="300" :src="yoga.url_png"> </v-img>
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
          <v-btn color="orange" @click="toggleBookmark(yoga, 'yoga')">
            {{ isBookmarked(yoga) ? "Undo Bookmark" : "Bookmark" }}
          </v-btn>
        </v-card-actions>
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
      images: [],
      yoga: null,
      isWideScreen: true,
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
