<template>
  <div>
    <h1 class="headline mb-5">Your Shopping Cart</h1>

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
  mounted() {
    // Fetch product data when the component is mounted
    // this.fetchCart(this.cartItem._id);
    console.log(this.$store.user);
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
