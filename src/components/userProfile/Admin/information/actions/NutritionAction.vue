<!-- this component is for admin to show food-item and provide options to edit , explore and delete -->
<template>
  <v-container fluid>
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
            @click="exploreClicked(foodItem)"
            cover
          >
            <v-card-title class="caption">{{ foodItem.name }}</v-card-title>
          </v-img>
          <!-- buttons for explore , remove and edit -->
          <v-card-actions style="justify-content: space-between">
            <v-btn color="orange" @click="exploreClicked(foodItem)"
              >Explore</v-btn
            >
            <v-btn color="primary" @click="editClick(foodItem)">
              <v-icon left>mdi-pencil</v-icon> Edit</v-btn
            >
            <v-btn color="error" @click="deleteClick(foodItem)">
              <v-icon left>mdi-delete</v-icon> Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    foodItem: {
      type: Array,
      required: true,
    },
  },
  methods: {
    //to emit an event to navigate to detail page
    async exploreClicked(foodItem) {
      this.$router.push({
        name: "foodDetail",
        params: { id: foodItem._id },
      });
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
    //to emit an event to navigate to edit page
    editClick(foodItem) {
      this.$emit("edit-foodItem", foodItem);
    },
    //to emit an event to delete the food-item
    deleteClick(foodItem) {
      this.$emit("remove-foodItem", foodItem);
    },
  },
};
</script>

<style scoped>
.row-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
