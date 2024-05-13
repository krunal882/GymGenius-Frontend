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
  created() {
    const id = this.$store.state.userModule.userId;
    this.$store.dispatch("fetchCart", { userId: id, status: "done" });
  },
  computed: {
    historyItems() {
      return this.$store.state.cartModule.history;
    },
  },
};
</script>

<style></style>
