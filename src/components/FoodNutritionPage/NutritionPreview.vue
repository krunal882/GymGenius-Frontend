<template>
  <v-container>
    <v-row v-if="loading">
      <v-col v-for="n in this.foodItem.length" :key="n" cols="4">
        <v-skeleton-loader
          class="mx-auto border"
          max-width="300"
          type="image, article, chip@2"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else style="justify-content: space-between">
      <v-col v-for="foodItem in foodItem" :key="foodItem.id" cols="4">
        <v-card class="text-black my-4 mx-2 image-hover-effect" min-width="350">
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
    exploreClicked(foodItem) {
      this.$emit("explore", foodItem);
    },
    imgPath(foodItemName) {
      const imgPath = `../../assets/img/foodItem/${foodItemName}.jpg`;
      return imgPath;
    },
    loadData() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
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

.content {
  flex: 1;
  padding: 16px;
}

.subtitle-row {
  display: flex;
  justify-content: space-between;
}

.image-hover-effect:hover {
  transform: scale(1.1);
}
</style>
