<!-- this component is for displaying the specific single product information  -->
<template>
  <v-container v-if="product" class="my-5">
    <v-row>
      <v-col cols="12" md="4">
        <!-- image of product -->
        <v-img
          class="align-end text-white"
          :src="productImg(product.src, product.category)"
          cover
        />
      </v-col>
      <!-- product information -->
      <v-col cols="12" md="8">
        <div class="product-details">
          <v-card-text>{{ product.brand }}</v-card-text>
          <v-card-title>{{ product.title }}</v-card-title>

          <div class="d-flex flex-wrap price-details">
            <v-card-text>
              Final Price :
              <v-chip color="green">$ {{ product.price }}</v-chip>
            </v-card-text>
            <v-card-text class="ml-2">
              Original Price :
              <v-chip color="red">
                <del>$ {{ product.original_price }}</del>
              </v-chip>
            </v-card-text>
          </div>
          <v-card-text>
            Off :
            <v-chip color="secondary"> $ {{ product.off }} </v-chip>
          </v-card-text>
          <!-- product description -->
          <v-card-text>
            <div style="font-weight: bold">Product Description :</div>
            <br />
            {{ product.title }} Get 1 Year Free Subscription of cultsport play -
            An Immersive Fitness Game, Free Diet & Fitness Plan for 3 month
            along with 1 Doctor Consultation & Personal Video Training Session,
            Warranty: 6 Months Warranty on Manufacturing defects.
          </v-card-text>
          <!-- action buttons for buy and cart options -->
          <v-row justify="center">
            <v-col cols="12" md="4" sm="6">
              <v-btn
                rounded="xl"
                size="large"
                color="red"
                @click="buyProduct"
                block
              >
                Buy Now
              </v-btn>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-btn
                rounded="xl"
                size="large"
                color="red"
                block
                @click="addToCartClicked(product)"
                :disabled="isAddedToCart"
              >
                {{ isAddedToCart ? "Added to Cart" : "Add to Cart" }}
              </v-btn>
            </v-col>
          </v-row>
          <!-- pincode field -->
          <div class="d-flex mt-5">
            <v-text-field
              ref="pincodeField"
              v-model="pincode"
              :rules="indianPincode"
              label="Enter Pincode"
              placeholder="Enter your pincode"
              outlined
              dense
              type="text"
              maxlength="6"
              style="width: 150px"
            ></v-text-field>
            <v-btn color="secondary" height="55" @click="checkPincode"
              >Check</v-btn
            >
          </div>
          <p v-if="isPincodeValid === true" class="green-text">
            You are eligible for delivery
          </p>
          <p v-else-if="isPincodeValid === false" class="red-text">
            Invalid pincode
          </p>
          <v-card-text style="font-weight: bold">
            - Free delivery within 5 -7 days <br />
            - Returns available only on damages<br />
            - 10 days exchange available <br />
            - Free door-step installation by GymGenius team after delivery
          </v-card-text>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      addedToCart: false,
      pincode: "",
      isPincodeValid: null,
      indianPincode: [(value) => /^[1-9][0-9]{5}$/.test(value) || false],
      productDetail: [],
    };
  },
  //to fetch product detail when page loads
  async created() {
    const { id } = this.$route.params;
    await this.fetchProduct(id);
    if (this.cartItems.length) {
      this.checkIfAddedToCart();
    }
  },
  //watcher for the cartItems change
  watch: {
    cartItems(newCartItems, oldCartItems) {
      if (newCartItems !== oldCartItems) {
        this.checkIfAddedToCart();
      }
    },
  },
  methods: {
    //to get image stored in local
    productImg(src, category) {
      return `../../assets/img/products/${category}/${src}.jpg`;
    },
    //to handle add to cart event
    addToCartClicked(product) {
      this.$store.dispatch("addToCart", {
        productId: product._id,
        status: "pending",
        userId: this.$store.state.userModule.userId,
        product,
      });
      this.addedToCart = true;
    },
    //to handle buyNow event
    buyProduct() {
      this.$store.dispatch("purchase", {
        price: this.product.price,
        title: this.product.title,
        quantity: 1,
        productId: [this.product._id],
        userId: this.$store.state.userModule.userId,
        email: this.$store.state.userModule.email,
      });
    },
    //to make an request in backend for product information , call action in store
    async fetchProduct(productId) {
      try {
        const url = "http://localhost:3000/store";
        const filteredFilters = { id: productId };
        await this.$store.dispatch("fetchProduct", {
          filteredFilters,
          url,
          store: "detail",
          page: 1,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    },
    //check for valid pincode
    checkPincode() {
      this.isPincodeValid = this.indianPincode[0](this.pincode);

      setTimeout(() => {
        this.isPincodeValid = null;
      }, 2000);
    },
    //to check if product is already added to cart or not
    checkIfAddedToCart() {
      const productInCart = this.cartItems?.some(
        (item) => item._id === this.product._id
      );
      this.addedToCart = productInCart;
    },
  },
  //to fetch information stored in vuex store modules
  computed: {
    product() {
      return this.$store.state.productsModule.detail[0];
    },
    cartItems() {
      return this.$store.state.cartModule.cartItems;
    },
    isAddedToCart() {
      return this.addedToCart;
    },
  },
};
</script>

<style scoped>
.product-details {
  width: 100%;
  padding-left: 20px;
}
.price-details {
  width: fit-content;
}
.ml-2 {
  margin-left: 10px;
}
.green-text {
  color: green;
}
.red-text {
  color: red;
}
</style>
