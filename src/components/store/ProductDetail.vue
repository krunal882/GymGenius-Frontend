<template>
  <div class="d-flex m-5">
    <v-card width="400px">
      <v-img
        class="align-end text-white"
        height="550"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover
      >
      </v-img>
    </v-card>
    <div class="product-details">
      <v-card-text>Product Brand</v-card-text>
      <v-card-title>Product Title</v-card-title>

      <div class="d-flex" style="width: fit-content">
        <v-card-text
          >Final Price : <v-chip color="green">$ 389 </v-chip></v-card-text
        >
        <v-card-text style="margin-left: 10px">
          Original Price :<v-chip color="red"> <del>$ 599 </del></v-chip>
        </v-card-text>
      </div>
      <v-card-text>
        Off :<v-chip color="secondary"> $ 210 </v-chip>
      </v-card-text>
      <v-card-text>
        <div style="font-weight: bold">Product Description :</div>
        <br />

        {product title} Get 1 Year Free Subscription of cultsport play - An
        Immersive Fitness Game, Free Diet & Fitness Plan for 3 month along with
        1 Doctor Consultation & Personal Video Training Session, Warranty: 6
        Months Warranty on Manufacturing defects.
      </v-card-text>
      <div class="d-flex">
        <v-text-field
          :counter="6"
          label="Enter Pincode"
          placeholder="Enter your pincode"
          outlined
          dense
          maxlength="6"
          style="width: 50px"
        >
        </v-text-field>
        <v-btn color="secondary" height="55">Check</v-btn>
      </div>
      <v-card-text style="font-weight: bold"
        >- Free delivery within 5 -7 days <br />
        - No returns available
        <br />- 10 days exchange available <br />- Free door-step installation
        by cultsport team after delivery</v-card-text
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.product-details {
  width: calc(100% - 400px); /* Subtract the width of the image card */
  padding-left: 20px; /* Adjust as needed */
}
</style>
