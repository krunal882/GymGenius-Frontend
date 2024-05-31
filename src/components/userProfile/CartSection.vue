<!-- parent component for the cart section -->
<template>
  <div>
    <h1 class="headline mb-5 text-center">Your Shopping Cart</h1>

    <div>
      <!-- cart component -->
      <CartProduct :product="cartItems" />
    </div>
  </div>
</template>

<script>
import CartProduct from "./CartProduct.vue";

export default {
  components: {
    CartProduct,
  },
  computed: {
    //to return cart items
    cartItems() {
      return this.$store.state.cartModule.cartItems;
    },
  },
};
</script>
