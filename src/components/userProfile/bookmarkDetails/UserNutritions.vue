<!-- this component is for displaying the bookmarked food-item of the user -->
<template>
  <v-container>
    <v-row class="d-flex flex-wrap" v-if="bookmarkedNutritions.length !== 0">
      <v-col
        v-for="foodItem in bookmarkedNutritions"
        :key="foodItem.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card class="text-black my-4 mx-2 image-hover-effect" width="90%">
          <!-- foodItem image -->
          <v-img
            class="align-end text-white"
            height="250"
            :src="imgPath(foodItem.name)"
            cover
            @click="exploreClicked(foodItem)"
          >
            <!-- exercise information -->
            <v-card-title class="caption">{{ foodItem.name }}</v-card-title>
          </v-img>
          <!-- buttons for explore and bookmark/undoBookmark -->
          <v-card-actions class="d-flex flex-wrap">
            <v-btn color="orange" @click="exploreClicked(foodItem)"
              >Explore</v-btn
            >
            <v-btn color="orange" @click="undoBookmark(foodItem)"
              >Undo Bookmark</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- message to display if there is no items -->
    <div v-else>
      <v-alert :value="true" color="info" icon="mdi-information">
        You do not have any bookmarked nutrition item. <br />
        Start exploring and bookmarking nutrition item
      </v-alert>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    // to fetch bookmarked item from store
    bookmarkedNutritions() {
      return this.$store.state.bookmarkModule.nutrition;
    },
  },
  methods: {
    //for navigate to detail page
    exploreClicked(foodItem) {
      this.$emit("explore", { item: foodItem, route: "foodDetail" });
    },
    //to fetch food-item image
    imgPath(foodItemName) {
      const imgPath = `../../assets/img/foodItem/${foodItemName}.jpg`;
      return imgPath;
    },
    //to undo bookmark
    undoBookmark(foodItem) {
      const userId = this.$store.state.userModule.userId;

      const foodId = foodItem._id;
      this.$store.dispatch("undoBookmark", {
        userId,
        itemId: foodId,
        itemType: "nutrition",
      });
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
}
.caption {
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px;
}
</style>
