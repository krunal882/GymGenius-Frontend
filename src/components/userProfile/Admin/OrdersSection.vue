<template>
  <h1 class="subheading grey--text text-center">Customer Orders</h1>
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
    if (!this.orders.length) {
      this.$store.dispatch("getAllOrders");
    }
  },
};
</script>

<style></style>
