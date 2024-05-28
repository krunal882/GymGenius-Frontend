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
          <v-img
            class="align-end text-white"
            height="250"
            :src="imgPath(foodItem.name)"
            cover
            @click="exploreClicked(foodItem)"
          >
            <v-card-title class="caption">{{ foodItem.name }}</v-card-title>
          </v-img>
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
    bookmarkedNutritions() {
      return this.$store.state.bookmarkModule.nutrition;
    },
  },
  methods: {
    exploreClicked(foodItem) {
      this.$emit("explore", { item: foodItem, route: "foodDetail" });
    },
    imgPath(foodItemName) {
      const imgPath = `../../assets/img/foodItem/${foodItemName}.jpg`;
      return imgPath;
    },
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
