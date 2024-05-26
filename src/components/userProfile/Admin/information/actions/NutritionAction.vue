<template>
  <v-container>
    <!-- <v-row v-if="loading">
        <v-col v-for="n in this.foodItem.length" :key="n" cols="4">
          <v-skeleton-loader
            class="mx-auto border"
            max-width="300"
            type="image, article, chip@2"
          ></v-skeleton-loader>
        </v-col>
      </v-row> -->
    <v-row class="d-flex flex-wrap">
      <v-col
        v-for="foodItem in foodItem"
        :key="foodItem.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card width="100%" class="text-black my-4 mx-2 image-hover-effect">
          <v-img
            class="align-end text-white"
            height="200"
            :src="imgPath(foodItem.name, foodItem.cloudImg)"
            cover
          >
            <v-card-title>{{ foodItem.name }}</v-card-title>
          </v-img>
          <v-card-actions style="justify-content: space-between">
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
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    skeletonCount() {
      return this.loading ? this.foodItem.length : 0;
    },
  },
  methods: {
    imgPath(foodItemName, cloudImg) {
      if (cloudImg === undefined) {
        const imgPath = `../../assets/img/foodItem/${foodItemName}.jpg`;
        return imgPath;
      } else {
        return cloudImg;
      }
    },
    editClick(foodItem) {
      this.$emit("edit-foodItem", foodItem);
    },
    deleteClick(foodItem) {
      this.$emit("remove-foodItem", foodItem);
    },
    loadData() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
  watch: {
    foodItem: {
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
.row-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.image-hover-effect:hover {
  transform: scale(1.1);
}
</style>
