<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    @click:outside="handleClickOutside"
  >
    <v-card>
      <v-card-title> Edit Product </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <div class="d-flex flex-wrap">
            <v-text-field
              :rules="Rules"
              v-model="product.title"
              label="Name"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              :rules="Rules"
              v-model="product.category"
              label="Category"
              variant="outlined"
              required
              class="mb-4"
            ></v-text-field>
          </div>
          <div class="d-flex">
            <v-text-field
              :rules="Rules"
              v-model="product.brand"
              label="Brand"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              :rules="Rules"
              v-model="product.off"
              variant="outlined"
              label="Off"
              required
              class="mb-4"
            ></v-text-field>
          </div>
          <div class="d-flex flex-wrap justify-space-between">
            <v-text-field
              :rules="Rules"
              v-model="product.price"
              label="Price"
              variant="outlined"
              required
              type="number"
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              :rules="Rules"
              v-model="product.original_price"
              label="Secondary Muscles"
              variant="outlined"
              class="mb-4"
            ></v-text-field>
          </div>
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
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save(product)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    productData: Object,
    dialogOpen: Boolean,
  },
  data() {
    return {
      stateType: ["active", "inactive"],
      dialog: false,
      valid: true,
      product: {
        title: "",
        brand: "",
        price: 0,
        original_price: "",
        off: "",
        state: "",
        category: "",
      },
      Rules: [
        (v) => !!v || "Field is Required",
        (v) => (v.trim && !!v.trim()) || "Field cannot contain only spaces",
      ],
    };
  },
  watch: {
    dialogOpen(value) {
      this.dialog = value;
      if (value && this.productData) {
        this.initializeFormFields();
      }
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    handleClickOutside() {
      if (this.dialog) {
        this.closeDialog();
      }
    },
    initializeFormFields() {
      this.product = { ...this.productData };
    },
    cancel() {
      this.dialog = true;
      this.$refs.form.reset();
    },
    async save(product) {
      product.price = +product.price;
      await this.$store.dispatch("editProduct", { product });
      this.closeDialog();
    },
  },
};
</script>

<style scoped></style>
