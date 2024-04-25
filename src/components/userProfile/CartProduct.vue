<template>
  <v-container>
    <!-- Cart Items -->
    <v-row class="mb-5">
      {{ console.log(cartItems) }}
      <v-col cols="12">
        <v-card class="cart-item">
          <v-row>
            <v-col cols="4">
              <v-img
                :src="imgPath(cartItems.src, cartItems.category)"
                aspect-ratio="1"
              ></v-img>
            </v-col>
            <v-col cols="8">
              <div class="item-details">
                <h3>{{ cartItems.title }}</h3>
                <v-card-text class="pt-0">
                  <div class="d-flex flex-wrap">
                    <span
                      >Price:
                      <v-chip color="green">{{ cartItems.price }}</v-chip></span
                    >
                    <span class="mx-4">
                      <v-chip
                        color="red"
                        style="text-decoration: line-through"
                        >{{ cartItems.original_price }}</v-chip
                      >
                    </span>
                  </div>
                </v-card-text>
                <v-card-text>
                  <span
                    >Discount:
                    <v-chip color="blue">{{ cartItems.off }}</v-chip></span
                  >
                </v-card-text>
                <v-text-field
                  key="cartItems._id"
                  label="Quantity"
                  type="number"
                  outlined
                  dense
                  min="1"
                ></v-text-field>
                <v-btn @click="removeItem(item)" color="error" small
                  >Remove</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty Cart Message -->
    <!-- <v-alert v-else type="info" class="mb-5">Your cart is empty.</v-alert> -->

    <!-- Cart Summary -->
    <v-card v-if="product.length > 0" class="cart-summary">
      <v-card-text>
        <h3 class="mb-3">Cart Summary</h3>
        <p>Total Items: {{ totalItems }}</p>
        <p>Total Price: {{ totalPrice }}</p>
        <v-btn color="primary" @click="proceedToCheckout"
          >Proceed to Checkout</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    product: { type: Object, required: true },
  },
  data() {
    // Initialize quantity for each item to 1
    const quantity = {};
    // this.product.forEach((item) => {
    //   quantity[item.id] = 1;
    // });

    return {
      quantity: quantity,
    };
  },
  computed: {
    ...mapGetters(["getCartItems", "totalItems", "totalPrice"]),
    cartItems() {
      return this.getCartItems;
    },
    totalItems() {
      return Object.values(this.quantity).reduce(
        (total, qty) => total + qty,
        0
      );
    },
    totalPrice() {
      return this.product.reduce(
        (total, item) => total + item.price * this.quantity[item.id],
        0
      );
    },
  },
  methods: {
    ...mapActions(["fetchCart", "proceedToCheckout"]),

    removeItem(item) {
      const index = this.cartItems.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
    },
    imgPath(src, category) {
      const imgPath = `../../assets/img/products/${category}/${src}.jpg`;
      return imgPath;
    },
    proceedToCheckout() {
      // Redirect to checkout page or perform necessary actions
      console.log("Proceed to checkout");
    },
  },
  watch: {
    quantity: {
      handler() {
        // Recalculate totalItems whenever the quantity changes
        this.$nextTick(() => {
          this.$forceUpdate();
        });
      },
    },
  },
  created() {
    console.log("hi");
    console.log(this.cartItem);
    // Fetch cart items when the component is created
    this.fetchCart({ id: this.product._id });
    console.log(this.product._id);
  },
};
</script>

<style scoped>
.headline {
  font-size: 2rem;
}

.cart-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  transition: box-shadow 0.3s;
}

.cart-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item-details h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.cart-summary {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
}
</style>
