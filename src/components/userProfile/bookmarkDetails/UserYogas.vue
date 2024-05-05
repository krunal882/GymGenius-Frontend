<template>
  <v-container>
    <div v-if="bookmarkedYogas.length != 0">
      <v-col v-for="yoga in bookmarkedYogas" :key="yoga.id" cols="4">
        <v-card class="" width="900" style="display: flex">
          <!-- Image container -->
          <div style="flex: 1; padding-right: 16px">
            <v-img height="300" :src="yoga.url_png">
              <v-card-title class="text-center"></v-card-title>
            </v-img>
          </div>
          <hr
            style="
              height: 100%;
              border: none;
              border-right: 1px solid #ccc;
              margin: 0;
            "
          />

          <!-- Content container -->
          <div style="flex: 1; padding: 16px">
            <v-card-title class="pt-4"
              >Category: {{ yoga.category_name }}</v-card-title
            >
            <div class="d-flex">
              <v-card-text class="pt-4 flex-grow-1"
                >English Name: {{ yoga.english_name }}</v-card-text
              >
              <v-card-text class="pt-4 flex-grow-1"
                >Sanskrit Name: {{ yoga.sanskrit_name }}</v-card-text
              >
            </div>
            <v-card-text
              >Translation of Name: {{ yoga.translation_name }}</v-card-text
            >

            <v-card-actions style="justify-content: space-between">
              <!-- Emit an event when the Explore button is clicked -->
              <v-btn color="orange" @click="undoBookmark(yoga)"
                >Undo Bookmark</v-btn
              >
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </div>
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
    bookmarkedYogas() {
      return this.$store.state.bookmarkModule.yoga;
    },
  },
  methods: {
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

<style></style>
