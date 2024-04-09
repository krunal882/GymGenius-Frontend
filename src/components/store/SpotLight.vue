<template>
  <div class="container">
    <div class="card-container mt-10">
      <v-row cols="100%" md="20">
        <v-card class="mx-auto" v-for="(image, i) in images" :key="i">
          <img
            :key="i"
            class="align-end text-white"
            height="360"
            :src="image"
            cover
          />
        </v-card>
      </v-row>
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
  async created() {
    // Load images asynchronously using dynamic import
    const [image1, image2] = await Promise.all([
      import("../../assets/img/store/spotlight2.webp"),

      import("../../assets/img/store/spotlight1.webp"),
    ]);
    // Set the images array once both images are loaded
    this.images = [image1.default, image2.default];
  },
};
</script>

<style>
.card-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
