<!-- this component is for displaying the bookmarked yoga poses of the user -->
<template>
  <v-container fluid>
    <v-row v-if="bookmarkedYogas.length != 0">
      <v-col
        v-for="yoga in bookmarkedYogas"
        :key="yoga.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card class="image-hover-effect mx-auto" width="90%">
          <!-- yoga image -->
          <v-img
            height="200"
            :src="yoga.url_png"
            class="pointer"
            @click="exploreClicked(yoga)"
          >
          </v-img>
          <!-- yoga pose information -->
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
          <!-- buttons for explore and bookmark/undoBookmark -->
          <v-card-actions class="justify-space-between">
            <v-btn color="orange" @click="exploreClicked(yoga)">Explore</v-btn>
            <v-btn color="orange" @click="undoBookmark(yoga)">
              <v-progress-circular
                v-if="loadingYoga[yoga._id]"
                indeterminate
                color="white"
                size="20"
              ></v-progress-circular>
              <span v-if="!loadingYoga[yoga._id]"> UNDO BOOKMARK </span></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- message to display if there is no items -->
    <div v-else>
      <v-alert :value="true" color="info" icon="mdi-information">
        You do not have any bookmarked yogas. <br />
        Start exploring and bookmarking yogas
      </v-alert>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loadingYoga: {}, // To track loading state for each yoga
    };
  },
  computed: {
    // to fetch bookmarked item from store
    bookmarkedYogas() {
      return this.$store.state.bookmarkModule.yoga;
    },
  },
  methods: {
    //for navigate to detail page
    exploreClicked(yoga) {
      this.$emit("explore", { item: yoga, route: "yogaDetail" });
    },
    //to undo bookmark
    async undoBookmark(yoga) {
      const yogaId = yoga._id;
      this.loadingYoga[yogaId] = true;
      const userId = this.$store.state.userModule.userId;
      await this.$store.dispatch("undoBookmark", {
        userId,
        itemId: yogaId,
        itemType: "yoga",
      });
      this.loadingYoga[yogaId] = false;
    },
  },
};
</script>

<style scoped>
.image-hover-effect:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}
.pointer {
  cursor: pointer;
}
.label {
  font-weight: 500;
}
</style>
