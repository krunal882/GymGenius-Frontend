<!-- this component is for displaying the products information related to the category -->
<template>
  <div fluid class="container pr-0 pl-0 ml-0 mr-0 mt-10">
    <v-row class="d-flex flex-wrap">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="3"
        lg="3"
      >
        <!-- card component -->
        <v-card
          class="mx-auto mt-4 image-hover-effect"
          max-width="260"
          @click="viewProduct(product)"
        >
          <!-- image of the product -->
          <v-img
            class="align-end text-white"
            height="346"
            :src="imgPath(product.src, product.category)"
            alt="product image"
            cover
          ></v-img>
          <!-- information of the product -->
          <v-card-title class="pb-0">{{ product.title }}</v-card-title>
          <v-card-subtitle v-if="product.brand" class="py-2">{{
            product.brand
          }}</v-card-subtitle>
          <v-card-text class="pt-0">
            <div class="d-flex flex-wrap">
              <span>
                Price: <v-chip color="green">${{ product.price }}</v-chip>
              </span>
              <span class="mx-4" v-if="product.original_price">
                <v-chip color="red" style="text-decoration: line-through"
                  >${{ product.original_price }}</v-chip
                >
              </span>
              <span v-if="product.off">
                Discount: <v-chip color="blue">{{ product.off }}</v-chip>
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  // component will receive product info as a prop
  props: {
    products: { type: Array, required: true },
  },
  methods: {
    // to get image stored in local
    imgPath(src, category) {
      const imgPath = `../../assets/img/products/${category}/${src}.jpg`;
      return imgPath;
    },
    // to handle onClick on product card and redirect to product detail page
    viewProduct(product) {
      this.$emit("product-selected", product);
    },
  },
};
</script>

<style scoped>
.image-hover-effect:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
</style>
