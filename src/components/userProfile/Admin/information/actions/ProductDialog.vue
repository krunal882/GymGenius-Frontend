<!-- this component is for admin to edit product information , it provides the dialog with input fields to enter information-->
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
            <v-col
              cols="12"
              md="6"
              class="d-flex flex-wrap justify-center align-center"
            >
              <!-- component for uploading the image and showing existing image -->
              <v-img
                v-if="imgPath"
                class="image-preview"
                height="346"
                :src="imgPath(product.src, product.category, product.cloudImg)"
                cover
              ></v-img>
              <div v-else class="image-placeholder"></div>
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                label="Upload New Image"
                prepend-icon="mdi-camera"
                variant="filled"
                @change="onFileChange"
                accept="image/*"
              ></v-file-input>
            </v-col>
          </div>
          <div class="d-flex flex-wrap">
            <!-- name field -->
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
          <div class="d-flex">
            <!-- brand field -->
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
              label="Secondary Muscles"
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
        <v-btn color="blue darken-1" text @click="save(product)"
          ><v-progress-circular
            v-if="loading"
            indeterminate
            color="white"
            size="20"
          ></v-progress-circular>
          <span v-if="!loading">Save</span></v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    productData: Object,
    dialogOpen: Boolean,
  },
  // data includes rules for input fields and product
  data() {
    return {
      stateType: ["active", "inactive"],
      dialog: false,
      valid: true,
      loading: false,
      product: {
        title: "",
        brand: "",
        price: 0,
        original_price: "",
        off: "",
        state: "",
        category: "",
        cloudImg: null,
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
      if (value && this.productData) {
        this.initializeFormFields();
      }
    },
  },
  methods: {
    //to handle selected image
    onFileChange(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.product.cloudImg = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    //to fetch existing image or stored in cloud
    imgPath(src, category, cloudImg) {
      if (cloudImg === undefined) {
        const imgPath = `../../assets/img/products/${category}/${src}.jpg`;
        return imgPath;
      } else {
        return cloudImg;
      }
    },
    //to close the dialog
    closeDialog() {
      this.$emit("close-dialog");
    },
    //to handle and close dialog on outside click
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
    //to upload image in cloud storage and call action from vuex store
    async save(product) {
      this.loading = true;
      const upload_preset = process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET;
      const cloud_name = process.env.VUE_APP_CLOUDINARY_CLOUD_NAME;
      const uploadData = new FormData();
      if (this.product.cloudImg != null) {
        uploadData.append("file", this.product.cloudImg);
        if (upload_preset && cloud_name) {
          uploadData.append("upload_preset", upload_preset);
          uploadData.append("cloud_name", cloud_name);
        }
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          uploadData
        );
        product.cloudImg = data.url;
      }
      product.price = +product.price;
      await this.$store.dispatch("editProduct", { product });
      this.loading = false;
      this.closeDialog();
    },
  },
};
</script>

<style scoped>
.image-placeholder {
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
}

.image-preview {
  object-fit: contain;
}
</style>
