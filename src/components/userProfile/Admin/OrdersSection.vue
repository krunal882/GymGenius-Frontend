<template>
  <h3>Customer Orders</h3>
  <v-container>
    <OrderedProducts :product="orders" />
  </v-container>
</template>

<script>
import OrderedProducts from "./OrderedProducts.vue";
export default {
  computed: {
    orders() {
      return this.$store.state.adminModule.productData;
    },
  },
  components: { OrderedProducts },
  mounted() {
    this.$store.dispatch("getAllOrders");
  },
};
</script>

<style></style>
