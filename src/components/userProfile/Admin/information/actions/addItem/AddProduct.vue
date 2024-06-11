<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    @click:outside="handleClickOutside"
  >
    <v-card>
      <v-card-title> Add Product </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- component for uploading the image -->
          <AdminImgUpload @img-selected="handleImageSelected" />

          <!-- name field -->
          <div class="d-flex flex-wrap">
            <v-text-field
              :rules="commonRules"
              v-model="product.title"
              label="Name"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- category field -->
            <v-text-field
              :rules="commonRules"
              v-model="product.category"
              label="Category"
              variant="outlined"
              required
              class="mb-4"
            ></v-text-field>
          </div>
          <!-- brand field -->
          <div class="d-flex">
            <v-text-field
              :rules="commonRules"
              v-model="product.brand"
              label="Brand"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- original price field -->
            <v-text-field
              :rules="commonRules"
              v-model="product.original_price"
              label="Original Price"
              variant="outlined"
              class="mb-4"
            ></v-text-field>
          </div>
          <div class="d-flex flex-wrap justify-space-between">
            <!-- off field -->
            <v-text-field
              :rules="offRules"
              v-model="product.off"
              variant="outlined"
              label="Off"
              required
              type="number"
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- price field -->
            <v-text-field
              :rules="commonRules"
              v-model="product.price"
              label="Price"
              variant="outlined"
              required
              type="number"
              class="mr-4 mb-4"
            ></v-text-field>
          </div>
          <!-- product state field -->
          <v-select
            v-model="product.state"
            :items="stateType"
            label="State"
            required
            variant="outlined"
            class="mr-4 mb-4"
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <!-- button to close the dialog and add product -->
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="add(product)"
          ><v-progress-circular
            v-if="loading"
            indeterminate
            color="white"
            size="20"
          ></v-progress-circular>
          <span v-if="!loading">Add</span></v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import cloudImgMixin from "@/mixins/cloudImgMixin";
import AdminImgUpload from "@/components/common-components/AdminImgUpload.vue";
export default {
  props: {
    dialogOpen: Boolean,
  },
  components: {
    AdminImgUpload,
  },
  mixins: [cloudImgMixin],
  data() {
    // data includes rules for input fields and product
    return {
      image: null,
      stateType: ["active", "inactive"],
      dialog: false,
      valid: true,
      loading: false,
      product: {
        title: "",
        brand: "",
        price: "",
        original_price: "",
        off: "",
        state: "",
        category: "",
      },
      commonRules: [
        (v) => !!v || "Field is Required",
        (v) => (v.trim && !!v.trim()) || "Field cannot contain only spaces",
      ],
      offRules: [
        (v) => !!v || "Field is Required",
        (v) => (v.trim && !!v.trim()) || "Field cannot contain only spaces",
        (v) => v >= 0 || "Value must be greater than or equal to 0",
        (v) => v <= 99 || "Value must be less than or equal to 99",
      ],
    };
  },
  // watcher for dialog
  watch: {
    dialogOpen(value) {
      this.dialog = value;
    },
    "product.original_price": function () {
      this.calculatePrice();
    },
    "product.off": function () {
      this.calculatePrice();
    },
  },
  methods: {
    //to handle selected image
    handleImageSelected(image) {
      this.image = image;
    },
    //to close the dialog
    closeDialog() {
      this.$emit("close-dialog");
      this.resetForm();
    },
    //to handle and close dialog on outside click
    handleClickOutside() {
      if (this.dialog) {
        this.closeDialog();
      }
    },
    calculatePrice() {
      const originalPrice = parseFloat(this.product.original_price);
      const off = parseFloat(this.product.off);

      if (!isNaN(originalPrice) && !isNaN(off)) {
        const discountedPrice = originalPrice - originalPrice * (off / 100);
        this.product.price = discountedPrice.toFixed(0); // Round to two decimal places
      }
    },
    resetForm() {
      this.product = {
        title: "",
        brand: "",
        price: "",
        original_price: "",
        off: "",
        state: "",
        category: "",
      };
      this.$refs.form.resetValidation();
    },
    //to upload image in cloud storage and call action from vuex store
    async add(product) {
      this.loading = true;
      product.price = +product.price;
      const data = await this.cloudImgUpload();
      product.cloudImg = data.url;
      await this.$store.dispatch("addProduct", { product });
      this.loading = false;
      this.closeDialog();
    },
  },
};
</script>
