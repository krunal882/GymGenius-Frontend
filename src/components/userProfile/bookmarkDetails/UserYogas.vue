<!-- this component is for displaying the bookmarked yoga poses of the user -->
<template>
  <v-container>
    <v-row v-if="bookmarkedYogas.length != 0">
      <v-col
        v-for="yoga in bookmarkedYogas"
        :key="yoga.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card class="image-hover-effect" width="100%">
          <!-- yoga image -->
          <v-img
            height="200"
            :src="yoga.url_png"
            class="pointer"
            @click="exploreClicked(yoga)"
          >
          </v-img>
          <v-divider></v-divider>
          <!-- yoga pose information -->
          <v-card-text>
            <v-card-title class="text-center">{{
              yoga.sanskrit_name
            }}</v-card-title>
            <div class="mb-2">Category: {{ yoga.category_name }}</div>
            <div class="mb-2">English Name: {{ yoga.english_name }}</div>
            <div class="mb-2">Sanskrit Name: {{ yoga.sanskrit_name }}</div>
            <div>Translation: {{ yoga.translation_name }}</div>
          </v-card-text>
          <!-- buttons for explore and bookmark/undoBookmark -->
          <v-card-actions class="justify-space-between">
            <v-btn color="orange" @click="exploreClicked(yoga)">Explore</v-btn>
            <v-btn color="orange" @click="undoBookmark(yoga)"
              >Undo Bookmark</v-btn
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
    undoBookmark(yoga) {
      const userId = this.$store.state.userModule.userId;
      const yogaId = yoga._id;
      this.$store.dispatch("undoBookmark", {
        userId,
        itemId: yogaId,
        itemType: "yoga",
      });
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
</style>
