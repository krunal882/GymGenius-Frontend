<!-- this component is for admin to add new product information , it provides the dialog with input fields to enter information-->
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
              :rules="Rules"
              v-model="product.title"
              label="Name"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- category field -->
            <v-text-field
              :rules="Rules"
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
              :rules="Rules"
              v-model="product.brand"
              label="Brand"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- off field -->
            <v-text-field
              :rules="Rules"
              v-model="product.off"
              variant="outlined"
              label="Off"
              required
              type="number"
              min="0"
              class="mb-4"
            ></v-text-field>
          </div>
          <div class="d-flex flex-wrap justify-space-between">
            <!-- price field -->
            <v-text-field
              :rules="Rules"
              v-model="product.price"
              label="Price"
              variant="outlined"
              required
              type="number"
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- original price field -->
            <v-text-field
              :rules="Rules"
              v-model="product.original_price"
              label="original price"
              variant="outlined"
              class="mb-4"
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
      Rules: [
        (v) => !!v || "Field is Required",
        (v) => (v.trim && !!v.trim()) || "Field cannot contain only spaces",
      ],
    };
  },
  // watcher for dialog
  watch: {
    dialogOpen(value) {
      this.dialog = value;
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
