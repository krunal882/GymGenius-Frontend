<template>
  <v-container>
    <!-- Cart Items -->
    <v-row class="mb-5">
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

                <v-btn
                  @click="removeItem(item)"
                  color="success"
                  small
                  style="margin-top: 10px"
                  >Return</v-btn
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
  </v-container>
</template>

<script>
export default {
  props: {
    product: { type: Array, required: true },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    imgPath(src, category) {
      const imgPath = `../../assets/img/products/${category}/${src}.jpg`;

      return imgPath;
    },
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
