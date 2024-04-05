<template>
  <div>
    <div class="col-md-6 col-sm-6 col-xs-12">
      <h1 class="text-center font-size">New Arrivals</h1>
      <!-- <div class="text-center">
        <v-btn href="/store" class="white--text" outlined>SHOP NOW</v-btn>
      </div> -->
      <v-card class="mx-auto my-8" max-width="260">
        <img
          class="align-end text-white"
          height="346"
          src="../../assets/cL1Pr6BcPN1gtXLBeVMdGv8U.jpg"
          cover
        />
        <v-card-title>Product name</v-card-title>

        <v-card-subtitle> brand name </v-card-subtitle>

        <v-card-text>
          <div>
            <span>$price </span>
            <span class="mx-8"> off price</span>
            <span class="mx-1"> off %</span>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   heading: String,
  //   imageSrc: String,
  //   price: String,
  // },
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
