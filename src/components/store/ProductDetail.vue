<template>
  <div v-if="product" class="d-flex m-5">
    <v-card width="400px">
      <v-img class="align-end text-white" height="550" :src="productImg" cover>
      </v-img>
    </v-card>
    <div class="product-details">
      <v-card-text>{{ product.brand }}</v-card-text>
      <v-card-title>{{ product.title }}</v-card-title>

      <div class="d-flex" style="width: fit-content">
        <v-card-text
          >Final Price :
          <v-chip color="green">$ {{ product.price }}</v-chip></v-card-text
        >
        <v-card-text style="margin-left: 10px"
          >Original Price :<v-chip color="red">
            <del>$ {{ product.original_price }}</del></v-chip
          ></v-card-text
        >
      </div>
      <v-card-text
        >Off :<v-chip color="secondary">
          $ {{ product.off }}</v-chip
        ></v-card-text
      >
      <v-card-text>
        <div style="font-weight: bold">Product Description :</div>
        <br />
        {{ product.title }} Get 1 Year Free Subscription of cultsport play - An
        Immersive Fitness Game, Free Diet & Fitness Plan for 3 month along with
        1 Doctor Consultation & Personal Video Training Session, Warranty: 6
        Months Warranty on Manufacturing defects.
      </v-card-text>

      <v-row justify="center">
        <v-col cols="12" md="4" sm="6">
          <v-btn rounded="xl" size="large" color="red" @click="buyProduct" block
            >Buy Now</v-btn
          >
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-btn
            rounded="xl"
            size="large"
            color="red"
            block
            @click="addToCartClicked(product)"
          >
            {{ addedToCart ? "Added to Cart" : "Add to Cart" }}
          </v-btn>
        </v-col>
      </v-row>

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
        <v-btn color="secondary" height="55" @click="checkPincode">Check</v-btn>
      </div>
      <p v-if="isPincodeValid === true" class="green-text">
        You are eligible for delivery
      </p>
      <p v-else-if="isPincodeValid === false" class="red-text">
        Invalid pincode
      </p>
      <v-card-text style="font-weight: bold"
        >- Free delivery within 5 -7 days <br />- No returns available<br />- 10
        days exchange available <br />- Free door-step installation by cultsport
        team after delivery</v-card-text
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      addedToCart: false,
      pincode: "",
      isPincodeValid: null,
      indianPincode: [(value) => /^[1-9][0-9]{5}$/.test(value) || false],
    };
  },
  async created() {
    const { id } = this.$route.params;
    await this.fetchProduct(id);
  },
  methods: {
    addToCartClicked(product) {
      this.$store.dispatch("addToCart", {
        productId: product._id,
        status: "pending",
        userId: this.$store.state.userModule.userId,
        product,
      });
      this.addedToCart = true;
    },
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
    async fetchProduct(productId) {
      try {
        const filteredFilters = { id: productId };
        await this.$store.dispatch("fetchProduct", {
          filteredFilters,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    },
    checkPincode() {
      this.isPincodeValid = this.indianPincode[0](this.pincode);

      setTimeout(() => {
        this.isPincodeValid = null;
      }, 2000);
    },
  },
  computed: {
    ...mapGetters(["getProduct"]),
    product() {
      return this.getProduct[0];
    },
    productImg() {
      return `../../assets/img/products/${this.product.category}/${this.product.src}.jpg`;
    },
  },
};
</script>

<style scoped>
.product-details {
  width: calc(100% - 400px);
  padding-left: 20px;
}
.green-text {
  color: green;
}
.red-text {
  color: red;
}
</style>
