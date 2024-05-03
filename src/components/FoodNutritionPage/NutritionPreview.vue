<template>
  <v-container>
    <v-row style="justify-content: space-between">
      <v-col v-for="foodItem in foodItem" :key="foodItem.id" cols="4">
        <v-card class="text-black my-4 mx-2" min-width="350">
          <v-img
            class="align-end text-white"
            height="200"
            :src="imgPath(foodItem.name)"
            cover
            @click="exploreClicked(foodItem)"
          >
            <v-card-title>{{ foodItem.name }}</v-card-title>
          </v-img>
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
    exploreClicked(foodItem) {
      this.$emit("explore", foodItem);
    },
    imgPath(foodItemName) {
      const imgPath = `../../assets/img/foodItem/${foodItemName}.jpg`;
      return imgPath;
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

.content {
  flex: 1;
  padding: 16px;
}

.subtitle-row {
  display: flex;
  justify-content: space-between;
}
</style>
