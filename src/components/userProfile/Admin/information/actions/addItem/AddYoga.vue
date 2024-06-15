<!-- this component is for admin to add new yoga information , it provides the dialog with input fields to enter information-->
<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    @click:outside="handleClickOutside"
  >
    <v-card>
      <v-card-title> Add Yoga </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- component for uploading the image -->
          <AdminImgUpload @img-selected="handleImageSelected" />

          <div class="d-flex flex-wrap">
            <!-- category field -->
            <v-text-field
              :rules="Rules"
              v-model="yoga.category_name"
              label="yoga name"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- category description field -->
            <v-text-field
              :rules="Rules"
              v-model="yoga.category_description"
              label="yoga category"
              variant="outlined"
              required
              class="mb-4"
            ></v-text-field>
          </div>
          <div class="d-flex">
            <!-- english name field -->
            <v-text-field
              v-model="yoga.english_name"
              label="english name of yoga"
              required
              variant="outlined"
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- adapted sanskrit name field -->
            <v-text-field
              v-model="yoga.sanskrit_name_adapted"
              label="adapted name of yoga"
              required
              variant="outlined"
              class="mb-4"
            ></v-text-field>
          </div>
          <div class="d-flex">
            <!-- sanskrit name field -->
            <v-text-field
              :rules="Rules"
              v-model="yoga.sanskrit_name"
              label="sanskrit name of yoga"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <!-- translation of yoga -->
            <v-text-field
              :rules="Rules"
              v-model="yoga.translation_name"
              variant="outlined"
              label="translation of name"
              required
              class="mb-4"
            ></v-text-field>
          </div>
          <!-- pose description -->
          <v-textarea
            :rules="Rules"
            v-model="yoga.pose_description"
            label="description of yoga pose"
            variant="outlined"
            required
            class="mr-4 mb-4"
          ></v-textarea>
          <!-- pose description -->
          <v-textarea
            v-model="yoga.pose_benefits"
            label="yoga pose benefits"
            variant="outlined"
            class="mb-4"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <!-- button to close the dialog and add yoga -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="save(yoga)"
          :disabled="loading"
          ><v-progress-circular
            v-if="loading"
            indeterminate
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
    // data includes rules for input fields and yogas
    return {
      image: null,
      dialog: false,
      valid: true,
      loading: false,
      yoga: {
        category_name: "",
        category_description: "",
        english_name: "",
        sanskrit_name: "",
        sanskrit_name_adapted: "",
        translation_name: "",
        pose_description: "",
        pose_benefits: "",
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
      this.loading = false;
      this.dialog = false;
      this.$emit("close-dialog");
    },
    //to handle and close dialog on outside click
    handleClickOutside() {
      if (this.dialog) {
        this.closeDialog();
      }
    },
    //to upload image in cloud storage and call action from vuex store
    async save(yoga) {
      this.loading = true;
      const data = await this.cloudImgUpload();
      yoga.url_png = data.url;
      await this.$store.dispatch("addYoga", { yoga });
      this.loading = false;
      this.closeDialog();
    },
  },
};
</script>
