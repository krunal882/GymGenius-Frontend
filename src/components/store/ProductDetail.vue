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
            @click="addToCartClicked"
          >
            {{ addedToCart ? "Added to Cart" : "Add to Cart" }}
          </v-btn>
        </v-col>
      </v-row>

      <div class="d-flex mt-5">
        <v-text-field
          ref="pincodeField"
          v-model="pincode"
          :rules="[rules.onlyNumbers, rules.indianPincode]"
          counter="6"
          label="Enter Pincode"
          placeholder="Enter your pincode"
          outlined
          dense
          maxlength="6"
          style="width: 150px"
        ></v-text-field>
        <v-btn color="secondary" height="55" @click="checkPincode">Check</v-btn>
      </div>
      <p v-if="isPincodeValid" class="green-text">
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      addedToCart: false,
      pincode: "", // To store the value of the pincode
      isPincodeValid: null,
      rules: {
        onlyNumbers: (value) =>
          /^\d+$/.test(value) || "Only numbers are allowed",
        indianPincode: (value) =>
          /^[1-9][0-9]{5}$/.test(value) || "Enter a valid Indian pincode",
      },
    };
  },
  async created() {
    const { id } = this.$route.params;
    await this.fetchProduct(id);
  },
  methods: {
    addToCartClicked() {
      this.$store.dispatch("addToCart", {
        product: this.product,
        user: this.user,
      });

      toast.success("Product added to cart");
      this.addedToCart = true; // Disable the button after adding the product to the cart
    },
    buyProduct() {
      this.$store.dispatch("purchase", { product: this.product });
    },

    async fetchProduct(productId) {
      try {
        const filteredFilters = { id: productId };
        await this.$store.dispatch("fetchProduct", { filteredFilters });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    },
    checkPincode() {
      // Check if the pincode is valid
      if (!this.$refs.pincodeField.validate()) {
        // If valid, set the flag to true
        this.isPincodeValid = true;
      } else {
        // If not valid, set the flag to false
        this.isPincodeValid = false;
      }
    },
  },
  computed: {
    ...mapGetters(["getProduct"]),
    product() {
      return this.getProduct[0]; // Assuming you are fetching an array with one product object
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
