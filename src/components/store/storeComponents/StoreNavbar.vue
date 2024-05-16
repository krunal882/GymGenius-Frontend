<template>
  <nav
    class="navbar d-flex justify-content-center py-0 shadow"
    style="height: 50px; position: sticky"
  >
    <ul>
      <li><router-link :to="{ name: 'men' }">Men</router-link></li>
      <li><router-link :to="{ name: 'women' }">Women</router-link></li>
      <li><router-link :to="{ name: 'cardio' }">Cardio</router-link></li>
      <li><router-link :to="{ name: 'cycles' }">Cycles</router-link></li>
      <li>
        <router-link :to="{ name: 'accessories' }">Accessories</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'equipments' }">Equipments</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'supplements' }">Supplements</router-link>
      </li>
      <div class="cart-icon text-none mt-2">
        <v-badge color="error" :content="cartItemCount">
          <router-link :to="{ name: 'cart' }">
            <v-btn icon size="small">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </router-link>
        </v-badge>
      </div>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      count: this.$store.state.cartModule.cartItems.length,
    };
  },
  computed: {
    cartItemCount() {
      return this.$store.state.cartModule.cartItems.length;
    },
  },
  watch: {
    cartItemCount(newValue) {
      this.count = newValue;
    },
  },
};
</script>

<style scoped>
nav {
  background-color: white;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 100;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
  min-width: 600px;
}

nav ul li {
  float: left;
}

nav ul li a {
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

nav ul li a:hover {
  background-color: #111;
  color: white;
}
.cart-icon {
  display: flex;
  align-items: center;
}
</style>
