<!-- component to upload image fot the admin -->
<template>
  <div class="d-flex flex-wrap">
    <v-col cols="12" md="6" class="d-flex justify-center align-center">
      <v-img
        v-if="image"
        :src="image"
        width="200"
        height="200"
        class="image-preview"
      ></v-img>
      <div v-else class="image-placeholder"></div>
    </v-col>
    <v-col cols="12" md="6">
      <v-file-input
        label="Upload Image"
        prepend-icon="mdi-camera"
        variant="filled"
        @change="onFileChange"
        accept="image/*"
      ></v-file-input>
    </v-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: null,
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
          this.$emit("img-selected", this.image);
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<!-- style for the image upload skeleton placeholder -->
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
