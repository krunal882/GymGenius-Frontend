<template>
  <v-container>
    <!-- Cart Items -->
    <v-row class="mb-5" v-if="product.length > 0">
      <v-col cols="12" v-for="(item, index) in this.product" :key="index">
        <v-card class="cart-item">
          <v-row>
            <v-col cols="4">
              <v-img
                :src="imgPath(item.src, item.category)"
                aspect-ratio="1"
              ></v-img>
            </v-col>
            <v-col cols="8">
              <div class="item-details">
                <h3>{{ item.title }}</h3>
                <v-card-text class="pt-0">
                  <div class="d-flex flex-wrap">
                    <span
                      >Price:
                      <v-chip color="green">{{ item.price }}</v-chip></span
                    >
                    <span class="mx-4">
                      <v-chip
                        color="red"
                        style="text-decoration: line-through"
                        >{{ item.original_price }}</v-chip
                      >
                    </span>
                  </div>
                </v-card-text>
                <v-card-text>
                  <span
                    >Discount:
                    <v-chip color="blue">{{ item.off }}</v-chip></span
                  >
                </v-card-text>
                <div class="input-group plus-minus">
                  <button
                    class="btn btn-outline-secondary"
                    :class="loading ? 'disabled' : ''"
                    @click="addOrRemove(index, -1)"
                    type="button"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    v-model="qty[index]"
                    class="form-control form-control-sm text-center"
                    placeholder="1"
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    :class="loading ? 'disabled' : ''"
                    @click="addOrRemove(index, 1)"
                    type="button"
                  >
                    +
                  </button>
                </div>
                <v-btn
                  @click="removeItem(item)"
                  color="error"
                  small
                  style="margin-top: 10px"
                  >Remove</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-else type="info" class="mb-5">
      Your cart is empty. Feel free to explore our products and add them to your
      cart.
    </v-alert>

    <v-card v-if="product.length > 0" class="cart-summary">
      <v-card-text>
        <h3 class="mb-3">Cart Summary</h3>
        <p>Total Items: {{ totalItems }}</p>
        <p>Total Price: {{ totalPrice }} ₹</p>
        <v-btn color="primary" @click="proceedToCheckout(index)"
          >Proceed to Checkout</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    product: { type: Array, required: true },
  },
  data() {
    return {
      loading: false,
      qty: [],
    };
  },
  computed: {
    totalItems() {
      return this.qty.reduce((total, qty) => total + qty, 0);
    },
    totalPrice() {
      return this.product.reduce(
        (total, item, index) => total + item.price * this.qty[index],
        0
      );
    },
  },
  methods: {
    ...mapActions(["fetchCart", "removeCart", "proceedToCheckout"]),

    async addOrRemove(index, number) {
      if (number == 1 && this.qty[index] < 10) {
        this.qty[index]++;
      } else if (number == -1 && this.qty[index] > 1) {
        this.qty[index]--;
      }
    },
    async removeItem(item) {
      const id = item._id;
      const userId = this.$store.state.userModule.userId;
      this.removeCart({ productId: id, userId });
    },

    imgPath(src, category) {
      const imgPath = `../../assets/img/products/${category}/${src}.jpg`;

      return imgPath;
    },
    proceedToCheckout() {
      const id = this.product.map((item) => item._id);
      const userId = this.$store.state.userModule.userId;

      this.$store.dispatch("purchase", {
        title: "GymGenius products",
        price: this.totalPrice,
        quantity: this.totalItems,
        productId: id,
        userId: userId,
      });
    },
  },
  watch: {
    product: {
      handler() {
        this.qty = new Array(this.product.length).fill(1);
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.qty = new Array(this.product.length).fill(1);
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
.plus-minus input {
  max-width: 50px;
}
</style>
