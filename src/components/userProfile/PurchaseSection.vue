<!-- this component is parent component for displaying users purchases -->
<template>
  <h1 class="headline mb-5 text-center">Your purchase history</h1>
  <div>
    <UserPurchase :product="historyItems" />
  </div>
</template>

<script>
import UserPurchase from "./UserPurchase";
export default {
  components: {
    UserPurchase,
  },

  computed: {
    historyItems() {
      return this.$store.state.cartModule.history;
    },
  },
  // to fetch users product in cart
  created() {
    const id = this.$store.state.userModule.userId;
    if (!this.historyItems.length) {
      this.$store.dispatch("fetchCart", { userId: id, status: "done" });
    }
  },
};
</script>

<style></style>
