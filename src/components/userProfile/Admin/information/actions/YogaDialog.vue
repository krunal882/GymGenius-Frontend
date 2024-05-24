<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    @click:outside="handleClickOutside"
  >
    <v-card>
      <v-card-title> Edit Yoga-pose </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <div class="d-flex flex-wrap">
            <v-text-field
              v-model="yoga.category_name"
              label="category"
              variant="outlined"
              required
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              :rules="Rules"
              v-model="yoga.english_name"
              label="english_name"
              variant="outlined"
              required
              class="mb-4"
            ></v-text-field>
          </div>
          <v-textarea
            :rules="Rules"
            v-model="yoga.category_description"
            label="category_description"
            variant="outlined"
            required
            class="mb-4"
          ></v-textarea>
          <div class="d-flex">
            <v-text-field
              v-model="yoga.sanskrit_name"
              label="sanskrit name"
              required
              variant="outlined"
              class="mr-4 mb-4"
            ></v-text-field>
            <v-text-field
              v-model="yoga.sanskrit_name_adapted"
              label="sanskrit name adapted"
              required
              variant="outlined"
              class="mb-4"
            ></v-text-field>
          </div>
          <v-text-field
            v-model="yoga.translation_name"
            label="translation_name"
            required
            variant="outlined"
            class="mb-4"
          ></v-text-field>
          <v-textarea
            :rules="Rules"
            v-model="yoga.pose_description"
            label="pose description"
            variant="outlined"
            required
            class="mr-4 mb-4"
          ></v-textarea>
          <v-textarea
            :rules="Rules"
            v-model="yoga.pose_benefits"
            label="pose benefits"
            variant="outlined"
            required
            class="mr-4 mb-4"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save(yoga)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    yogaData: Object,
    dialogOpen: Boolean,
  },
  data() {
    return {
      dialog: false,
      valid: true,
      yoga: {
        category_name: "",
        category_description: "",
        english_name: "",
        sanskrit_name_adapted: "",
        sanskrit_name: "",
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
  watch: {
    dialogOpen(value) {
      this.dialog = value;
      if (value && this.yogaData) {
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
      this.yoga = { ...this.yogaData };
    },
    cancel() {
      this.dialog = true;
      this.$refs.form.reset();
    },
    async save(yoga) {
      await this.$store.dispatch("editYoga", { yoga });
      this.closeDialog();
    },
  },
};
</script>
<style scoped></style>
