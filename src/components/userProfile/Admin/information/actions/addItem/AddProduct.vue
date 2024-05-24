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
          <AdminImgUpload @img-selected="handleImageSelected" />

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
              label="original price"
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
        <v-btn color="blue darken-1" text @click="add(product)">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import AdminImgUpload from "@/components/common-components/AdminImgUpload.vue";
export default {
  props: {
    dialogOpen: Boolean,
  },
  components: {
    AdminImgUpload,
  },
  data() {
    return {
      image: null,
      stateType: ["active", "inactive"],
      dialog: false,
      valid: true,
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
  watch: {
    dialogOpen(value) {
      this.dialog = value;
    },
  },
  methods: {
    handleImageSelected(image) {
      this.image = image;
    },
    closeDialog() {
      this.$emit("close-dialog");
      this.resetForm();
    },
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
    async add(product) {
      product.price = +product.price;

      const upload_preset = "gymgenius";
      const cloud_name = "dflto7hyt";
      const uploadData = new FormData();
      uploadData.append("file", this.image);
      if (upload_preset && cloud_name) {
        uploadData.append("upload_preset", upload_preset);
        uploadData.append("api", "538769229598131");
        uploadData.append("cloud_name", cloud_name);
      }
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        uploadData
      );
      product.cloudImg = data.url;
      await this.$store.dispatch("addProduct", { product });
      this.closeDialog();
    },
  },
};
</script>
