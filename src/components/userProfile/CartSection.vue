<template>
  <div>
    <h1 class="headline mb-5 text-center">Your Shopping Cart</h1>

    <div>
      <CartProduct :product="cartItems" />
    </div>
    <!-- <p v-else>NO Product in the cart</p> -->
  </div>
</template>

<script>
import CartProduct from "./CartProduct.vue";
import { mapActions } from "vuex";

export default {
  components: {
    CartProduct,
  },
  computed: {
    cartItems() {
      return this.$store.state.cartModule.cartItems;
    },
  },
  methods: {
    ...mapActions(["fetchCart", "proceedToCheckout"]),
  },
};
</script>
