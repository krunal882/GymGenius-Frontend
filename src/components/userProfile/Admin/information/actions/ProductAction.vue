<!-- this component is for admin to show product and provide options to edit , explore and delete -->
<template>
  <v-container class="pt-0">
    <div fluid class="container pr-0 pl-0 ml-0 mr-0 mt-10">
      <v-row class="d-flex flex-wrap">
        <v-col
          v-for="product in products"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="4"
        >
          <v-card class="mx-auto image-hover-effect mt-5" max-width="270">
            <!-- product image -->
            <v-img
              class="align-end text-white"
              height="346"
              :src="imgPath(product.src, product.category, product.cloudImg)"
              @click="exploreClicked(product)"
              cover
            ></v-img>
            <!-- product information -->
            <v-card-title class="pb-0">{{ product.title }}</v-card-title>
            <v-card-subtitle class="py-2">{{ product.brand }}</v-card-subtitle>
            <v-card-text class="pt-0 pb-0">
              <div class="d-flex flex-wrap">
                <span>
                  Price: <v-chip color="green">{{ product.price }}</v-chip>
                </span>
                <span class="mx-4">
                  <v-chip color="red" style="text-decoration: line-through">{{
                    product.original_price
                  }}</v-chip>
                </span>
                <span>
                  Discount: <v-chip color="blue">{{ product.off }}</v-chip>
                </span>
              </div>
            </v-card-text>
            <!-- buttons for explore , remove and edit -->
            <v-card-actions style="justify-content: space-between">
              <v-btn color="orange" @click="exploreClicked(product)"
                >Explore</v-btn
              >
              <v-btn color="primary" @click="editClick(product)">
                <v-icon left>mdi-pencil</v-icon> Edit</v-btn
              >
              <v-btn color="error" @click="deleteClick(product)">
                <v-icon left>mdi-delete</v-icon> Delete</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    products: { type: Array, required: true },
  },
  methods: {
    exploreClicked(product) {
      this.$router.push({
        name: "productDetail",
        params: { category: product.category, id: product._id },
      });
    },
    imgPath(src, category, cloudImg) {
      if (cloudImg === undefined) {
        const imgPath = `../../../../../assets/img/products/${category}/${src}.jpg`;
        return imgPath;
      } else {
        const imgPath = cloudImg;
        return imgPath;
      }
    },
    editClick(product) {
      this.$emit("edit-product", product);
    },
    deleteClick(product) {
      this.$emit("remove-product", product);
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

.image-hover-effect {
  cursor: pointer;
}
</style>
