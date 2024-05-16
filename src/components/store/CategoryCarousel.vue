<template>
  <v-carousel
    height="fit-content"
    show-arrows="hover"
    cycle
    hide-delimiter-background
  >
    <v-carousel-item v-for="(image, i) in images" :key="i">
      <v-sheet style="height: auto">
        <div class="d-flex fill-height justify-center align-center">
          <img :src="image" class="d-block w-100" alt="..." />
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      carouselHeight: "640px",
    };
  },
  async created() {
    const imageHeights = await Promise.all(
      this.images.map((image) => this.getImageNaturalHeight(image))
    );

    const maxImageHeight = Math.max(...imageHeights);
    this.carouselHeight = maxImageHeight + "px";
  },
  methods: {
    getImageNaturalHeight(src) {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img.naturalHeight);
      });
    },
  },
};
</script>

<style scoped>
.carousel-container {
  height: auto;
  overflow: hidden;
}

.carousel-container .v-carousel {
  height: 100%;
}
</style>
