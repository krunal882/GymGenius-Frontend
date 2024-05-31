<!-- this component provides the highlight on the store pages -->
<template>
  <div class="container">
    <div class="image-container">
      <v-card class="image-card" v-for="(image, i) in images" :key="i">
        <img :src="image" alt="Image" />
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
    };
  },
  // to set images on page load
  async created() {
    const [image1, image2] = await Promise.all([
      import("../../assets/img/store/spotlight2.webp"),
      import("../../assets/img/store/spotlight1.webp"),
    ]);
    this.images = [image1.default, image2.default];
  },
};
</script>

<style scoped>
.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.image-card {
  flex: 0 0 calc(50% - 10px);
  margin-bottom: 20px;
}

img {
  width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .image-card {
    flex-basis: 100%;
  }
}
</style>
