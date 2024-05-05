<template>
  <v-container>
    <v-row
      v-if="bookmarkedNutritions.length != 0"
      style="justify-content: space-between"
    >
      <v-col
        v-for="foodItem in bookmarkedNutritions"
        :key="foodItem.id"
        cols="4"
      >
        <v-card class="text-black my-4 mx-2" min-width="350">
          <v-img
            class="align-end text-white"
            height="200"
            :src="imgPath(foodItem.name)"
            cover
          >
            <v-card-title>{{ foodItem.name }}</v-card-title>
          </v-img>
          <v-card-actions style="justify-content: space-between">
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

<style></style>
