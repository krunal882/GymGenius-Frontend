<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="6">
        <v-dialog
          v-model="dialog"
          transition="dialog-bottom-transition"
          width="auto"
          @click:outside="handleClickOutside"
        >
          <template v-slot:default="{}">
            <v-card class="dialog-card">
              <v-toolbar dark color="primary">
                <v-toolbar-title class="text-uppercase"
                  >Confirm remove</v-toolbar-title
                >
              </v-toolbar>

              <v-card-text class="text-body-1 pa-12">
                Are you sure you want to remove item?
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn color="primary" text @click="closeDialog">Cancel</v-btn>
                <v-btn color="error" text @click="remove()">Remove</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
const CryptoJS = require("crypto-js");
export default {
  props: {
    item: Object,
    dialogOpen: Boolean,
    action: String,
  },
  data() {
    return {
      dialog: false,
      Item: "",
    };
  },

  watch: {
    dialogOpen(value) {
      this.dialog = value;
      if (value && this.item) {
        this.initializeFormFields();
      }
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit("close-dialog");
    },
    async remove() {
      if (this.item.cloudImg != undefined) {
        const timestamp = Math.floor(Date.now() / 1000);
        const upload_preset = process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET;
        const cloud_name = process.env.VUE_APP_CLOUDINARY_CLOUD_NAME;
        const uploadData = new FormData();
        const imgUrl = this.item.cloudImg;
        const api_secret = process.env.VUE_APP_CLOUDINARY_API_SECRET;
        const apiKey = process.env.VUE_APP_CLOUDINARY_API_KEY;
        const publicId = imgUrl.split("/").pop().split(".").shift();
        const string_to_sign = `public_id=${publicId}&timestamp=${timestamp}${api_secret}`;
        const signature = CryptoJS.SHA1(string_to_sign).toString();

        uploadData.append("file", this.item?.cloudImg);
        if (upload_preset && cloud_name) {
          uploadData.append("api_key", apiKey);
          uploadData.append("timestamp", timestamp);
          uploadData.append("public_id", publicId);
          uploadData.append("signature", signature);
        }
        await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`,
          uploadData
        );
      }
      await this.$store.dispatch(this.action, { id: this.Item._id });
      this.closeDialog();
    },
    handleClickOutside() {
      if (this.dialog) {
        this.closeDialog();
      }
    },
    initializeFormFields() {
      this.Item = { ...this.item };
    },
  },
};
</script>

<style scoped>
.dialog-card {
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-card__text {
  padding: 16px;
}

.v-btn {
  margin-left: 8px;
}
</style>
