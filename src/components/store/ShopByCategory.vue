<!-- this component provides user to shop by category option with posters -->
<template>
  <div class="card-container mt-10">
    <v-row cols="100%" md="20">
      <!-- poster to display on page -->
      <v-card
        class="mx-auto image-hover-effect"
        v-for="(image, i) in images"
        :key="i"
      >
        <router-link :to="{ name: pageRoutes[i] }">
          <img
            :key="i"
            class="align-end text-white"
            height="500"
            :src="image"
            cover
            alt="category image"
          />
        </router-link>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      pageRoutes: ["strength", "running", "yoga"],
    };
  },
  async created() {
    const [image1, image2, image3] = await Promise.all([
      import("../../assets/img/store/strength.webp"),
      import("../../assets/img/store/running.webp"),
      import("../../assets/img/store/YogaCategory.jpeg"),
    ]);
    this.images = [image1.default, image2.default, image3.default];
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.image-hover-effect:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.v-card {
  flex: 0 0 calc(33.33% - 20px);
  margin-bottom: 20px;
}

img {
  width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .v-card {
    flex-basis: calc(50% - 20px);
  }
}
</style>
