<!-- this component is for displaying the carousal of the product cards with specified category -->
<template>
  <v-sheet class="mx-auto" max-width="">
    <v-slide-group class="pa-4" show-arrows>
      <v-slide-group-item v-for="(product, index) in product" :key="index">
        <!-- product card -->
        <v-card
          class="ma-5 image-hover-effect"
          width="260"
          style="height: 92%"
          @click="viewProduct(product)"
        >
          <!-- product image  -->
          <v-row class="d-flex flex-column">
            <v-col>
              <v-img
                class="align-end text-white"
                height="346"
                :src="imgPath(product)"
                cover
              ></v-img>
            </v-col>
            <!-- product information -->
            <v-col class="pt-4">
              <v-card-title class="pb-0 pt-0" style="font-size: large">{{
                product.title
              }}</v-card-title>

              <v-card-text class="pt-0">
                <div class="d-flex flex-wrap">
                  <span
                    >Price:
                    <v-chip color="green">{{ product.price }}</v-chip></span
                  >
                  <span class="mx-4">
                    <v-chip color="red" style="text-decoration: line-through">{{
                      product.original_price
                    }}</v-chip>
                  </span>
                  <span
                    >Discount:
                    <v-chip color="blue">{{ product.off }}</v-chip></span
                  >
                </div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
// imported mixin to reuse methods
import storeFilterMixin from "../../mixins/storeFilterMixin";

export default {
  mixins: [storeFilterMixin],
  // product detail will be received through props
  props: {
    product: {
      type: Array,
      required: true,
    },
  },

  methods: {
    // to get image stored in local
    imgPath(product) {
      return `../../assets/img/products/${product.category}/${product.src}.jpg`;
    },
    // to handle click on card
    viewProduct(product) {
      this.$emit("product-selected", product);
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 10px;
}
.image-hover-effect:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
</style>
