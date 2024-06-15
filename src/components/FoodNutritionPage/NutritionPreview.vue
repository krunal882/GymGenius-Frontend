<!-- this component gives the preview of the foodItem nutrition that contains some info about foodItem in card form -->
<!-- it also includes explore button to see full details and bookmark button for bookmarking -->
<template>
  <v-container fluid>
    <!-- skeleton loader for the card  -->
    <!-- <v-row v-if="loading">
      <v-col v-for="n in 12" :key="n" cols="12" sm="6" md="4" lg="4">
        <v-skeleton-loader
          class="border mx-auto"
          type="image"
        ></v-skeleton-loader>
      </v-col>
    </v-row> -->
    <!-- foodItem preview card -->
    <v-row class="d-flex flex-wrap">
      <v-col
        v-for="foodItem in foodItem"
        :key="foodItem.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card width="90%" class="text-black my-4 mx-2 image-hover-effect">
          <!-- foodItem image -->
          <v-img
            class="align-end text-white"
            height="250"
            :src="imgPath(foodItem.name, foodItem.cloudImg)"
            cover
            @click="exploreClicked(foodItem)"
          >
            <v-card-title class="caption">{{ foodItem.name }}</v-card-title>
          </v-img>
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
    foodItem: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    //to check if foodItem is bookmarked or not
    bookmarked() {
      return this.$store.state.bookmarkModule.nutrition;
    },
  },
  methods: {
    //to emit an event to navigate to detail page
    exploreClicked(foodItem) {
      this.$emit("explore", { item: foodItem, route: "foodDetail" });
    },
    //to get image form the local or stored on cloud
    imgPath(foodItemName, cloudImg) {
      if (cloudImg === undefined) {
        const imgPath = `../../assets/img/foodItem/${foodItemName}.jpg`;
        return imgPath;
      } else {
        return cloudImg;
      }
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
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.image-hover-effect {
  cursor: pointer;
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
