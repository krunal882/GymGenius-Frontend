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
        <v-card
          class="mx-auto image-hover-effect"
          max-width="260"
          @click="viewProduct(product)"
        >
          <v-img
            class="align-end text-white"
            height="346"
            :src="imgPath(product.src, product.category)"
            cover
          ></v-img>
          <v-card-title class="pb-0">{{ product.title }}</v-card-title>
          <v-card-subtitle class="py-2">{{ product.brand }}</v-card-subtitle>
          <v-card-text class="pt-0">
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
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    products: { type: Array, required: true },
  },
  methods: {
    imgPath(src, category) {
      const imgPath = `../../assets/img/products/${category}/${src}.jpg`;
      return imgPath;
    },
    viewProduct(product) {
      this.$emit("product-selected", product);
    },
  },
};
</script>

<style scoped>
.image-hover-effect:hover {
  transform: scale(1.1);
}
</style>
