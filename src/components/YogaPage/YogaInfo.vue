<!-- this component gives the preview of the yoga that contains some info about yoga in card form -->
<!-- it also includes explore button to see full details and bookmark button for bookmarking -->
<template>
  <v-container fluid>
    <!-- skeleton loader for the card  -->
    <v-row v-if="loading">
      <v-col v-for="n in skeletonCount" :key="n" cols="12" sm="6" md="4" lg="4">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="image, article, chip@2"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else>
      <!-- yoga preview card -->
      <v-col v-for="yoga in yoga" :key="yoga.id" cols="12" sm="6" md="4" lg="4">
        <v-card class="image-hover-effect mx-auto" width="90%">
          <!-- yoga images -->
          <v-img
            height="200"
            :src="yoga.url_png"
            class="pointer"
            @click="exploreClicked(yoga)"
          >
          </v-img>
          <!-- yoga information -->
          <v-card-text class="pt-0">
            <v-card-title class="text-center">{{
              yoga.sanskrit_name
            }}</v-card-title>
            <div class="d-flex justify-space-between">
              <div class="mb-2">
                <span class="label"> Category:</span>
                {{ yoga.category_name }}
              </div>
              <div class="mb-2">
                <span class="label">English Name: </span>{{ yoga.english_name }}
              </div>
            </div>
            <div class="mb-2">
              <span class="label">Sanskrit Name: </span>{{ yoga.sanskrit_name }}
            </div>
            <div>
              <span class="label">Translation: </span
              >{{ yoga.translation_name }}
            </div>
          </v-card-text>
          <!-- buttons for explore and bookmark-undoBookmark -->
          <v-card-actions class="justify-space-between">
            <v-btn color="orange" @click="exploreClicked(yoga)">Explore</v-btn>
            <v-btn color="orange" @click="toggleBookmark(yoga, 'yoga')">
              {{ isBookmarked(yoga) ? "Undo Bookmark" : "Bookmark" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bookmarkMixin from "./../../mixins/bookmarkMixin.js";
export default {
  mixins: [bookmarkMixin],
  props: {
    yoga: {
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
      return this.loading ? this.yoga.length : 0;
    },
    //to check if yoga is bookmarked or not
    bookmarked() {
      return this.$store.state.bookmarkModule.yoga;
    },
  },
  methods: {
    //to emit an event to navigate to detail page
    exploreClicked(yoga) {
      this.$emit("explore", { item: yoga, route: "yogaDetail" });
    },
    //it provides the timer for skeleton loader
    loadData() {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
  //watcher for the yoga changes
  watch: {
    yoga: {
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
.image-hover-effect:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
.pointer {
  cursor: pointer;
}
.label {
  font-weight: 500;
}
</style>
