<template>
  <v-sheet class="mx-auto" max-width="auto">
    <v-slide-group v-model="model" class="pa-4" show-arrows>
      <v-slide-group-item
        v-for="(product, index) in filteredProducts"
        :key="index"
      >
        <v-card
          class="ma-5 image-hover-effect"
          width="260"
          style="height: 92%"
          @click="viewProduct(product)"
        >
          <v-row class="d-flex flex-column">
            <v-col>
              <v-img
                class="align-end text-white"
                height="346"
                :src="imgPath(product)"
                cover
              ></v-img>
            </v-col>
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
import storeFilterMixin from "./storeFilterMixin";

export default {
  mixins: [storeFilterMixin],
  props: {
    product: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      model: null,
    };
  },
  computed: {
    filteredProducts() {
      if (!this.product) {
        return []; 
      }
      return this.product.filter(
        (product) => product.category === this.category
      );
    },
  },
  methods: {
    imgPath(product) {
      return `../../assets/img/products/${product.category}/${product.src}.jpg`;
    },
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
}
</style>
