/* eslint-disable */
<template>
  <div>
    <div id="carouselExampleIndicators" class="carousel slide mb-5">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" v-for="(image, i) in images" :key="i">
          <img :src="image" class="d-block w-100" alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [""],
    };
  },
  components: {},
  async created() {
    const [image1, image2, image3] = await Promise.all([
      import("../../../assets/img/store-crousel-img2.png"),
      import("../../../assets/img/store-crousel-img3.png"),
      import("../../../assets/img/store-crousel-img4.png"),
    ]);
    this.images = [image1.default, image2.default, image3.default];
  },
};
</script>

<style></style>
