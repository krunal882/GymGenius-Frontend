<template>
  <v-container fluid>
    <v-row v-if="loading">
      <v-col
        v-for="n in this.foodItem.length"
        :key="n"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-skeleton-loader class="border" type="image"></v-skeleton-loader>
      </v-col>
    </v-row>
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
    imgPath(foodItemName, cloudImg) {
      if (cloudImg === undefined) {
        const imgPath = `../../assets/img/foodItem/${foodItemName}.jpg`;
        return imgPath;
      } else {
        return cloudImg;
      }
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

.muscle-label {
  font-weight: 500;
  margin-right: 10px;
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
